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
                state = state.setIn([password.id, "id"], password.id);
                return state.setIn([password.id, "data"], password);
            }
            case ActionTypes.DELETE_PASSWORD:{
                return state.delete(action.id);
            }
            default:
                return state;
        }
    }
}

export default new PasswordStore();