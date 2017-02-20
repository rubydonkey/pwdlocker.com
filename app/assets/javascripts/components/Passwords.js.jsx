class Passwords extends React.Component
{
  render()
  {
    const password_groups   = this.props.password_groups;
    const favicon_URIs      = this.props.favicon_URIs;
    const timestamps        = this.props.timestamps;

    const passwords         = this.props.passwords.map(function(password, index)
                              {
                                return <Password password={password}
                                                 key={password.id}
                                                 group={password_groups[index]}
                                                 favicon_URI={favicon_URIs[index]}
                                                 timestamp={timestamps[index]}/>;
                              });

    return( <div> {passwords} </div> );
  }
}