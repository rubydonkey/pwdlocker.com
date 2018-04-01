'use strict'

import * as Immutable from 'immutable';

import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

import ConfigVar from './ConfigVar';

class UserStore extends ReduceStore {
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return Actions.getUser();
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_GET_USER_DATA:
                return this.parseUserData(action.user);
            case ActionTypes.CREATE_CONFIGVAR:
                let configVar = action.configVar;
                configVar.id = this.getNextID(state);
                configVar.data.is_created = true;
                let configVars = state.configVars;
                configVars = configVars.set(configVar.id, new ConfigVar({
                    id: configVar.id,
                    isCreated: true,
                    data: configVar.data,
                }));

                let applications = state.applications;
                configVar.data.applications.map(application => {
                   let appConfigVars = applications.get(application).push(configVar);
                   applications = applications.set(application, appConfigVars);
                });

                return {
                    configVars: configVars,
                    applications: applications,
                }
            default:
                return state;
        }
    }

    parseUserData(user){
        let applications = Immutable.Map();
        for(let i = 0; i < user.applications.length; i++)
            applications = applications.set(user.applications[i], Immutable.List());

        // parse config vars
        const [... applicationsKeys] = applications.keys();
        let configVars = Immutable.OrderedMap();
        for (var i = 0; i < user.config_vars.length; i++){
            const configVar = new ConfigVar({
                id: user.config_vars[i].id,
                data: user.config_vars[i],
            });

            configVars = configVars.set(configVar.id, configVar);

            for (var j = 0; j < configVar.data.applications.length; j++){
                const appName = configVar.data.applications[j].name;

                const applicationKey = applicationsKeys.find((app) => app.name === appName);
                let appConfigVars = applications.get(applicationKey).push(configVar);
                applications = applications.set(applicationKey, appConfigVars);
            }
        }

        return {
            configVars: configVars,
            applications: applications,
        }
    }

    getNextID(state){
        return state.reduce((max, configVar) => configVar.id > max ? configVar.id : max, -1);
    }
}

export default new UserStore();