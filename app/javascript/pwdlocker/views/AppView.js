'use strict';

import React from 'react';

import ConfigVars from './ConfigVars';
import ConfigVarCreatePage from '../pages/ConfigVarCreatePage';
import ConfigVarEditPage from '../pages/ConfigVarEditPage';

import Sidebar from 'pwdlocker/components/Sidebar';
import Header from 'pwdlocker/components/Header/Header';

import { Route, Switch, Redirect } from 'react-router-dom';

function AppView(props) {

    let mainPanel = null;
    if(props.user.data != null)
    {
        mainPanel = (
            <div>
                <Switch>
                    <Redirect from="/" exact to={`/user/${props.user.data.id}/configVars`}/>

                    <Route path="/user/:userID/configVars" render={() => <ConfigVars  {...props} />}/>
                    <Route path="/user/:userID/configVar/:configVarID/edit" render={() => <ConfigVarEditPage  {...props} />}/>
                    <Route path="/user/:userID/configVar/new" render={() => <ConfigVarCreatePage  {...props} />}/>
                </Switch>
                <Sidebar {...props} />
            </div>
        )
    }

    return (
        <div className='wrapper'>
            <div className='main-panel'>
                <Header {...props}/>
                {mainPanel}
            </div>
        </div>
    )
}
export default AppView;
