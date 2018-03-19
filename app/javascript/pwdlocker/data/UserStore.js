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
                return action.user;
            default:
                if(state === undefined)
                    return null;
                else
                    return state;
        }
    }
}

export default new UserStore();