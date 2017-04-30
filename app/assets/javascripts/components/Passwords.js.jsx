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
    const passwords = this.props.passwords;
    const searchString = this.state.searchString;
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
              "title"
            ]
      };
            
    var fuse = new Fuse(passwords, options);
   
    let filteredPasswords;
    if(searchString!="")
      filteredPasswords = fuse.search(searchString);
    else filteredPasswords = passwords;
   

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