/**
 * Created by zarko on 7/19/17.
 */
'use strict';

import * as jQuery from 'jquery';
import * as Immutable from 'immutable';

import Dispatcher from './Dispatcher';
import ActionTypes from './ActionTypes';

import ConfigVar from './ConfigVar';

const Actions = {

    getUser(){
        let user = null;
        jQuery.ajax({
            async: false,
            method: 'GET',
            url: '/users.json',
            success: function(res) {
                if(res != null)
                    user = res;
                Dispatcher.dispatch({
                    type: ActionTypes.ON_GET_USER_DATA,
                    user: user,
                });
            },
        });
    },

    pullUser(){
        Dispatcher.dispatch({
            type: ActionTypes.ON_BEGIN_PULL_USER_DATA,
        });
        jQuery.ajax({
            async: true,
            method: 'GET',
            url: '/user_data.json',
            success: function(user) {
                Dispatcher.dispatch({
                    type: ActionTypes.ON_END_PULL_USER_DATA,
                    user: user,
                });
            },
        });

    },

    pushConfigVar(configVar, configVars){
        let changedConfigVars = configVars.filter((cv) => {
            return (cv.isCreated === true ||
                cv.isUpdated === true ||
                cv.isDeleted === true ||
                cv.id === configVar.id
            );
        });
        Actions.pushConfigVars(changedConfigVars);
    },

    pushConfigVars(configVars){
        let changedConfigVars = configVars.filter((configVar) => {
            return (configVar.isCreated === true || configVar.isUpdated === true || configVar.isDeleted === true);
        });
        if(changedConfigVars.size == 0){
            Actions.pullUser();
            return;
        }
        Dispatcher.dispatch({
            type: ActionTypes.ON_BEGIN_PUSH_CONFIG_VAR,
        });
        jQuery.ajax({
            async: true,
            method: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', jQuery('meta[name="csrf-token"]').attr('content'))},
            dataType: 'json',
            data: {
                configVars: changedConfigVars.toJSON(),
            },
            url: '/push_config_vars.json',

            success: function(res) {
                Dispatcher.dispatch({
                    type: ActionTypes.ON_END_PUSH_CONFIG_VAR,
                });
                // refresh with pushed data
                Actions.pullUser();
            },
        });
    },

    getWorkProgress(){
        let user = null;
        jQuery.ajax({
            async: true,
            method: 'GET',
            url: '/work_progress.json',
            success: function(res) {
                if(res != null){
                    Dispatcher.dispatch({
                        type: ActionTypes.ON_GET_WORK_PROGRESS,
                        workProgress: res,
                    });}
            },
        });
    },

    resetWorkProgress(){
        let user = null;
        jQuery.ajax({
            async: true,
            method: 'GET',
            url: '/reset_work_progress.json',
        });
    },

    changeSearchString(value){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_SEARCH_STRING,
            value: value,
        })
    },

    startCreateConfigVar(){
        Dispatcher.dispatch({
            type: ActionTypes.START_CREATE_CONFIGVAR,
        })
    },

    startUpdateConfigVar(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.START_UPDATE_CONFIGVAR,
            configVar: configVar,
        })
    },

    createConfigVar(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.CREATE_CONFIGVAR,
            configVar: configVar,
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
            name: name,
        });
    },

    changeFormValue(value){
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_FORM_VALUE,
            value: value,
        });
    },

    setConfigVarsFormErrors(){
        Dispatcher.dispatch({
            type: ActionTypes.SET_CONFIGVAR_FORM_ERRORS,
        });
    },

    addAppToConfigVar(application){
        Dispatcher.dispatch({
            type: ActionTypes.ON_ADD_APP_TO_CONFIGVAR,
            application: application,
        });
    },

    removeAppFromConfigVar(application){
        Dispatcher.dispatch({
            type: ActionTypes.ON_REMOVE_APP_TO_CONFIGVAR,
            application: application,
        });
    },

    disableConfigVarSync(configVar){
        Dispatcher.dispatch({
            type: ActionTypes.ON_DISABLE_CONFIG_VAR_CHANGES,
            configVar: configVar,
        })
    },
}
export default Actions;