'use strict';

import React from 'react';

import ConfigVar from './ConfigVar';

function Applications(props){
    const applications = props.applications.entrySeq().map( e => {
        const appConfigVars = e[1].map((configVar) => {
           return(
               <ConfigVar
                   key = {configVar.id}
                   configVar = {configVar}
                   {...props}
               />
           )});

        return(
            <div className='content'>
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
