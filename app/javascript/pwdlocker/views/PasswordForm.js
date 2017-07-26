/**
 * Created by zarko on 7/19/17.
 */

'use strict';

import React from 'react';

function PasswordForm(props){
    return(
        <div>
            <TitleBlock {...props}/>
            <URLBlock {...props}/>
            <UsernameBlock {...props}/>
            <PasswordBlock {...props}/>
            <GroupForm {...props}/>
            <SubmitButton {...props}/>
        </div>
    );
}

function TitleBlock(props){

    const title = props.passwordForm.password.title;
    const error = props.passwordForm.errors.title;

    return (
        <div>
            <label>TITLE</label>
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
            <label>Url</label>
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
    if(props.passwordForm.editPassword === true){
        return( <button className="btn btn-success"
                        type="submit"
                        onClick={ () => props.onUpdatePassword(password) }>Update</button>);
    }
    else{
        return( <button className="btn btn-success"
                        type="submit"
                        onClick={ () => props.onAddPassword(password) }>Create</button>);
    }
}

function GroupForm(props) {
    const groups = props.passwordForm.groups;
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
            onChange={(e) => props.onChangeFormPasswordGroup(e.target.value)}>
            <option value={0}>Select group</option>
            {passwordGroups}
        </select>

    const passwordGroupButtonAdd =
        <button className="btn btn-link pull-right"
                name="password_group_add"
                type="submit"
                onClick={() => props.onToggleGroupForm()} >
            Add group
        </button>

    const passwordGroupForm =
        <div>
            <input  className="form-control"
                    name="password_group[name]"
                    value = {groupName}
                    autoComplete="off"
                    onChange={(e) => props.onChangeGroupName(e.target.value)}
            />
            <span style={{color: 'red'}}>{error}</span>
            <br/>
            <button className="btn btn-primary"
                    type="submit"
                    name="password_group_create"
                    onClick={() => props.onAddPasswordGroup(groupName) }> Create group </button>
        </div>

    if(props.passwordForm.renderPasswordForm)
    {
        return(
            <div>
                {passwordGroupSelect}
                {passwordGroupForm}
            </div>
        );
    }
    else
    {
        return(
            <div>
                {passwordGroupSelect}
                {passwordGroupButtonAdd}
            </div>
        );
    }
}

export default PasswordForm;
