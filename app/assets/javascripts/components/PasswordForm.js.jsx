class PasswordForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            password: this.getInitialPassword(),
            errors: {},
            password_group_name:"",
            edit_mode: false,
            render_group_form: false,
        };

        this.handlePasswordCreate = this.handlePasswordCreate.bind(this);
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps)
        {
            const edit_password = nextProps.edit_password;
            if(!this.isEmpty(edit_password))
            {
                this.setState({ password: edit_password,
                                edit_mode: true});
            }
        }
    }

    render(){
        var button = null;

        return(
           <div className="col-md-3">
               <div className="well">
                   {this.renderTitle()}
                   {this.renderURL()}
                   {this.renderUsername()}
                   {this.renderPassword()}
                   {this.renderSubmitButton()}
                   {this.renderGroupForm()}
               </div>
           </div>
        );
    }

    renderTitle(){
        var title = this.state.password.title;
        const error = this.state.errors.title;

        return (
            <div>
                <label>Title</label>
                <input className="form-control"
                       type="text"
                       value={title}
                       onChange={ (e) => this.handleTitleChange(e) }
                       name="password[title]"/>

                <span style={{color: 'red'}}>{error}</span>
                <br />
            </div>
        );
    }

    renderURL(){
        var URL = this.state.password.URL;
        const error = this.state.errors.URL;

        return(
                <div>
                    <label>Url</label>
                    <input className="form-control"
                           type="text"
                           value={URL}
                           onChange={ (e) =>  this.handleURLChange(e)  }
                           name="password[URL]"/>

                    <span style={{color: 'red'}}>{error}</span>
                    <br />
                </div>
            );
    }

    renderUsername(){
        var username = this.state.password.username;
        const error = this.state.errors.username;

        return(
            <div>
                <label>Username</label>
                <input className="form-control"
                       type="text"
                       value={username}
                       onChange={ (e) =>  this.handleUsernameChange(e)  }
                       name="password[username]"/>

                <span style={{color: 'red'}}>{error}</span>
                <br />
            </div>
        );

    }

    renderPassword(){
        var password = this.state.password.password;
        const error = this.state.errors.password;

        return(
                <div>
                    <label>Password</label>
                    <textarea className="form-control"
                              value={password}
                              onChange={ (e) =>  this.handlePasswordChange(e)  }
                              name="password[password]"/>

                    <span style={{color: 'red'}}>{error}</span>
                    <br />
                    <br />
                </div>
            );
    }

    renderSubmitButton(){
        if(this.state.edit_mode === true){
            return( <button className="btn btn-success"
                            type="submit"
                            onClick={ () => this.handlePasswordUpdate() }>Update</button>);
        }
        else{
            return( <button className="btn btn-success"
                            type="submit"
                            onClick={ () => this.handlePasswordCreate() }>Create</button>);
        }
    }

    renderGroupForm() {
        const groups = this.props.password_groups;

        const password_groups = groups.map(function(group){
            return<option key={group.id} value={group.id}>{group.name}</option>
        });

        const password_group_select =
            <select
                className="form-control"
                name="password_group_select"
                onChange={(e) => this.handlePasswordGroupChange(e)}>
                    <option value>Select group</option>
                    {password_groups}
            </select>

        const password_group_button_add =
            <button className="btn btn-link pull-right"
                    name="password_group_add"
                    type="submit"
                    onClick={() => {this.setState( {render_group_form: !this.state.render_group_form} )}} >
                Add group
            </button>

        const password_group_form =
            <div>
                <input  className="form-control"
                        name="password_group[name]"
                        value = {this.state.password_group_name}
                        autoComplete="off"
                        onChange={(e) => this.handlePasswordGroupNameChange(e)}/>
                <span style={{color: 'red'}}>{this.state.errors.name}</span>
                <br/>
                <button className="btn btn-primary"
                        type="submit"
                        name="password_group_create"
                        onClick={() => this.handlePasswordGroupCreate() }> Create group </button>
            </div>

        if(this.state.render_group_form)
        {
            return(
                <div>
                    {password_group_select}
                    {password_group_form}
                </div>
            );
        }
        else
        {
            return(
                <div>
                    {password_group_select}
                    {password_group_button_add}
                </div>
            );
        }
    }

    handleTitleChange(e)
    {
        var password = this.state.password;
        password.title = e.target.value;
        this.setState({password: password});
    }

    handleURLChange(e)
    {
        var password = this.state.password;
        password.URL = e.target.value;
        this.setState({password: password});
    }

    handleUsernameChange(e)
    {
        var password = this.state.password;
        password.username = e.target.value;
        this.setState({password: password});
    }

    handlePasswordChange(e)
    {
        var password = this.state.password;
        password.password = e.target.value;
        this.setState({password: password});
    }

    handlePasswordGroupChange(e)
    {
        var password = this.state.password;
        password.password_group_id = e.target.value;
        this.setState({password: password});
    }
    handlePasswordGroupNameChange(e)
    {
        this.setState({password_group_name: e.target.value});
    }

    handlePasswordCreate()
    {
        const password = this.state.password;
        $.ajax({
            method: 'POST',
            data: {
                password: password,
            },
            url: '/passwords.json',

            success: function(res) {

                const password = res;
                const action = {
                    type: 'ON_ADD_NEW_PASSWORD',
                    value: password
                }
                this.props.handleAction(action);
                this.setState({password: this.getInitialPassword()})
            }.bind(this),

            error: function(res) {
                this.setState({errors: res.responseJSON.errors})
            }.bind(this)
        });
    }

    handlePasswordUpdate()
    {
        $.ajax({
            method: 'PUT',
            data: {
                password: this.state.password,
            },
            url: '/passwords/' + this.state.password.id + '.json',
            success: function(res) {
                this.setState({ errors: {},
                                password: this.getInitialPassword(),
                                edit_mode: false });

                const action = {
                    type: 'ON_UPDATE_PASSWORD',
                    value: res
                };
                this.props.handleAction(action);
            }.bind(this),
            error: function(res) {
                this.setState({errors: res.responseJSON.errors});
            }.bind(this)
        });
    }

    handlePasswordGroupCreate(){
        const name = this.state.password_group_name;
        $.ajax({
            method: 'POST',
            data: {
                password_group: {name: name},
            },
            url: '/password_groups.json',

            success: function(res) {

                const password_group_name = res;
                const action = {
                    type: 'ON_ADD_NEW_GROUP',
                    value: password_group_name
                }
                this.props.handleAction(action);
                this.setState({ password_group_name: "",
                                render_group_form: false });
            }.bind(this),

            error: function(res) {
                this.setState({errors: res.responseJSON.errors})
            }.bind(this)
        });
    }

    isEmpty(obj){
        for(var key in obj){
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    getInitialPassword(){
        return({    title: "",
                    URL: "",
                    username: "",
                    password: "",
                    password_group_id: "", });
    }
}
