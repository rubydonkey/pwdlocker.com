class Passwords extends React.Component
{
  constructor(props) {
      super(props);
      this.handleSearchStringChange = this.handleSearchStringChange.bind(this);
      this.state = {searchString: ''};   
  }

  handleSearchStringChange(searchString){
    this.setState({searchString: searchString})
  }

  render()
  {
    window.passwords = this.props.passwords;

    const searchString      = this.state.searchString;
    const passwords         = this.props.passwords.map(function(password, index)
                              {
                                return <Password password={password} key={password.id} />;
                              });

    let filteredPasswords = this.props.passwords.filter(
      		(password) => {
      			return password.title.toLowerCase().indexOf(searchString.toLowerCase()) !==-1;
      		}
      	);   

    
    return( <div> 
               <SearchForm searchString={searchString} onSearchStringChange={this.handleSearchStringChange} />
                <div className='row' id='passwords'>
                    {filteredPasswords.map((password)=> {
                            return <Password password={password} key={password.id}/>;
                        })
                    }
                </div>
            </div> );
  }
}