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

    const name = props.configVarForm.configVar.name;
    const error = props.configVarForm.errors.name;

    return (
        <div>
            <label>Name</label>
            <input className="form-control"
                   type="text"
                   value={name}
                   onChange={ (e) => props.onChangeFormName(e.target.value)}
                   name='Name'/>

            <span style={{color: 'red'}}>{error}</span>
            <br/>
        </div>
    );
}

function ValueBlock(props){
    const value = props.configVarForm.configVar.value;
    const error = props.configVarForm.configVar.errors;

    return(
        <div>
            <label>Value</label>
            <textarea className="form-control"
                      value={value}
                      onChange={ (e) =>  props.onChangeFormValue(e.target.value)  }
                      name='Value'/>

            <span style={{color: 'red'}}>{error}</span>
            <br />
            <br />
        </div>
    );
}

function SubmitButton(props){
    const configVar = props.configVarForm.configVar;
    const cancelButton = (
        <div>
            <Link className='btn btn-cancel btn-link btn-lg' to={`/user/${props.user.data.id}/configVars`}>Cancel</Link>
            <Prompt message='Are you sure you want to leave? Your data is not saved!' when={props.configVarForm.unsavedData}/>
        </div>
    );

    if(props.configVarForm.editConfigVar === true){
        return(
            <div>
                {cancelButton}
                <button className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={ () => props.onUpdateConfigVar(configVar) }>Update</button>
            </div>
        );
    }
    else{
        return(
            <div>
                {cancelButton}
                <button className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={ () => props.onCreateConfigVar(configVar) }>Save</button>
            </div>
        );
    }
}

export default ConfigVarForm;
