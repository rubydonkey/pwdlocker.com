'use strict';

import React,  { Component }  from 'react';
import * as jQuery from 'jquery';

import ConfigVarCard from './ConfigVarCard';

export class ConfigVar extends Component {
    render() {
        const props = this.props;

        return(
            <ConfigVarCard
                configVar={props.configVar}
                {...props}
            />
        );
    }
}

export default ConfigVar;
