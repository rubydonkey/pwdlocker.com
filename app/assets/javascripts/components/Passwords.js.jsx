class Passwords extends React.Component
{
    constructor(props)
    {
        super(props);
    }
  render()
  {
    const searchString = this.props.searchString;

    let filteredPasswords = this.props.passwords.filter(
            (password) => {
                return password.title.toLowerCase().indexOf(searchString.toLowerCase()) !==-1;
            }
        );

    const passwords = filteredPasswords.map(function(password){
      return <Password
          password={password}
          key={password.id}
          handleAction={(action) => this.props.handleAction(action)}
      />;
    }.bind(this));

    return( <div className='col-md-9'> {passwords} </div> );
  }
}
