class PWDLocker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwords: props.passwords,
            password_groups: props.password_groups,
            searchString: '',
            formEditPassword: {},
        };
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(action){

        switch (action.type){
            case 'ON_SEARCH_STRING_CHANGE':
            {
                var searchString = action.value;
                this.setState({searchString: searchString});
            }
            break;
            case 'ON_ADD_NEW_PASSWORD':
            {
                var passwords = this.state.passwords;
                passwords.push(action.value);
                this.setState({ passwords: passwords });
            }
            break;
            case 'ON_START_EDIT_PASSWORD':
                this.setState({formEditPassword: action.value});
            break;
            case 'ON_UPDATE_PASSWORD':
            {
                const password = action.value;
                const passwords = this.state.passwords.slice();
                passwords[password.id - 1] = password;
                this.setState({
                    passwords: passwords,
                    formEditPassword: {}
                });
            }
            break;
            case 'ON_DELETE_PASSWORD':
            {
                const password = action.value;
                const passwords = this.state.passwords.slice();
                const index = passwords.indexOf(password);

                passwords.splice(index, 1);

                this.setState({
                    passwords: passwords,
                    formPassword: {}
                });
            }
            break;
        }
    }

    render(){
        const passwords         = this.state.passwords;
        const password_groups   = this.state.password_groups;
        const searchString      = this.state.searchString;
        const formEditPassword  = this.state.formEditPassword;

        return(
                <div className="container">
                    <div className="row">

                        <SearchForm
                            handleAction={this.handleAction}
                        />

                        <PasswordForm
                            handleAction={this.handleAction}
                            edit_password = {formEditPassword}
                        />

                        <Passwords
                            handleAction={this.handleAction}
                            searchString={searchString}
                            passwords={passwords}
                        />

                    </div>
                </div>
            );
    }
}
