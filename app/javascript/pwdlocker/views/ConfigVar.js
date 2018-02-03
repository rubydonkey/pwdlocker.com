'use strict';

import React,  { Component }  from 'react';
import * as jQuery from 'jquery';

import ConfigVarCard from '../components/ConfigVarCard';

export class ConfigVar extends Component {
    render() {
        const props = this.props;

        return(
            <ConfigVarCard
                configVar={props.configVar}
                onDeleteConfigVar = {props.onDeleteConfigVar}
            />
        );
    }
}

export default ConfigVar;
