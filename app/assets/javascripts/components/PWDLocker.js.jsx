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
            {
                const idPassword = action.value;
                const password = this.props.passwords[idPassword];
                this.setState({formPassword: password});
            }
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
                            handleAction={(action) => this.handleAction(action)}
                        />

                        <PasswordForm
                            handleAction={(action) => this.handleAction(action)}
                            password={formData}
                        />

                        <Passwords
                            handleAction={(action) => this.handleAction(action)}
                            searchString={searchString}
                            passwords={passwords}
                        />

                    </div>
                </div>
            );
    }
}
