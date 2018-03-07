/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React from 'react';
import Fuse from 'fuse';

import ConfigVar from './ConfigVar';

function ConfigVars(props) {
    const filteredConfigVars = props.configVars.filter((configVar) => {
        return configVar.data.name.toLowerCase().indexOf(props.searchString.toLowerCase()) !== -1;
    });

    const configVars = filteredConfigVars.entrySeq().map(([index, configVar]) => {
        return(
            <ConfigVar
                key = {configVar.id}
                configVar = {configVar}
                {...props}
            />
        )});

    return(
        <div className='content'>
            <div className='container-fluid'>
                <div className='row'>{configVars}</div>
            </div>
        </div>
    );
}

export default ConfigVars;
