class Password extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            password: this.props.password,
            editMode: false,
            errors: {}
        };
    }

    render()
    {
      const password = this.props.password;
      return(
          <div className="js-password-block-show-hidden col-md-4" id={"password-block-" + password.id}>
            <div className='well password-block'>
              <div className='row'>
                {this.renderColumnFavicon()}
                {this.renderColumnData()}
                {this.renderColumnControls()}
              </div>
            </div>
          </div>
      );
    }

    handleTitleChange(e)
    {
        let newPassword = this.state.password;
        newPassword.title = e.target.value;
        this.setState({password: newPassword})
    }

    handleURLChange(e)
    {
        let newPassword = this.state.password;
        newPassword.URL = e.target.value;
        this.setState({password: newPassword})
    }

    handleUsernameChange(e)
    {
        let newPassword = this.state.password;
        newPassword.username = e.target.value;
        this.setState({password: newPassword})
    }

    handlePasswordChange(e)
    {
        let newPassword = this.state.password;
        newPassword.password = e.target.value;
        this.setState({password: newPassword})
    }

    handlePasswordUpdate()
    {
        var that = this;
        $.ajax({
            method: 'PUT',
            data: {
                password: that.state.password,
            },
            url: '/passwords/' + that.state.password.id + '.json',
            success: function(res) {
                that.setState({
                    errors: {},
                    password: res,
                    editMode: false
                });
            },
            error: function(res) {
                that.setState({errors: res.responseJSON.errors});
            }
        });
    }

    toggleEditMode()
    {
        if(this.state.editMode)
            this.handlePasswordUpdate();
        else
            this.setState({editMode: true })
    }

    handlePasswordDelete()
    {
        var that = this;
        $.ajax({
            method: 'DELETE',
            url: '/passwords/' + that.state.password.id + '.json',
            success: function(res) {
                that.props.onDeletePassword(that.state.password);
            }
        })
    }

    renderColumnFavicon()
    {
        const password = this.state.password;
        const favicon_URI = password.favicon && password.favicon.data;

        if(favicon_URI)
        {
            return(
                <div className="col-xs-2">
                    <a target="_blank" href= {password.URL} >
                        <img className="favicon password-block-favicon" src={"data:image/gif;base64," + favicon_URI} alt="pwdlocker"/>
                    </a>
                </div>
            );
        }
        else
        {
            return(
                <div className="col-xs-2">
                    <a target="_blank" href= {password.URL} >
                        <img className="favicon password-block-favicon" src="assets/favicon.ico" alt="pwdlocker"/>
                    </a>
                </div>
            );
        }
    }

    renderColumnData()
    {
      const password = this.state.password;
        let group_name = null;

        if(password.password_group)
            group_name = password.password_group.name;

        if ( this.state.editMode )
        {
            markup = (
                <div className="col-xs-8">
                    <span className='label label-default pull-right'>{group_name}</span>

                    <input type="text" className="form-control" value={this.state.password.title}            onChange={ (e) => this.handleTitleChange(e) } />
                    <br />

                    <input type="text" className="form-control" value={this.state.password.URL}              onChange={ (e) => this.handleURLChange(e) } />
                    <br />

                    <input type="text" className="form-control" value={this.state.password.username}         onChange={ (e) => this.handleUsernameChange(e) } />
                    <br />

                    <textarea type="text" className="form-control" value={this.state.password.password}         onChange={ (e) => this.handlePasswordChange(e) } />
                    <br />
                </div>
            );
        }
        else
        {
            markup = (
                <div className="col-xs-8">
                    <span className='label label-default pull-right'>{group_name}</span>
                    <a target="_blank" href={password.URL}>
                        <span className="password-data" id={"password-data-title-" + password.id } > <b>{ this.toTitleCase(password.title) }</b> </span>
                    </a>
                    <br />

                    <span className="password-block-password-data" id={"password-data-username-" + password.id }>  <b>Username:</b> { password.username } </span>
                    <br />

                    <span className="password-data password-block-password-data" id={ "password-data-password-" + password.id }>  <b>Password:</b> { password.password } </span>
                    <br />

                    <span className="password-data password-block-password-data" id={ "password-data-password-changed-" + password.id }>  Last time changed  {this.time_ago_in_words_with_parsing(this.props.password.timestamp)}. </span>
                </div>
            );
        }

        return markup;

    }

    renderColumnControls()
    {
      const password = this.state.password;

      return(
          <div className="col-xs-2">
              <span className="glyphicon glyphicon-remove" onClick={ () => this.handlePasswordDelete() } />
              <span className="glyphicon glyphicon-pencil" onClick={ () => this.toggleEditMode() }/>
          </div>
      );
    }


    time_ago_in_words_with_parsing(from)
    {
        var date = new Date;
        date.setTime(Date.parse(from));
        return this.time_ago_in_words(date);
    }
    // Takes a timestamp and converts it to a relative time
    // DateHelper.time_ago_in_words(1331079503000)
    time_ago_in_words(from)
    {
        return this.distance_of_time_in_words(new Date, from);
    }

    distance_of_time_in_words(to, from)
    {
        var distance_in_seconds = ((to - from) / 1000);
        var distance_in_minutes = Math.floor(distance_in_seconds / 60);
        var tense = distance_in_seconds < 0 ? " from now" : " ago";
        distance_in_minutes = Math.abs(distance_in_minutes);
        if (distance_in_minutes == 0) { return 'less than a minute'+tense; }
        if (distance_in_minutes == 1) { return 'a minute'+tense; }
        if (distance_in_minutes < 45) { return distance_in_minutes + ' minutes'+tense; }
        if (distance_in_minutes < 90) { return 'about an hour'+tense; }
        if (distance_in_minutes < 1440) { return 'about ' + Math.floor(distance_in_minutes / 60) + ' hours'+tense; }
        if (distance_in_minutes < 2880) { return 'a day'+tense; }
        if (distance_in_minutes < 43200) { return Math.floor(distance_in_minutes / 1440) + ' days'+tense; }
        if (distance_in_minutes < 86400) { return 'about a month'+tense; }
        if (distance_in_minutes < 525960) { return Math.floor(distance_in_minutes / 43200) + ' months'+tense; }
        if (distance_in_minutes < 1051199) { return 'about a year'+tense; }

        return 'over ' + Math.floor(distance_in_minutes / 525960) + ' years';
    }

    toTitleCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

}