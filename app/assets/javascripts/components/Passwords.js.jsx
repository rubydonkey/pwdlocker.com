class Passwords extends React.Component
{
  render()
  {
    window.passwords = this.props.passwords;

    const passwords         = this.props.passwords.map(function(password, index)
                              {
                                return <Password password={password} key={password.id} />;
                              });

    return( <div> 
                <SearchForm passwords={this.props.passwords}/>
            </div> );
  }
}