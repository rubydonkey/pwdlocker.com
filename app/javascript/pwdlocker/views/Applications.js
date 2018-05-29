'use strict';

import React from 'react';

import ConfigVar from './ConfigVar';

function Applications(props){
    const [... applicationsKeys] = props.user.applications.keys();

    const applicationsCards = applicationsKeys.map( applicationKey => {
        const configVars = props.user.applications.get(applicationKey);
        const filteredConfigVars = configVars.filter((configVar) => {
            return configVar.data.name.toLowerCase().indexOf(props.searchString.toLowerCase()) != -1;
        });

        if(filteredConfigVars.size === 0)
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
