class PWDLocker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwords: props.passwords,
            searchString: '',
            formPassword: {},
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
                this.setState({formPassword: action.value});
            break;
            case 'ON_UPDATE_PASSWORD':
            {
                const password = action.value;
                const passwords = this.state.passwords.slice();
                passwords[password.id] = password;
                this.setState({
                    passwords: passwords,
                    formPassword: {}
                });
            }
            break;
            case 'ON_DELETE_PASSWORD':
            {
                const password = action.value;
                const passwords = this.state.passwords.slice();
                const index = passwords.indexOf(password);

                console.log(index);
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
        const passwords = this.state.passwords;
        const searchString = this.state.searchString;
        const formData = this.state.formPassword;

        return(
                <div className="container">
                    <div className="row">

                        <SearchForm
                            handleAction={this.handleAction}
                        />

                        <PasswordForm
                            handleAction={this.handleAction}
                            password={formData}
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
