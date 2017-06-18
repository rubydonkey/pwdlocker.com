class Password extends React.Component
{
    constructor(props){
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onToggleVisibility = this.onToggleVisibility.bind(this);
    };

    render()
    {
      const password = this.props.password;
      return(
          <div className="js-password-block-show-hidden col-md-4" id={"password-block-" + password.id} onClick={() => {this.onToggleVisibility(password.id)}}>
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

    renderColumnFavicon()
    {
      const password = this.props.password;
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
      const password = this.props.password;
        let group_name = null;
        if(password.password_group)
            group_name = password.password_group.name;

      return(
          <div className="col-xs-8">
            <span className='label label-default pull-right' id={"password-data-group-" + password.id }>{group_name}</span>
            <a target="_blank" href={password.URL}>
              <span className="password-data" id={"password-data-title-" + password.id } > { this.toTitleCase(password.title) } </span>
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

    renderColumnControls()
    {
      const password = this.props.password;

        const actionEdit = {
            type: 'ON_START_EDIT_PASSWORD',
            value: this.props.password
        };
        const actionDelete = {
            type: 'ON_DELETE_PASSWORD',
            value: this.props.password
        };

      return(
          <div className="col-xs-2">
              <span className="glyphicon glyphicon-remove" id={"password-remove-" + password.id } onClick={this.handleDelete}></span>
              <span className="glyphicon glyphicon-pencil" id={"password-edit-" + password.id } onClick={this.handleEdit}></span>
          </div>
      );
    }

    handleEdit(){
        var action = {
            type: 'ON_START_EDIT_PASSWORD',
            value: this.props.password,
        }
        this.props.handleAction(action);
    }

    handleDelete(){
        var action = {
            type: 'ON_DELETE_PASSWORD',
            value: this.props.password,
        }

        $.ajax({
            method: 'DELETE',
            url: '/passwords/' + this.props.password.id + '.json',
            success: function(res) {
                this.props.handleAction(action);
            }.bind(this)
        })
    }

    onToggleVisibility(id){
        console.log(id);
        $("#password-data-username-"+id.toString()).toggle();
        $("#password-data-password-"+id.toString()).toggle();
        $("#password-data-password-changed-"+id.toString()).toggle();
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