/**
 * Created by zarko on 7/19/17.
 */

'use strict'


import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

class ConfigVarFormStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return {
            configVar: {
                id: 0,
                data: {
                    name: '',
                    value: '',
                    user_id: 0,
                    isCreated: false,
                    isUpdated: false,
                    isDeleted: false,
                    applications: [],
                },
            },
            editConfigVar: false,
            errors: {
                name: '',
                value: '',
            },
            unsavedData: false
        }
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.CHANGE_FORM_NAME: {
                var copy = Object.assign({}, state);
                copy.configVar.data.name = action.name;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_VALUE: {
                var copy = Object.assign({}, state);
                copy.configVar.data.value = action.value;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.SET_CONFIGVAR_FORM_ERRORS: {
                var copy = Object.assign({}, state);
                if(copy.configVar.data.name === '')
                    copy.errors.name = 'Name can not be empty!';
                if(copy.configVar.data.value === '')
                    copy.errors.value = 'Value can not be empty';
                return copy;
            }
            case ActionTypes.START_UPDATE_CONFIGVAR: {
                var copy = Object.assign({}, state);
                copy.editConfigVar = true;
                copy.errors = {};
                for(var property in copy.configVar){
                    if(copy.configVar.hasOwnProperty(property)){
                        copy.configVar[property] = action.configVar[property];
                    }
                }
                return copy;
            }
            case ActionTypes.ON_ADD_APP_TO_CONFIGVAR:{
                var copy = Object.assign({}, state);
                const maxID = Math.max.apply(Math, copy.configVar.data.applications.map(app => {return app.id}));
                copy.configVar.data.applications.push({
                   id: maxID + 1,
                   name: action.application.name,
                });
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.ON_REMOVE_APP_TO_CONFIGVAR:{
                var copy = Object.assign({}, state);
                const index = copy.configVar.data.applications.findIndex(app => app.name === action.application.name);
                if(index > -1){
                    copy.configVar.data.applications.splice(index,1);
                    copy.unsavedData = true;
                }
                return copy;
            }
            case ActionTypes.START_CREATE_CONFIGVAR:
            case ActionTypes.CREATE_CONFIGVAR:
            case ActionTypes.UPDATE_CONFIGVAR:
                return this.getInitialState();
            default:
                return state;
        }
    }
}

export default new ConfigVarFormStore();
