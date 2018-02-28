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
            isGetConfigVars: false,
            isCommitConfigVars: false,
        });
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_START_GET_CONFIG_VARS:
                debugger;
                return state.set('isGetConfigVars', true);
            case ActionTypes.ON_GET_CONFIG_VARS:
                return state.set('isGetConfigVars', false);
            case ActionTypes.ON_START_COMMIT_CONFIG_VARS:
                return state.set('isCommitConfigVars', true);
            case ActionTypes.ON_COMMIT_CONFIG_VARS:
                return state.set('isCommitConfigVars', false);
            default:
                return state;
        }
    }
}

export default new SyncStore();
