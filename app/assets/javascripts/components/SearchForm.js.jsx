class SearchForm extends React.Component
{ 
	constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      var action = {
          type: "ON_SEARCH_STRING_CHANGE",
          value: e.target.value
      }
      this.props.handleAction(action);
  }

  render() {
    const searchString = this.props.searchString;
    return (
      <div>
        <input onChange={this.handleChange} placeholder="Search..." />
      </div>
    );
  }
}