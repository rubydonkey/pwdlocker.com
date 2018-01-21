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
                return Actions.getUser();
            case ActionTypes.CREATE_CONFIGVAR:
                debugger;
                action.configVar.isCreated = true;
                const configVar = action.configVar;
                const id = state.configVars.count();
                const configVars = state['configVars'].set(id, new ConfigVar({
                    id: id,
                    data: configVar,
                    isCreated: configVar.isCreated,
                    isUpdated: configVar.isUpdated,
                    isDeleted: configVar.isDeleted,
                }));
                return {
                    data: state.data,
                    configVars: state.configVars,
                };
            case ActionTypes.UPDATE_CONFIGVAR:
                if(action.configVar.isCreated == false){
                    // if new created is updated later before saved in db
                    // flag should remain created so it will be created in db during sync
                    action.configVar.isUpdated = true;
                    action.configVar.isDeleted = false;
                }
                return state.configVars.setIn([action.configVar.id, "data"], action.configVar);
            case ActionTypes.DELETE_CONFIGVAR:
                if(action.configVar.isCreated == true){
                    // still not been saved in db
                    // delete it immediately from configVars
                    return state.delete(action.configVar.id);
                }
                else{
                    action.configVar.isUpdated = false;
                    action.configVar.isDeleted = true;
                    return state.configVars.setIn([id, "data"], action.configVar);
                }
            default:
                return state;
        }
    }
}

export default new UserStore();