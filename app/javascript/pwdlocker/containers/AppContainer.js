/**
 * Created by zarko on 7/19/17.
 */

import {Container} from 'flux/utils';

import AppView from '../views/AppView';
import Actions from '../data/PWDLockerActions';

import PasswordStore from '../data/PasswordStore';
import PasswordGroupStore from '../data/PasswordGroupStore';
import PasswordFormStore from '../data/PasswordFormStore';
import SearchFormStore from '../data/SearchFormStore';
import UsersStore from '../data/UsersStore';

function getStores() {
    return [
        UsersStore,
        PasswordStore,
        PasswordGroupStore,
        PasswordFormStore,
        SearchFormStore,
    ];
}
function getState() {
    return{
        user: UsersStore.getState(),

        passwords: PasswordStore.getState(),
        onAddPassword: Actions.addPassword,
        onUpdatePassword: Actions.updatePassword,
        onDeletePassword: Actions.deletePassword,

        passwordGroups: PasswordGroupStore.getState(),
        onAddPasswordGroup: Actions.addPasswordGroup,

        passwordForm: PasswordFormStore.getState(),
        onStartAddNewPassword: Actions.startAddNewPassword,
        onStartEditPassword: Actions.startEditPassword,
        onChangeFormTitle: Actions.changeFormTitle,
        onChangeFormURL: Actions.changeFormURL,
        onChangeFormUsername: Actions.changeFormUsername,
        onChangeFormPassword: Actions.changeFormPassword,
        onRenderGroupForm: Actions.renderGroupForm,
        onChangeGroupName: Actions.changeGroupFormGroupName,
        onChangePasswordGroup: Actions.changeFormPasswordGroup,

        searchString: SearchFormStore.getState(),
        onChangeSearchString: Actions.changeSearchString,
    }
}

export default Container.createFunctional(AppView, getStores, getState);
