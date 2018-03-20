'use strict';

import React from 'react';

import ConfigVar from './ConfigVar';

function Applications(props){
    const applications = props.applications.entrySeq().map( (e, index) => {
        const filteredConfigVars = e[1].filter((configVar) => {
            return configVar.data.name.toLowerCase().indexOf(props.searchString.toLowerCase()) != -1;
        });

        if(filteredConfigVars.size === 0)
            return null;

        // configVars in applications store are built from separate set of configVars
        // from the configVars of the ConfigVars store
        // even though both config vars share same ids any action sent to the configVarsStore
        // modify props.configVars and will be visible only at configVars view
        // match configVar to props.configVars so any actions to configVarsStore
        // will be reflected to the cv cards at this view
        const appConfigVars = filteredConfigVars.map((configVar) => {
           return(
               <ConfigVar
                   key = {"" + index + configVar.id}
                   configVar = {props.configVars.get(configVar.id)}
                   {...props}
               />
           )});

        return(
            <div className='content' key={index}>
                <div className="header">
                    <h4 className="title">{e[0]}</h4>
                    <hr/>
                </div>
                <div className='container-fluid'>
                    <div className='row'>{appConfigVars}</div>
                </div>
            </div>
        )
    });

    return (
        <div className='content'>
            {applications}
        </div>
    );

}

export default Applications;
