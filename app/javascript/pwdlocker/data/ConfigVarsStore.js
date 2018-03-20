'use strict'

import * as Immutable from 'immutable';


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

import ConfigVar from './ConfigVar';

class ConfigVarsStore extends ReduceStore {
    constructor(){
        super(Dispatcher);
        this.toConfigVars = this.toConfigVars.bind(this);
    }

    getInitialState(){
        return Actions.getConfigVars();
    }

    reduce(state, action){
        switch (action.type){
            // this is not called because this store is not created
            // when user store dispatch this action from it`s getInitialState()
            case ActionTypes.ON_GET_USER_DATA:
                // if user not logged in return null
                if (action.user == null)
                    return null;
                return this.toConfigVars(action.user.config_vars);
            case ActionTypes.ON_GET_CONFIG_VARS:
                return this.toConfigVars(action.configVars);
            case ActionTypes.CREATE_CONFIGVAR:
                let configVar = action.configVar;
                configVar.id = this.getMaxID(state) + 1;
                configVar.data.is_created = true;
                return state.set(configVar.id, new ConfigVar({
                    id: configVar.id,
                    isCreated: true,
                    data: configVar.data,
                }));
            case ActionTypes.UPDATE_CONFIGVAR:
                if(action.configVar.isCreated === false){
                    // if new created is updated later before saved in db
                    // flag should remain created so it will be created in db during sync
                    state = state.setIn([action.configVar.id, "isUpdated"], true);
                    state = state.setIn([action.configVar.id, "isDeleted"], false);

                    action.configVar.data.is_updated = true;
                    action.configVar.data.is_deleted = false;
                }
                return state.setIn([action.configVar.id, "data"], action.configVar.data);
            case ActionTypes.DELETE_CONFIGVAR:
                if(action.configVar.isCreated === true){
                    // still not been saved in db
                    // delete it immediately from configVars
                    return state.delete(action.configVar.id);
                }
                else{
                    // if exist in db mark for deletion
                    state = state.setIn([action.configVar.id, "isUpdated"], false);
                    state = state.setIn([action.configVar.id, "isDeleted"], true);

                    action.configVar.data.is_updated = false;
                    action.configVar.data.is_deleted = true;
                    return state.setIn([action.configVar.id, "data"], action.configVar.data);
                }

            case ActionTypes.ON_DISABLE_CONFIG_VAR_CHANGES:

                action.configVar.data.is_created = false;
                action.configVar.data.is_updated = false;
                action.configVar.data.is_deleted = false;

                state = state.setIn([action.configVar.id, "isCreated"], false);
                state = state.setIn([action.configVar.id, "isUpdated"], false);
                state = state.setIn([action.configVar.id, "isDeleted"], false);
                return state.setIn([action.configVar.id, "data"], action.configVar.data);
            default:
                if(state == undefined)
                    return null;
                return state;
        }
    }

    toConfigVars(config_vars){
        let configVars = Immutable.OrderedMap();
        for (var i = 0; i < config_vars.length; i++)
        {
            const configVar = config_vars[i];
            configVars = configVars.set(configVar.id, new ConfigVar({
                id: configVar.id,
                data: configVar,
            }));
        }
        return configVars;
    }

    getMaxID(state){
        return state.reduce((max, configVar) => configVar.id > max ? configVar.id : max, -1);
    }
}

export default new ConfigVarsStore();