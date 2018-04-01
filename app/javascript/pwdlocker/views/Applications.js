'use strict';

import React from 'react';

import ConfigVar from './ConfigVar';

function Applications(props){
    const [... applications] = props.user.applications.keys();

    const applicationsCards = applications.map( application => {
        const configVars = props.user.applications.get(application);
        const filteredConfigVars = configVars.filter((configVar) => {
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
        const configVarsCards = filteredConfigVars.map((configVar) => {
           return(
               <ConfigVar
                   key = {"" + application.id + configVar.id}
                   configVar = {props.configVars.get(configVar.id)}
                   {...props}
               />
           )});

        return(
            <div className='content' key={application.id}>
                <div className="header">
                    <h4 className="title">{application.name}</h4>
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
