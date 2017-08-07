/**
 * Created by zarko on 7/19/17.
 */

'use strict'

import Immutable from 'immutable';

import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher'
import ActionTypes from './PWDLockerActionTypes';
import Actions from './PWDLockerActions';

class PasswordGroupsStore extends ReduceStore {
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return({
            renderPasswordForm: false,
            groups: Actions.getPasswordGroups(),
            groupName: '',
            errors: {},
        });
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ADD_NEW_GROUP:{
                var copy = Object.assign({}, state);
                copy.groups = copy.groups.set(action.group.id, action.group.name);
                return copy;
            }
            case ActionTypes.RENDER_GROUP_FORM: {
                var copy = Object.assign({}, state);
                copy.renderPasswordForm = !state.renderPasswordForm;
                return copy;
            }
            case ActionTypes.CHANGE_GROUP_NAME:{
                var copy = Object.assign({}, state);
                copy.groupName = action.groupName;
                return copy;
            }
            case ActionTypes.ADD_PASSWORD_GROUPS_ERRORS:{
                var copy = Object.assign({}, state);
                copy.errors = action.errors;
                return copy;
            }
            default:
                return state;
            }
        }
}
export default new PasswordGroupsStore();
