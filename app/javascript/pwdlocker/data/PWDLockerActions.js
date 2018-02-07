/**
 * Created by zarko on 7/19/17.
 */
'use strict';

import * as jQuery from 'jquery';
import * as Immutable from 'immutable';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

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
            },
        });
        return user;
    },

    getConfigVars(){
        let configVars = Immutable.OrderedMap();
        jQuery.ajax({
            async: true,
            method: 'GET',
            url: '/users.json',
            success: function(res) {
                debugger;
                if(res != null)
                {
                    for (var i = 0; i < res.config_vars.length; i++)
                    {
                        const configVar = res.config_vars[i];
                        configVars = configVars.set(i, new ConfigVar({
                            id: i,
                            data: configVar,
                        }));
                    }
                }
            },
        });
        return configVars;
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

    syncConfigVars(){
        Dispatcher.dispatch({
            type: ActionTypes.ON_GET_CONFIG_VARS,
        })
    },

    syncConfigVar(configVar){
        // here config var will be directly sent as password
        // on success will notify store about change
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
        debugger;
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
