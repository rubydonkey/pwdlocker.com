/**
 * Created by zarko on 7/19/17.
 */

import {Container} from 'flux/utils';

import AppView from '../views/AppView';
import Actions from '../data/PWDLockerActions';

import SearchFormStore      from '../data/SearchFormStore';
import UsersStore           from '../data/UserStore';
import ConfigVarFormStore   from '../data/ConfigVarFormStore';
import ConfigVarsStore      from '../data/ConfigVarsStore';


function getStores() {
    return [
        UsersStore,
        ConfigVarsStore,
        ConfigVarFormStore,
        SearchFormStore,
    ];
}
function getState() {
    return{
        configVars: ConfigVarsStore.getState(),
        onSyncConfigVars: Actions.syncConfigVars,
        onSyncConfigVar: Actions.syncConfigVar,
        onDisableSyncConfigVar: Actions.disableConfigVarSync,

        user: UsersStore.getState(),
        onSyncUserData: Actions.syncUserData,

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
