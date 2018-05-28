'use strict'

import * as Immutable from 'immutable';


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

class SyncStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return Immutable.Map({
            isPullingUserData: false,
            isPushingConfigVars: false,
        });
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_BEGIN_PULL_USER_DATA:
                return state.set('isPullingUserData', true);
            case ActionTypes.ON_END_PULL_USER_DATA:
                return state.set('isPullingUserData', false);
            case ActionTypes.ON_BEGIN_PUSH_CONFIG_VAR:
                return state.set('isPushingConfigVars', true);
            case ActionTypes.ON_END_PUSH_CONFIG_VAR:
                return state.set('isPushingConfigVars', false);
            default:
                return state;
        }
    }
}

export default new SyncStore();
