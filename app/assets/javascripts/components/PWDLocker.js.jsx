class PWDLocker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwords: props.passwords,
            searchString: '',
            editPassword: {},
        };
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(action){
        switch (action.type){
            case 'ON_ADD_NEW_PASSWORD':
            {
                var passwords = this.state.passwords;
                passwords.push(action.value);
                this.setState({ passwords: passwords });
            }
            break;
            case 'ON_SEARCH_STRING_CHANGE':
            {
                var searchString = action.value;
                this.setState({searchString: searchString});
            }
            break;
        }
    }

    render(){
        const passwords = this.state.passwords;
        const searchString = this.state.searchString;

        let elem = null;

        return(
                <div className="container">
                    <div className="row">
                        <SearchForm handleAction={this.handleAction}/>
                        <PasswordForm handleAction={this.handleAction}/>
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
