'use strict'

import * as Immutable from 'immutable';

import {ReduceStore} from 'flux/utils'

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes'
import Actions from './PWDLockerActions';

import PasswordGroup from './PasswordGroup';

class PasswordGroupStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return Actions.getPasswordGroups();
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ADD_NEW_GROUP:{
                const group = action.group;
                return state.set(group.id, new PasswordGroup({
                    id: group.id,
                    name: group.name,
                }));
            }
            default:
                return state;
        }
    }
}

export default new PasswordGroupStore();