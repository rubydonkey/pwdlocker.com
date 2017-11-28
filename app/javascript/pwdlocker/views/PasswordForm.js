/**
 * Created by zarko on 7/19/17.
 */

'use strict';

import React from 'react';

import {Link} from 'react-router-dom';
import {Prompt} from 'react-router';

function PasswordForm(props){
    return(
        <div className='row'>
          <div className='col-md-8 col-md-offset-2'>

            <div className='card'>
              <div className="header">
                  <h4 className="title">{props.passwordForm.editPassword ? 'Edit Password' : 'New Password'}</h4>
                  <p className="category">
                    {props.passwordForm.editPassword ? 'Update your Password data' : 'Please enter your new Password data for this website'}
                  </p>
              </div>
              <div className='content'>
                <UsernameBlock {...props}/>
                <PasswordBlock {...props}/>
                <TitleBlock {...props}/>
                <GroupForm {...props}/>
                <URLBlock {...props}/>
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

function TitleBlock(props){

    const title = props.passwordForm.password.title;
    const error = props.passwordForm.errors.title;

    return (
        <div>
            <label>Title</label>
            <input className="form-control"
                   type="text"
                   value={title}
                   onChange={ (e) => props.onChangeFormTitle(e.target.value)}
                   name="password[title]"/>

            <span style={{color: 'red'}}>{error}</span>
            <br/>
        </div>
    );
}

function URLBlock(props){
    const URL = props.passwordForm.password.URL;
    const error = props.passwordForm.errors.URL;

    return(
        <div>
            <label>Website Url</label>
            <input className="form-control"
                   type="text"
                   value={URL}
                   onChange={ (e) =>  props.onChangeFormURL(e.target.value) }
                   name="password[URL]"/>

            <span style={{color: 'red'}}>{error}</span>
            <br />
        </div>
    );
}

function UsernameBlock(props){
    const username = props.passwordForm.password.username;
    const error = props.passwordForm.errors.username;

    return(
        <div>
            <label>Username</label>
            <input className="form-control"
                   type="text"
                   value={username}
                   onChange={ (e) =>  props.onChangeFormUsername(e.target.value) }
                   name="password[username]"/>

            <span style={{color: 'red'}}>{error}</span>
            <br />
        </div>
    );
}

function PasswordBlock(props){
    const password = props.passwordForm.password.password;
    const error = props.passwordForm.errors.password;

    return(
        <div>
            <label>Password</label>
            <textarea className="form-control"
                      value={password}
                      onChange={ (e) =>  props.onChangeFormPassword(e.target.value)  }
                      name="password[password]"/>

            <span style={{color: 'red'}}>{error}</span>
            <br />
            <br />
        </div>
    );
}

function SubmitButton(props){
    const password = props.passwordForm.password;
    const cancelButton = (
      <div>
        <Link className='btn btn-cancel btn-link btn-lg' to='/passwords'>Cancel</Link>
        <Prompt message='Are you sure you want to leave? Your data is not saved!' when={props.passwordForm.unsavedData}/>
      </div>
    );

    if(props.passwordForm.editPassword === true){
        return(
          <div>
            {cancelButton}
            <button className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={ () => props.onUpdatePassword(password) }>Update</button>
          </div>
        );
    }
    else{
        return(
          <div>
            {cancelButton}
            <button className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={ () => props.onAddPassword(password) }>Save</button>
          </div>
        );
    }
}

function GroupForm(props) {
    const groups = props.passwordGroups;
    const error = props.passwordForm.errors.name;
    const groupName = props.passwordForm.groupName;

    const passwordGroups = groups.entrySeq().map(([index, group]) => {
        return<option key={group.id} value={group.id}>{group.name}</option>
    });

    const passwordGroupSelect =
        <select
            className="form-control"
            name="password_group_select"
            value={props.passwordForm.password.password_group_id}
            onChange={(e) => props.onChangePasswordGroup(e.target.value)}>
            <option value={0}>Select group</option>
            {passwordGroups}
        </select>

    const passwordGroupButtonAdd =
        <button className="btn btn-link pull-right"
                name="password_group_add"
                type="submit"
                onClick={() => props.onRenderGroupForm()} >
            Add new group
        </button>

    const passwordGroupForm =(
        <div style={{padding: '1em', backgroundColor: '#eee'}}>
            <input  className="form-control"
                    name="password_group[name]"
                    value = {groupName}
                    autoComplete="off"
                    placeholder="Enter group name"
                    onChange={(e) => props.onChangeGroupName(e.target.value)}
            />
            <span style={{color: 'red'}}>{error}</span>

            <div className='text-right'>
              <button className="btn btn-primary text-right btn-xs"
                    type="submit"
                    name="password_group_create"
                    onClick={(e) => { e.preventDefault(); props.onAddPasswordGroup(groupName) }}> Create group </button>
            </div>
        </div>
    )

    if(props.passwordForm.renderPasswordGroupForm)
    {
        return(
            <div>
                {passwordGroupSelect}
                {passwordGroupForm}
                <div className='clearfix'></div>
            </div>
        );
    }
    else
    {
        return(
            <div>
                {passwordGroupSelect}
                {passwordGroupButtonAdd}
                <div className='clearfix'></div>
            </div>
        );
    }
}

export default PasswordForm;
