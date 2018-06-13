'use strict';

import React from 'react';

import ConfigVars from './ConfigVars';
import Applications from './Applications';
import ConfigVarCreatePage from './pages/ConfigVarCreatePage';
import ConfigVarEditPage from './pages/ConfigVarEditPage';

import Sidebar from './Sidebar';
import Header from './header/Header';

import { Route, Switch, Redirect } from 'react-router-dom';

function AppView(props) {

    let mainPanel = null;
    let sideBar = null;
    if(props.user != null)
    {
        mainPanel = (
            <div className='padding-top'>
                <Switch>
                    <Redirect from="/" exact to={`/user/${props.user.id}/configVars`}/>
                    <Route path="/user/:userID/configVars" render={() => <ConfigVars  {...props} />}/>
                    <Route path="/user/:userID/applications" render={() => <Applications {...props} />}/>
                    <Route path="/user/:userID/configVar/:configVarID/edit" render={() => <ConfigVarEditPage  {...props} />}/>
                    <Route path="/user/:userID/configVar/new" render={() => <ConfigVarCreatePage  {...props} />}/>
                </Switch>
            </div>
        );
        sideBar = (
                <Sidebar {...props}/>
        );
    }

    return (
        <div className='wrapper'>
            {sideBar}
            <div className='main-panel'>
                <Header {...props}/>
                {mainPanel}
            </div>
        </div>
    )
}
export default AppView;
