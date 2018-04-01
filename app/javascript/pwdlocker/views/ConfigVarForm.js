/**
 * Created by zarko on 7/19/17.
 */
'use strict';

import React from 'react';

import {Link} from 'react-router-dom';
import {Prompt} from 'react-router';

function ConfigVarForm(props){
    return(
        <div className='row'>
            <div className='col-md-8 col-md-offset-2'>
                <div className='card'>
                    <div className="header">
                        <h4 className="title">{props.configVarForm.editConfigVar ? 'Edit ConfigVar' : 'New ConfigVar'}</h4>
                        <p className="category">
                            {props.configVarForm.editConfigVar ? 'Update your ConfigVar data' : 'Please enter your new ConfigVar data for this website'}
                        </p>
                    </div>
                    <div className='content'>
                        <NameBlock {...props}/>
                        <ValueBlock {...props}/>
                        <ConfigVarApplicationsBlock{...props}/>
                        <UnusedApplicationsBlock{...props}/>
                    </div>
                    <div className="footer text-right">
                        <hr />
                        <SubmitButton {...props}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NameBlock(props){
    const name = props.configVarForm.configVar.data.name;
    const error = props.configVarForm.errors.name;

    return (
        <div>
            <label>Name</label>
            <input className="form-control"
                   type="text"
                   value={name}
                   onChange={ (e) => props.onChangeFormName(e.target.value)}
                   />

            <span style={{color: 'red'}}>{error}</span>
            <br/>
        </div>
    );
}

function ValueBlock(props){
    const value = props.configVarForm.configVar.data.value;
    const error = props.configVarForm.errors.value;

    return(
        <div>
            <label>Value</label>
            <textarea className="form-control"
                      value={value}
                      onChange={ (e) =>  props.onChangeFormValue(e.target.value)  }
                      />

            <span style={{color: 'red'}}>{error}</span>
            <br />
            <br />
        </div>
    );
}

function ConfigVarApplicationsBlock(props){
    const configVar = props.configVarForm.configVar;

    let applications = null;
    if(configVar.data.applications != null){
        applications = configVar.data.applications.map(application => {
            return( <button className="btn btn-danger btn-xs" type="button" key={application.id} onClick={() => props.onRemoveAppFromConfigVar(application)}>
                    {application.name} <span className="badge">Remove</span>
                </button>
            );
        });
    }

    return(
        <div className="btn-group" role="group" aria-label="...">
            <hr/>
            {applications}
        </div>
    );
}

function UnusedApplicationsBlock(props) {
    const configVar = props.configVarForm.configVar;

    const [... apps] = props.user.applications.keys();

    const unusedApps = apps.filter((app) => {
       return configVar.data.applications.find(configApp => configApp.name === app.name) === undefined;
    });
    
    const applications = unusedApps.map((app, index) => {
        return(
            <button className="btn btn-primary btn-xs" type="button" key={index} onClick={() => props.onAddAppToConfigVar(app)}>
                {app.name}<span className="badge">Add</span>
            </button>
        );
    });

    return(
        <div className="btn-group" role="group" aria-label="...">
            <hr/>
            {applications}
        </div>
    );
}

function SubmitButton(props){
    const configVar = props.configVarForm.configVar;
    // here get user id from props.user
    configVar.data.user_id = props.user.id;

    const cancelButton = (
        <div>
            <Link className='btn btn-cancel btn-link btn-lg' to={`/user/${props.user.id}/configVars`}>Cancel</Link>
            <Prompt message='Are you sure you want to leave? Your data is not saved!' when={props.configVarForm.unsavedData}/>
        </div>
    );

    const btnData = getButtonData(props);
    return(
        <div>
            {cancelButton}
            <button className="btn btn-primary btn-lg"
                    type="submit"
                    onClick={btnData.callback}>{btnData.btnName}</button>
        </div>
    );
}

function getButtonData(props){
    const configVar = props.configVarForm.configVar;
    let callback = null;

    if(configVar.data.name == '' || configVar.data.value == '')
        callback = () => props.onSetConfigVarFormErrors();
    else if(props.configVarForm.editConfigVar === true)
        callback = () => props.onUpdateConfigVar(configVar);
    else
        callback = () => props.onCreateConfigVar(configVar);

    let btnName = '';
    if(props.configVarForm.editConfigVar === true)
        btnName = 'Update';
    else
        btnName = 'Create';

    return {
        callback: callback,
        btnName: btnName,
    }
}

export default ConfigVarForm;
