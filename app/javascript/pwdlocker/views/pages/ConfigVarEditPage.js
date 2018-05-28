
import React, {Component} from 'react';

import ConfigVarForm from '../ConfigVarForm.js';

import { withRouter } from 'react-router'
import ConfigVar from '../../data/ConfigVar';

class ConfigVarEditPage extends Component {
    constructor(props) {
        super(props)
    }

    getConfigVar(id) {
        const configVars = this.props.user.configVars;
        const configVar = configVars.get(id);
        //let configVarsApplication = new Array();
        //for(let i = 0; i < configVar.data.applications.length; i++)
        //    configVarsApplication[i] = configVar.data.applications[i];
//
        //const configVarForm = new ConfigVar({
        //    id: configVar.id,
        //    isCreated: configVar.isCreated,
        //    isUpdated: configVar.isUpdated,
        //    isDeleted: configVar.isDeleted,
        //    data: {
        //        name: configVar.data.name,
        //        value: configVar.data.value,
        //        user_id: configVar.data.user_id,
        //        is_created: false,
        //        is_updated: false,
        //        is_deleted: false,
        //        applications: configVarsApplication,
        //    },
        //});
        return configVar;
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
