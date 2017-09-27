import React, {Component} from 'react';

import PasswordForm from '../views/PasswordForm.js';

import { withRouter } from 'react-router'

class PasswordNewPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.onStartAddNewPassword()
  }

  componentWllChangeProps(nextProps) {
    this.props.onStartAddNewPassword()
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

export default withRouter(PasswordNewPage);
