
import React, {Component} from 'react';

import ConfigVarForm from '../ConfigVarForm.js';

import { withRouter } from 'react-router'

class ConfigVarEditPage extends Component {
    constructor(props) {
        super(props)
    }

    getConfigVar(id) {
        const configVars = this.props.configVars;
        return configVars.get(id);
    }

    componentWillMount() {
        const   id = parseInt(this.props.match.params.configVarID),
                configVar = this.getConfigVar(id);


        this.props.onStartUpdateConfigVar(configVar)
    }

    componentWillChangeProps(nextProps) {
        if (this.props.params.configVarID !== nextProps.params.configVarID) {
            const id = parseInt(nextProps.match.params.configVarID),
                configVar = this.getConfigVar(configVarID);

            this.props.onStartUpdateConfigVar(configVar)
        }
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

export default withRouter(ConfigVarEditPage);
