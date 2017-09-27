/**
 * Created by zarko on 7/19/17.
 */

'use strict';

import React from 'react';

import SearchForm from './SearchForm';
import PasswordForm from './PasswordForm';
import Passwords from './Passwords';
import Sidebar from 'pwdlocker/components/Sidebar';
import Header from 'pwdlocker/components/Header/Header';
import logo from 'pwdlocker/assets/images/logo.png';

import PasswordEditPage from '../pages/PasswordEditPage.js';
import PasswordNewPage from '../pages/PasswordNewPage';

import { Route, Switch, Redirect } from 'react-router-dom';

function AppView(props) {

    return(
        <div className='wrapper'>
          <Sidebar {...props} />

          <div className='main-panel'>
              <Header {...props}/>

              <Switch>
                  <Redirect from="/" exact to="/passwords"/>

                  <Route path="/passwords/:id/edit" render={()=> <PasswordEditPage {...props} />} />
                  <Route path="/passwords/new" render={(routerProps)=> <PasswordNewPage  {...Object.assign({}, routerProps, props)} />} />
                  <Route path="/passwords" render={()=> <Passwords  {...props} />} />
              </Switch>
          </div>
        </div>
    );
}

export default AppView;
