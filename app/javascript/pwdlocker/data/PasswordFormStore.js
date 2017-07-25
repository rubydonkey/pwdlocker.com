/**
 * Created by zarko on 7/19/17.
 */

'use strict'


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

import PasswordGroup from './PasswordGroup';

class Password {
    constructor(password = null){
        if(password === null){
            this.title = '';
            this.URL = '';
            this.username = '';
            this.password = '';
            this.password_group_id = 0;
        }
        else {
            this.title = password.title;
            this.URL = password.URL;
            this.username = password.username;
            this.password = password.password;
            this.password_group_id = password.password_group_id;
        }
    }
}

class PasswordFormStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return {
            password: {
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
                copy.password_group_id = action.password_group_id;
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
                return copy;
            }
            case ActionTypes.UPDATE_PASSWORD: {
                return this.getInitialState();
            }
            case ActionTypes.ADD_NEW_GROUP:{
                var copy = Object.assign({}, state);
                copy.groups = copy.groups.set(action.group.id, new PasswordGroup({
                    id: action.group.id,
                    name: action.group.name,
                }));
                return copy;
            }
            case ActionTypes.TOGGLE_GROUP_FORM: {
                var copy = Object.assign({}, state);
                copy.renderPasswordForm = !state.renderPasswordForm;
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

    buildState( password, errors = {}, isEditMode = false){
        return ({
            password: password,
            errors: errors,
            editPassword: isEditMode,
            renderPasswordForm: shouldRenderPasswordGroup,
        });
    }
}

export default new PasswordFormStore();