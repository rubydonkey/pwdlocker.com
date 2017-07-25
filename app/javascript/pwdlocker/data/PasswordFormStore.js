/**
 * Created by zarko on 7/19/17.
 */

'use strict'


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

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
            password: new Password(),
            errors: {},
            isEditMode: false,
        }
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.UPDATE_FORM_TITLE: {
                var copy = Object.assign({}, state);
                copy.password.title = action.title;
                return copy;
            }

            case ActionTypes.UPDATE_FORM_PASSWORD: {
                var copy = Object.assign({}, state);
                copy.password.password = action.password;
                return copy;
            }

            case ActionTypes.UPDATE_FORM_URL: {
                var copy = Object.assign({}, state);
                copy.password.URL = action.URL;
                return copy;
            }

            case ActionTypes.UPDATE_FORM_USERNAME: {
                var copy = Object.assign({}, state);
                copy.password.username = action.username;
                return copy;
            }

            case ActionTypes.UPDATE_FORM_PASSWORD_GROUP:{
                var copy = Object.assign({}, state);
                copy.password_group_id = action.password_group_id;
                return copy;
            }

            case ActionTypes.ADD_PASSWORD_ERRORS: {
                var copy = Object.assign({}, state);
                copy.errors = action.errors;
                return copy;
            }

            case ActionTypes.START_EDIT_PASSWORD: {
                var copy = Object.assign({}, state);
                copy.isEditMode = true;
                return copy;
            }

            case ActionTypes.UPDATE_PASSWORD: {
                return this.getInitialState();
            }

            default:
                return state;
        }
    }

    buildState( password, errors = {}, isEditMode = false){
        return ({
            password: password,
            errors: errors,
            isEditMode: isEditMode,
            shouldRenderPasswordGroup: shouldRenderPasswordGroup,
        });
    }
}

export default new PasswordFormStore();