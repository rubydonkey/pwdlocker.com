/**
 * Created by zarko on 7/23/17.
 */

'use strict';

import React from 'react';

import Password from './Password';

function Passwords(props) {
    const passwords = props.passwords.entrySeq().map(([index, password]) => {
        return(
            <Password
                key = {password.id}
                password = {password}
                onDeletePassword={props.onDeletePassword}
                onUpdatePassword={props.onUpdatePassword}
            />
        )});

    return( <div className='col-md-9'>{passwords}</div> );
}

export default Passwords;
