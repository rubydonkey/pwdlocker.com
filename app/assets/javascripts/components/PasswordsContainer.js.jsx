class PasswordsContainer extends React.Component{

	render(){
		return ( <div> 
					   <Passwords passwords={this.props.passwords} />
		         </div>);
	}
}