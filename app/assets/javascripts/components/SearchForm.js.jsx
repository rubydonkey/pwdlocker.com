class SearchForm extends React.Component
{ 
	constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onSearchStringChange(e.target.value);
  }

  render() {
    const searchString = this.props.searchString;
    return (
      <div>
        <input value={searchString} onChange={this.handleChange} placeholder="Search..." />
      </div>
    );
  }

}