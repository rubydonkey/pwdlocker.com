/**
 * Created by zarko on 7/19/17.
 */

'use strict';

import React from 'react';

import SearchForm from './SearchForm';
import PasswordForm from './PasswordForm';
import Passwords from './Passwords';

function AppView(props) {
    return(
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <PasswordForm {...props}/>
            </div>
            <div className='col-md-8'>
              <SearchForm {...props}/>
              <Passwords {...props}/>
            </div>
          </div>
        </div>
    );
}

export default AppView;
