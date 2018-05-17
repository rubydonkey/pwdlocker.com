/**
 * Created by zarko on 7/19/17.
 */

import {Container} from 'flux/utils';

import AppView from '../views/AppView';
import Actions from '../data/PWDLockerActions';

// ConfigVarsStore have to be created before UsersStore
// so it will be available to respond on ON_GET_USER_DATA action
// which dispatch UsersStore while being created in getInitialState
// ON_GET_USER_DATA action send preparied data from which will be shown immediately
// while being waited for data to be synchronized from heroku

import SyncStore            from '../data/SyncStore';
import ConfigVarsStore      from '../data/ConfigVarsStore';
import UsersStore           from '../data/UserStore';
import ConfigVarFormStore   from '../data/ConfigVarFormStore';
import SearchFormStore      from '../data/SearchFormStore';


function getStores() {
    return [
        SyncStore,
        ConfigVarsStore,
        UsersStore,
        ConfigVarFormStore,
        SearchFormStore,
    ];
}
function getState() {
    return{
        syncStatus: SyncStore.getState(),

        configVars: ConfigVarsStore.getState(),
        onCommitConfigVar: Actions.commitConfigVar,
        onCommitConfigVars: Actions.commitConfigVars,
        onDisableSyncConfigVar: Actions.disableConfigVarSync,

        user: UsersStore.getState(),

        configVarForm: ConfigVarFormStore.getState(),
        onChangeFormName: Actions.changeFormName,
        onChangeFormValue: Actions.changeFormValue,
        onStartCreateConfigVar: Actions.startCreateConfigVar,
        onStartUpdateConfigVar: Actions.startUpdateConfigVar,
        onCreateConfigVar: Actions.createConfigVar,
        onUpdateConfigVar: Actions.updateConfigVar,
        onDeleteConfigVar: Actions.deleteConfigVar,
        onAddAppToConfigVar: Actions.addAppToConfigVar,
        onRemoveAppFromConfigVar: Actions.removeAppFromConfigVar,

        onSetConfigVarFormErrors: Actions.setConfigVarsFormErrors,

        searchString: SearchFormStore.getState(),
        onChangeSearchString: Actions.changeSearchString,
    }
}

export default Container.createFunctional(AppView, getStores, getState);
