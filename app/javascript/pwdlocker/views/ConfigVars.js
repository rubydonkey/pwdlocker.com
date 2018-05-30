/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React from 'react';

import ConfigVar from './ConfigVar';
import Fuse from 'fuse.js';

function ConfigVars(props) {

    var   options      = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "data.name",
        ]
    };

    const configVarsFuse = props.user.configVars.toList().toJS();
    var fuse = new Fuse(configVarsFuse, options);

    let filteredConfigVars;

    if(props.searchString != "")
        filteredConfigVars = fuse.search(props.searchString);
    else
        filteredConfigVars = configVarsFuse;

    const configVars = filteredConfigVars.map(configVar => {
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
