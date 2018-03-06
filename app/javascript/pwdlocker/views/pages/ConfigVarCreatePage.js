import React, {Component} from 'react';

import ConfigVarForm from '../ConfigVarForm.js';

import { withRouter } from 'react-router'

class ConfigVarCreatePage extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.onStartCreateConfigVar()
    }

    componentWllChangeProps(nextProps) {
        this.props.onStartCreateConfigVar()
    }

    render() {
        const props = this.props;

        return (
            <div className='content'>
                <div className='container-fluid'>
                    <ConfigVarForm {...props} />
                </div>
            </div>
        );
    }
}

export default withRouter(ConfigVarCreatePage);
