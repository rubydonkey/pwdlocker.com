'use strict';

import React from 'react';

import ConfigVars from './ConfigVars';
import Sidebar from 'pwdlocker/components/Sidebar';
import Header from 'pwdlocker/components/Header/Header';

import { Route, Switch, Redirect } from 'react-router-dom';

function AppView(props) {

    return(
        <div className='wrapper'>
          <Sidebar {...props} />

          <div className='main-panel'>
              <Header {...props}/>

              <Switch>
                  <Redirect from="/" exact to="/configVars"/>
                  <Route path="/configVars" render={()=> <ConfigVars  {...props} />} />
              </Switch>
          </div>
        </div>
    );
}

export default AppView;
