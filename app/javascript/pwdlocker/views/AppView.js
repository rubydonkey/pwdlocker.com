/**
 * Created by zarko on 7/19/17.
 */

'use strict';

import React from 'react';

import PasswordForm from './PasswordForm';
import Passwords from './Passwords';

function AppView(props) {
    return(
        <div>
            <PasswordForm {...props}/>
            <Passwords {...props}/>
        </div>
    );
}

export default AppView;
