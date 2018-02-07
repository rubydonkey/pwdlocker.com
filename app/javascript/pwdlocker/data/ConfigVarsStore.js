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
    }

    getInitialState(){
        return Actions.getConfigVars();
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_GET_CONFIG_VARS:
                return Actions.getConfigVars();
            case ActionTypes.CREATE_CONFIGVAR:
                configVar.id = state.count();
                const configVar = action.configVar;
                configVar.data.isCreated = true;
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

                    action.configVar.data.isUpdated = true;
                    action.configVar.data.isDeleted = false;
                }
                return state.setIn([action.configVar.id, "data"], action.configVar.data);
            case ActionTypes.DELETE_CONFIGVAR:
                if(action.configVar.data.isCreated === true){
                    // still not been saved in db
                    // delete it immediately from configVars
                    return state.delete(action.configVar.id);
                }
                else{
                    // if exist in db mark for deletion
                    state = state.setIn([action.configVar.id, "isUpdated"], false);
                    state = state.setIn([action.configVar.id, "isDeleted"], true);

                    action.configVar.data.isUpdated = false;
                    action.configVar.data.isDeleted = true;
                    return state.setIn([action.configVar.id, "data"], action.configVar.data);
                }

            case ActionTypes.ON_DISABLE_CONFIG_VAR_CHANGES:

                action.configVar.data.isCreated = false;
                action.configVar.data.isUpdated = false;
                action.configVar.data.isDeleted = false;

                state = state.setIn([action.configVar.id, "isCreated"], false);
                state = state.setIn([action.configVar.id, "isUpdated"], false);
                state = state.setIn([action.configVar.id, "isDeleted"], false);
                return state.setIn([action.configVar.id, "data"], action.configVar.data);
            default:
                return state;
        }
    }
}

export default new ConfigVarsStore();