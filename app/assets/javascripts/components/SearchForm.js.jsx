class SearchForm extends React.Component
{   
	constructor(props) {
      super(props);
      this.state = {searchString: ''};
      

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({searchString: e.target.value});
  }

  
  render() {
    
    passwords = this.props.passwords
 	
  	const searchString = this.state.searchString.trim().toLowerCase();

  	      if(searchString.length > 0){

            passwords = passwords.filter(function(p){
                return p.title.toLowerCase().match( searchString );
            });
          }

    return (
             <div>
  				
                <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search..." />
                 	
                <div class='row' id='passwords'>
                    {passwords.map(function(password, index)
                        {
                            return <Password password={password} key={password.id}/>;
                        })
                    }
                </div>
             </div>

            );
    }

}