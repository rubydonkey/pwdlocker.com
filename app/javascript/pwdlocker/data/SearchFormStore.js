/**
 * Created by zarko on 7/19/17.
 */

'use strict'

import {ReduceStore} from 'flux/utils';

import Dispatcher from './PWDLockerDispatcher';
import ActionTypes from './PWDLockerActionTypes';

class SearchFormStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        return '';
    }

    reduce(state, action){
        switch (action.type){
            case ActionTypes.CHANGE_SEARCH_STRING:
                return action.value;
            default:
                return state;
        }
    }
}

export default new SearchFormStore();
