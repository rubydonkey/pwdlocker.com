class Passwords extends React.Component
{
    constructor(props)
    {
        super(props);
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
                    <input      className="form-control" type="text" value={this.state.password.title}    onChange={ (e) => this.handleTitleChange(e) }/>
                    <span style={{color: 'red'}}>{this.state.errors.title}</span>
                    <br />

                    <label>Url</label>
                    <input      className="form-control" type="text" value={this.state.password.URL}    onChange={ (e) =>  this.handleURLChange(e)  } />
                    <span style={{color: 'red'}}>{this.state.errors.URL}</span>
                    <br />

                    <label>Username</label>
                    <input      className="form-control" type="text" value={this.state.password.username}    onChange={ (e) =>  this.handleUsernameChange(e)  } />
                    <span style={{color: 'red'}}>{this.state.errors.username}</span>
                    <br />

                    <label>Password</label>
                    <textarea   className="form-control" value={this.state.password.password}               onChange={ (e) =>  this.handlePasswordChange(e)  } />
                    <span style={{color: 'red'}}>{this.state.errors.password}</span>
                    <br />
                    <br />

                    <input      className="btn btn-success" type="submit"            onClick={ () => this.handlePasswordCreate() } />
                </div>
            </div>
        );
    }

    renderPasswords()
    {
        var that = this;
        const passwords  = this.state.passwords.map(function(password)
        {
            return <Password password={password} key={password.id} onDeletePassword={ (password) => that.handlePasswordDelete(password) } />;
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

    handlePasswordCreate(e)
    {
        var that = this;
        const password = that.state.password;
        $.ajax({
            method: 'POST',
            data: {
                password: password,
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

    handlePasswordDelete(password)
    {
        var passwords = this.state.passwords.filter(function(pwd) {
            return password.id !== pwd.id;
        });
        this.setState({passwords: passwords});
    }
}