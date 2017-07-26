/**
 * Created by zarko on 7/19/17.
 */
'use strict';

import * as jQuery from 'jquery';
import * as Immutable from 'immutable';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

import PasswordGroup from './PasswordGroup';
import Password from './Password';


const Actions = {

    getPasswords(){
        let passwords = Immutable.OrderedMap();

        jQuery.ajax({
            async: false,
            method: 'GET',
            url: '/passwords/get_all.json',

            success: function(res) {
                for(var i = 0; i < res.length; i++)
                {
                    const password = res[i];
                    passwords = passwords.set(password.id, new Password({
                        id: password.id,
                        data: password,
                    }));
                }
            },
        });
        return passwords;
    },

    getPasswordGroups(){
        let groups = Immutable.OrderedMap();

        jQuery.ajax({
            async: false,
            method: 'GET',
            url: '/password_groups/get_all.json',

            success: function(res) {
                for(var i = 0; i < res.length; i++)
                {
                    const group = res[i];
                    groups = groups.set(group.id, new PasswordGroup({
                        id: group.id,
                        name: group.name,
                    }));
                }
            },
        });
        return groups;
    },

    addPassword(password){
        const pwd = password;
        jQuery.ajax({
            method: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))},
            data: {
                password: pwd,
            },
            url: '/passwords.json',

            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.ADD_NEW_PASSWORD,
                    password: res,
                });
            },
            error: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.SET_PASSWORD_FORM_ERRORS,
                    errors: res.responseJSON.errors,
                });
            }
        });

    },
    updatePassword(password){
        jQuery.ajax({
            method: 'PUT',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))},
            data: {
                password: password,
            },
            url: '/passwords/' + password.id + '.json',
            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.UPDATE_PASSWORD,
                    password: res,
                });
            },
            error: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.SET_PASSWORD_FORM_ERRORS,
                    errors: res.responseJSON.errors,
                });
            }
        });
    },
    deletePassword(id){
        jQuery.ajax({
            method: 'DELETE',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))},
            url: '/passwords/' + id + '.json',
            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.DELETE_PASSWORD,
                    id,
                });
            }
        })
    },
    changeFormTitle(title){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_TITLE,
            title: title,
        });
    },
    changeFormURL(URL){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_URL,
            URL: URL,
        });
    },
    changeFormUsername(username){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_USERNAME,
            username: username,
        });
    },
    changeFormPasswordGroup(id){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_PASSWORD_GROUP,
            password_group_id: id,
        });
    },
    changeFormPassword(password){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_PASSWORD,
            password: password,
        });
    },
    toggleGroupForm(){
        Dispatcher.dispatch({
            type: ActionTypes.TOGGLE_GROUP_FORM,
        });
    },
    changeGroupFormGroupName(name){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_GROUP_NAME,
            groupName: name,
        })
    },
    addPasswordGroup(name){
        jQuery.ajax({
            method: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))},
            data: {
                password_group: {name: name},
            },
            url: '/password_groups.json',

            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.ADD_NEW_GROUP,
                    group: res,
                });
            },
            error: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.SET_PASSWORD_FORM_ERRORS,
                    errors: res.responseJSON.errors,
                });
            }
        });
    },
    startEditPassword(password){
        Dispatcher.dispatch({
            type: ActionTypes.START_EDIT_PASSWORD,
            password: password,
        })
    },
    changeSearchString(value){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_SEARCH_STRING,
            value: value,
        })
    }
}

export default Actions;