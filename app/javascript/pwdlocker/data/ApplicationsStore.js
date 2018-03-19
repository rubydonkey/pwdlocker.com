'use strict'

import * as Immutable from 'immutable';

import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

import ConfigVar from './ConfigVar';


class ApplicationsStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return null;
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_GET_USER_DATA:
                return this.toApplications(action.user);
            default:
                return state;
        }
    }

    toApplications(user){
        let applications = Immutable.Map();
        for(var i = 0; i < user.applications.length; i++){
            const userApp = user.applications[i];
            let appConfigVars = Immutable.List();
            for(var j = 0; j < user.config_vars.length; j++){
                const configVar = user.config_vars[j];
                for(var k = 0; k < configVar.applications.length; k++){
                    const cvApp = configVar.applications[k];
                    if(userApp.name == cvApp.name){
                        appConfigVars = appConfigVars.push(new ConfigVar({
                            id: i,
                            data: configVar,
                        }));
                    }
                }
            }
            applications = applications.set(userApp.name, appConfigVars);
        }
        return applications;
    }
}

export default new ApplicationsStore();