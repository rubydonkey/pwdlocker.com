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
import ConfigVar from './ConfigVar';



const Actions = {

    ajaxSetup(){
        jQuery.ajaxSetup({
            beforeSend: function(xhr) {
                jQuery('#spinner').show();
            },
            // runs after AJAX requests complete, successfully or not
            complete: function(xhr, status){
                jQuery('#spinner').hide();
            }
        });
    },

    getUser(){
        let configVars = Immutable.OrderedMap();
        let user = null;
        jQuery.ajax({
            async: false,
            method: 'GET',
            url: '/users.json',
            success: function(res) {
                if(res != null)
                {
                    for (var i = 0; i < res.config_vars.length; i++)
                    {
                        const configVar = res.config_vars[i];
                        configVars = configVars.set(configVar.id, new ConfigVar({
                            id: configVar.id,
                            data: configVar,
                        }));
                    }
                    user = res;
                }
            },
        });

        return {
            data: user,
            configVars: configVars,
        };
    },

    getPasswords(){
        let passwords = Immutable.OrderedMap();
        jQuery.ajax({
            async: false,
            method: 'GET',
            url: '/passwords.json',

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
            url: '/password_groups.json',

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
            url: `/passwords/${id}.json`,
            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.DELETE_PASSWORD,
                    id,
                });
            }
        })
    },

    startEditPassword(password){
        Dispatcher.dispatch({
            type: ActionTypes.START_EDIT_PASSWORD,
            password: password,
        })
    },

    startAddNewPassword() {
      Dispatcher.dispatch({
          type: ActionTypes.START_ADD_NEW_PASSWORD
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

    changeFormPassword(password){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_PASSWORD,
            password: password,
        });
    },

    changeFormPasswordGroup(id){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_PASSWORD_GROUP,
            password_group_id: id,
        });
    },

    renderGroupForm(){
        Dispatcher.dispatch({
            type: ActionTypes.RENDER_GROUP_FORM,
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

    changeSearchString(value){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_SEARCH_STRING,
            value: value,
        })
    },

    syncUserData(){
        Dispatcher.dispatch({
            type: ActionTypes.ON_GET_USER_DATA,
        })
    },

    startCreateConfigVar(){
        type: ActionTypes.START_CREATE_CONFIGVAR,
        Dispatcher.dispatch({
        })
    },

    startUpdateConfigVar(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.START_UPDATE_CONFIGVAR,
            configVar: configVar,
        })
    },

    createConfigVar(){
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_CONFIGVAR,
        })
    },

    updateConfigVar(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE_CONFIGVAR,
            configVar: configVar,
        })
    },

    deleteConfigVar(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.DELETE_CONFIGVAR,
            configVar: configVar,
        });
    },


    changeFormName(name){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_NAME,
            title: name,
        });
    },

    changeFormValue(value){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_VALUE,
            title: value,
        });
    },
}
export default Actions;
