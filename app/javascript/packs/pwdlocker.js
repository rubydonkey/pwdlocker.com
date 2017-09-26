/**
 * Created by zarko on 7/19/17.
 */
'use strict';


import { HashRouter, Route, Switch } from 'react-router-dom';

import AppContainer from '../pwdlocker/containers/AppContainer';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(
    <HashRouter>
      <Switch>
          <Route path="/" name="Home" component={AppContainer}/>
      </Switch>
    </HashRouter>, document.getElementById('pwdlocker'));
