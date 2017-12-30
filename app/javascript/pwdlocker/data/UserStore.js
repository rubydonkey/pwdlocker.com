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
        return state;
    }
}

export default new UserStore();