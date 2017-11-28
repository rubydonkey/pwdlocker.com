/**
 * Created by zarko on 7/19/17.
 */

'use strict'


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

import PasswordGroup from './PasswordGroup';

class PasswordFormStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return {
            password: {
                id: 0,
                title: '',
                URL: '',
                username: '',
                password: '',
                password_group_id: 0,
            },
            groupName: '',
            renderPasswordGroupForm: false,
            editPassword: false,
            errors: {},
            unsavedData: false
        }
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.CHANGE_FORM_TITLE: {
                var copy = Object.assign({}, state);
                copy.password.title = action.title;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_PASSWORD: {
                var copy = Object.assign({}, state);
                copy.password.password = action.password;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_URL: {
                var copy = Object.assign({}, state);
                copy.password.URL = action.URL;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_USERNAME: {
                var copy = Object.assign({}, state);
                copy.password.username = action.username;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.SET_PASSWORD_FORM_ERRORS: {
                var copy = Object.assign({}, state);
                copy.errors = action.errors;
                return copy;
            }
            case ActionTypes.START_EDIT_PASSWORD: {
                var copy = Object.assign({}, state);
                copy.editPassword = true;
                copy.errors = {};
                for(var property in copy.password){
                    if(copy.password.hasOwnProperty(property)){
                        copy.password[property] = action.password[property];
                    }
                }
                return copy;
            }
            case ActionTypes.START_ADD_NEW_PASSWORD:
            case ActionTypes.ADD_NEW_PASSWORD:
            case ActionTypes.UPDATE_PASSWORD:
                return this.getInitialState();

            case ActionTypes.RENDER_GROUP_FORM: {
                var copy = Object.assign({}, state);
                copy.renderPasswordGroupForm = true;
                return copy;
            }
            case ActionTypes.CHANGE_GROUP_NAME:{
                var copy = Object.assign({}, state);
                copy.groupName = action.groupName;

                return copy;
            }
            case ActionTypes.ADD_NEW_GROUP:{
                var copy = Object.assign({}, state);
                copy.renderPasswordGroupForm = false;
                return copy;
            }
            case ActionTypes.CHANGE_PASSWORD_GROUP:{
                var copy = Object.assign({}, state);
                copy.password.password_group_id = action.password_group_id;
                copy.unsavedData = true;
                return copy;
            }
            default:
                return state;
        }
    }
}

export default new PasswordFormStore();
