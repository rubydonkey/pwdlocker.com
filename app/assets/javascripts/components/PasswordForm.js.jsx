class PasswordForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            password: {},
            edit_mode: false,
            errors: {},
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
               </div>
           </div>
        );
    }

    renderTitle(){
        var title = this.state.password.title;
        if(this.isEmpty(title))
            title = "";

        const error = this.state.errors.title;


        return (
            <div>
                <label>Title</label>
                <input className="form-control" type="text" value={title} onChange={ (e) => this.handleTitleChange(e) }/>
                <span style={{color: 'red'}}>{error}</span>
                <br />
            </div>
        );
    }

    renderURL(){
        var URL = this.state.password.URL;
        if(this.isEmpty(URL))
            URL = "";

        const error = this.state.errors.URL;

        return(
                <div>
                    <label>Url</label>
                    <input className="form-control" type="text" value={URL} onChange={ (e) =>  this.handleURLChange(e)  } />
                    <span style={{color: 'red'}}>{error}</span>
                    <br />
                </div>
            );
    }

    renderUsername(){
        var username = this.state.password.username;
        if(this.isEmpty(username))
            username = "";

        const error = this.state.errors.username;

        return(
            <div>
                <label>Username</label>
                <input className="form-control" type="text" value={username} onChange={ (e) =>  this.handleUsernameChange(e)  } />
                <span style={{color: 'red'}}>{error}</span>
                <br />
            </div>
        );

    }

    renderPassword(){
        var password = this.state.password.password;
        if(this.isEmpty(password))
            password = "";

        const error = this.state.errors.password;

        return(
                <div>
                    <label>Password</label>
                    <textarea className="form-control" value={password}  onChange={ (e) =>  this.handlePasswordChange(e)  } />
                    <span style={{color: 'red'}}>{error}</span>
                    <br />
                    <br />
                </div>
            );
    }

    renderSubmitButton(){
        if(this.state.edit_mode === true)
        {
            return( <input
                className="btn btn-success"
                type="submit"
                value="Update"
                onClick={ () => this.handlePasswordUpdate() } />);
        }
        else
        {
            return( <input
                className="btn btn-success"
                type="submit"
                value="Create"
                onClick={ () => this.handlePasswordCreate() } />);
        }
    }

    renderGroupForm() {
        const groups = this.state.password_groups;

        const password_groups = groups.map(function(group){
            return<option key={group.id} value={group.id}>
                {group.name}
            </option>
        });

        return(
            <select className="form-control" onChange={(e) => this.handlePasswordGroupChange(e)}>
                <option value>Select group</option>
                {password_groups}
            </select>
        );
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
        password.password = e.target.value;
        this.setState({password: password});
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
                this.setState({
                    errors: {},
                    password: {},
                    edit_mode: false,
                });

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

    isEmpty(obj){
        for(var key in obj){
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}
