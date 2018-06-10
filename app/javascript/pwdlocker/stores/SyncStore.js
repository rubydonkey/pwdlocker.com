'use strict'

import * as Immutable from 'immutable';


import {ReduceStore} from 'flux/utils';

import Dispatcher from '../data/Dispatcher';
import ActionTypes from '../data/ActionTypes';
import Actions from '../data/Actions';

class SyncStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return Immutable.Map({
            isPullingUserData: false,
            isPushingConfigVars: false,
            shouldGetWorkProgress: false,
            workProgress: 0.0,
        });
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.ON_BEGIN_PULL_USER_DATA:
                state = state.set('shouldGetWorkProgress', true);
                Actions.getWorkProgress();
                return state.set('isPullingUserData', true);
            case ActionTypes.ON_END_PULL_USER_DATA:
                state = state.set('shouldGetWorkProgress', false);
                Actions.resetWorkProgress();
                return state.set('isPullingUserData', false);
            case ActionTypes.ON_BEGIN_PUSH_CONFIG_VAR:
                state = state.set('shouldGetWorkProgress', true);
                Actions.getWorkProgress();
                return state.set('isPushingConfigVars', true);
            case ActionTypes.ON_END_PUSH_CONFIG_VAR:
                state = state.set('shouldGetWorkProgress', false);
                Actions.resetWorkProgress();
                return state.set('isPushingConfigVars', false);
            case ActionTypes.ON_GET_WORK_PROGRESS:
                if(state.get('shouldGetWorkProgress') === true) {
                    Actions.getWorkProgress();
                }
                //console.log(action.workProgress);
                return state.set('workProgress', action.workProgress);
            default:
                return state;
        }
    }
}

export default new SyncStore();
