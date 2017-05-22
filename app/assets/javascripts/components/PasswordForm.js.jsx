class PasswordForm extends React.Component {

    constructor(props){
        super(props);
        this.state = this.getInitState();
        this.handlePasswordCreate = this.handlePasswordChange.bind(this);
    }

    getInitState() {
        return {
            password: props.formData,
            errors: {}
        }
    }

    render(){
        return(
           <div className="col-md-3">
               <div className="well">

                   {this.renderTitle()}
                   {this.renderURL()}
                   {this.renderUsername()}
                   {this.renderPassword()}

                   <input
                       className="btn btn-success"
                       type="submit"
                       onClick={ () => this.handlePasswordCreate() }
                   />

               </div>
           </div>

        );
    }

    renderTitle(){
        const title = this.state.password.title;
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
        const URL = this.state.password.URL;
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
        const username = this.state.password.username;
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
        const password = this.state.password.password;
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

    handlePasswordCreate()
    {
        const password = that.state.password;
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
                this.setState(this.getInitState());
            },

            error: function(res) {
                this.setState({errors: res.responseJSON.errors})
            }
        });
    }

}
