class Passwords extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            passwords: props.passwords,
            password: {
                title: '',
                URL: '',
                username: '',
                password: ''
            },
            errors: {}
        };
    }

    render()
    {
        return(
            <div className="container">
                <div className="row">
                    {this.renderForm()}
                    {this.renderPasswords()}
                </div>
            </div>
        );
    }

    renderForm()
    {
        return(
            <div className='col-md-3'>
                <div className='well'>
                    <label>Title</label>
                    <input      className="form-control" type="text"    onChange={ this.handleTitleChange }/>
                    <label>Url</label>
                    <input      className="form-control" type="text"    onChange={ this.handleURLChange } />
                    <label>Username</label>
                    <input      className="form-control" type="text"    onChange={ this.handleUsernameChange } />
                    <label>Password</label>
                    <textarea   className="form-control"                onChange={ this.handlePasswordChange } />
                    <input      className="btn btn-success" type="submit"            onClick={ this.handleCreatePassword } />
                </div>
            </div>
        );
    }

    renderPasswords()
    {
        var that = this;
        const passwords  = this.state.passwords.map(function(password)
        {
            return <Password password={password} key={password.id} />;
        });

        return( <div className='col-md-9'> {passwords} </div> );
    }

    handleTitleChange(e)
    {
        var newPassword = this.state.password;
        newPassword.title = e.target.value;
        this.setState({password: newPassword});
    }
    handleURLChange(e)
    {
        var newPassword = this.state.password;
        newPassword.URL = e.target.value;
        this.setState({password: newPassword});
    }
    handleUsernameChange(e)
    {
        var newPassword = this.state.password;
        newPassword.username = e.target.value;
        this.setState({password: newPassword});
    }
    handlePasswordChange(e)
    {
        var newPassword = this.state.password;
        newPassword.password = e.target.value;
        this.setState({password: newPassword});
    }

    handleCreatePassword(e)
    {
        var that = this;
        $.ajax({
            method: 'POST',
            data: {
                password: that.state.password,
            },
            url: '/passwords.json',
            success: function(res) {
                var newPasswordsList = that.state.passwords;
                newPasswordsList.push(res);
                that.setState({
                    passwords: newPasswordsList,
                    password: {
                        title: '',
                        URL: '',
                        username: '',
                        password: ''
                    },
                    errors: {}
                });
            },
            error: function(res) {
                that.setState({errors: res.responseJSON.errors})
            }
        });
    }


}