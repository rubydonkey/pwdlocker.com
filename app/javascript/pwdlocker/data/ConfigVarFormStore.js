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
                name: '',
                value: '',
            },
            editConfigVar: false,
            errors: {},
            unsavedData: false
        }
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.CHANGE_FORM_NAME: {
                var copy = Object.assign({}, state);
                copy.configVar.name = action.name;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.CHANGE_FORM_VALUE: {
                var copy = Object.assign({}, state);
                copy.configVar.value = action.value;
                copy.unsavedData = true;
                return copy;
            }
            case ActionTypes.SET_CONFIGVAR_FORM_ERRORS: {
                var copy = Object.assign({}, state);
                copy.errors = action.errors;
                return copy;
            }
            case ActionTypes.START_UPDATE_CONFIGVAR: {
                debugger;
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
