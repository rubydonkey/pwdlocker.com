'use strict';

import React from 'react';
import Fuse from 'fuse.js';

import ConfigVar from './ConfigVar';

function Applications(props){

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

    const [... applicationsKeys] = props.user.applications.keys();
    const applicationsCards = applicationsKeys.map( applicationKey => {
        const configVars = props.user.applications.get(applicationKey).toList().toJS();

        const fuse = new Fuse(configVars, options);
        let filteredConfigVars;
        if(props.searchString != "")
            filteredConfigVars = fuse.search(props.searchString);
        else
            filteredConfigVars = configVars;

        if(filteredConfigVars.length === 0)
            return null;

        const configVarsCards = filteredConfigVars.map((configVar) => {
           return(
               <ConfigVar
                   key = {"" + applicationKey.id + configVar.id}
                   configVar = {props.user.configVars.get(configVar.id)}
                   {...props}
               />
           )});

        return(
            <div className='content' key={applicationKey.id}>
                <div className="header">
                    <h4 className="title">{applicationKey.name}</h4>
                    <hr/>
                </div>
                <div className='container-fluid'>
                    <div className='row'>{configVarsCards}</div>
                </div>
            </div>
        )
    });

    return (
        <div className='content'>
            {applicationsCards}
        </div>
    );
}
export default Applications;
