/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React from 'react';

import Password from './Password';

function Passwords(props) {

    const filteredPasswords = props.passwords.filter((password) => {
        return password.data.title.toLowerCase().indexOf(props.searchString.toLowerCase()) !== -1;
    });

    const passwords = filteredPasswords.entrySeq().map(([index, password]) => {
        return(
            <Password
                key = {password.id}
                password = {password}
                onDeletePassword={props.onDeletePassword}
                onStartEditPassword={props.onStartEditPassword}
            />
        )});

    return(
        <div className='content'>
          <div className='container-fluid'>
            <div className='row'>{passwords}</div>
          </div>
        </div>
    );
}

export default Passwords;
