class SearchForm extends React.Component
{   
	constructor(props) {
      super(props);
      this.state = {searchString: ''};   
   }

  updateSearch(event) {
    this.setState({searchString: event.target.value.substr(0,20)});
  }

  render() {
      let filteredPasswords = this.props.passwords.filter(
      		(password) => {
      			return password.title.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !==-1;
      		}
      	);   
    return (
             <div>
               <form>
                <input type="text" value={this.state.searchString} onChange={this.updateSearch.bind(this)} placeholder="Search..." />	
               </form>
                <div className='row' id='passwords'>
                    {filteredPasswords.map((password)=> {
                            return <Password password={password} key={password.id}/>;
                        })
                    }
                </div>
             </div>
            );
    }

}