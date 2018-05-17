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
        Actions.getUser();
        return this.getState();
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_GET_USER_DATA:
                return this.parseUserData(action.user);
            case ActionTypes.CREATE_CONFIGVAR:{
                action.configVar.id = this.getNextID(state);
                action.configVar.data.is_created = true;
                state.configVars = state.configVars.set(action.configVar.id, new ConfigVar({
                    id: action.configVar.id,
                    isCreated: true,
                    data: action.configVar.data,
                }));
                const [... applicationsKeys] = state.applications.keys();
                action.configVar.data.applications.map(application => {
                    const applicationKey = applicationsKeys.find(app => app.name == application.name);
                    let appConfigVars = state.applications.get(applicationKey).push(action.configVar);
                    state.applications = state.applications.set(applicationKey, appConfigVars);
                });}
                return state;
            case ActionTypes.UPDATE_CONFIGVAR: {
                if (action.configVar.isCreated === false) {
                    // if new created is updated later before saved in db
                    // flag should remain created so it will be created in db during sync

                    state.configVars = state.configVars.setIn([action.configVar.id, "isUpdated"], true);
                    state.configVars = state.configVars.setIn([action.configVar.id, "isDeleted"], false);

                    action.configVar.data.is_updated = true;
                    action.configVar.data.is_deleted = false;
                    state.configVars = state.setIn([action.configVar.id, "data"], action.configVar.data);
                }
                // check if config var is removed from application
                const [... applicationKeys] = state.applications.keys();
                applicationKeys.map(applicationKey => {
                    let configVars = state.applications.get(applicationKey);
                    if(configVars.find(cv => cv.id === action.configVar.id) &&
                    !action.configVar.data.applications.find(app => app.name === applicationKey.name)){
                        configVars = configVars.splice(configVars.indexOf(action.configVar), 1);
                        state.applications = state.applications.set(applicationKey, configVars);
                    }
                });
                return state;
            }
            case ActionTypes.DELETE_CONFIGVAR:
                if(action.configVar.isCreated === true){
                    // still not been saved in db
                    // delete it immediately from configVars

                    // first delete from applications
                    const [... applicationsKeys] = state.applications.keys();
                    action.data.applications.map(app => {
                        const applicationKey = applicationsKeys.find(key => key.name == app.name);
                        let configVars = state.applications(applicationKey);
                        configVars = configVars.splice(configVars.indexOf(action.configVar), 1);
                        state.applications = state.applications.set(applicationKey, configVars);
                    });

                    // than from configVars
                    state.configVars = state.configVars.delete(action.configVar.id);
                }
                else{
                    // if exist in db mark for deletion
                    state.configVars = state.configVars.setIn([action.configVar.id, "isUpdated"], false);
                    state.configVars = state.configVars.setIn([action.configVar.id, "isDeleted"], true);

                    action.configVar.data.is_updated = false;
                    action.configVar.data.is_deleted = true;
                    state.configVars = state.configVars.setIn([action.configVar.id, "data"], action.configVar.data);
                }
                return state;
            default:
                return state;
        }
    }

    parseUserData(user){
        if(user == null)
            return user;

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
        return state.configVars.reduce((max, configVar) => configVar.id > max ? configVar.id : max, -1) + 1;
    }
}

export default new UserStore();