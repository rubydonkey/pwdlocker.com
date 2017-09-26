
import React, {Component} from 'react';

import PasswordForm from '../views/PasswordForm.js';

import { withRouter } from 'react-router'

class PasswordEditPage extends Component {
  constructor(props) {
    super(props)
  }

  getPassword(id) {
    const passwords = this.props.passwords;
    return passwords.get(id).get('data');
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id),
          password = this.getPassword(id);

    this.props.onStartEditPassword(password)
  }

  componentWllChangeProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      const id = parseInt(nextProps.match.params.id),
            password = this.getPassword(id);

      this.props.onStartEditPassword(password)
    }
  }

  render() {
    const props = this.props;

    return (
      <div className='content'>
        <div className='container-fluid'>
          <PasswordForm {...props} />
        </div>
      </div>
    );
  }

}

export default withRouter(PasswordEditPage);
