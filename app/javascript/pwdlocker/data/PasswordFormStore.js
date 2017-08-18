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
            groups: Actions.getPasswordGroups(),
            groupName: '',
            renderPasswordForm: false,
            editPassword: false,
            errors: {},
        }
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.CHANGE_FORM_TITLE: {
                debugger;
                var copy = Object.assign({}, state);
                copy.password.title = action.title;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_PASSWORD: {
                var copy = Object.assign({}, state);
                copy.password.password = action.password;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_URL: {
                var copy = Object.assign({}, state);
                copy.password.URL = action.URL;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_USERNAME: {
                var copy = Object.assign({}, state);
                copy.password.username = action.username;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_PASSWORD_GROUP:{
                var copy = Object.assign({}, state);
                copy.password.password_group_id = action.password_group_id;
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
                for(var property in copy.password){
                    if(copy.password.hasOwnProperty(property)){
                        copy.password[property] = action.password[property];
                    }
                }
                return copy;
            }
            case ActionTypes.ADD_NEW_PASSWORD:
            case ActionTypes.UPDATE_PASSWORD:
                return this.getInitialState();

            case ActionTypes.ADD_NEW_GROUP:{
                var copy = Object.assign({}, state);
                copy.renderPasswordForm = false;
                copy.groups = copy.groups.set(action.group.id, new PasswordGroup({
                    id: action.group.id,
                    name: action.group.name,
                }));
                return copy;
            }
            case ActionTypes.RENDER_GROUP_FORM: {
                var copy = Object.assign({}, state);
                copy.renderPasswordForm = true;
                return copy;
            }
            case ActionTypes.CHANGE_GROUP_NAME:{
                var copy = Object.assign({}, state);
                copy.groupName = action.groupName;
                return copy;
            }
            default:
                return state;
        }
    }
}

export default new PasswordFormStore();