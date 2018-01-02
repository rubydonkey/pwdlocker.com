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
            case Actions.CREATE_CONFIGVAR:
            case Actions.UPDATE_CONFIGVAR:
            case Actions.DELETE_CONFIGVAR:
            default:
                return state;
        }
    }
}

export default new UserStore();