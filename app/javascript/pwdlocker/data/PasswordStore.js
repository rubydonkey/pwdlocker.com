/**
 * Created by zarko on 7/19/17.
 */

'use strict'

import * as Immutable from 'immutable';

import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

import Password from './Password';

class PasswordStore extends ReduceStore {
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return Actions.getPasswords();
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ADD_NEW_PASSWORD:{
                const password = action.password;
                return state.set(password.id, new Password({
                    id: password.id,
                    data: password,
                }));
            }
            case ActionTypes.UPDATE_PASSWORD:{
                const password = action.password;
                var copy = Object.assign({}, state);
                for(var property in password){
                    if(password.hasOwnProperty(property)){
                        copy = copy.setIn([password.id, property.name], property.value);
                    }
                }
                return copy;
            }
            case ActionTypes.DELETE_PASSWORD:{
                debugger;
                return state.delete(action.id);
            }
            default:
                return state;
        }
    }
}

export default new PasswordStore();