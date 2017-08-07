/**
 * Created by zarko on 7/19/17.
 */

import {Container} from 'flux/utils';

import AppView from '../views/AppView';
import Actions from '../data/PWDLockerActions';

import PasswordStore from '../data/PasswordStore';
import PasswordFormStore from '../data/PasswordFormStore';
import SearchFormStore from '../data/SearchFormStore';

function getStores() {
    return [
        PasswordStore,
        PasswordFormStore,
        SearchFormStore,
    ];
}
function getState() {
    return{
        passwords: PasswordStore.getState(),
        onAddPassword: Actions.addPassword,
        onUpdatePassword: Actions.updatePassword,
        onDeletePassword: Actions.deletePassword,

        passwordForm: PasswordFormStore.getState(),
        onChangeFormTitle: Actions.changeFormTitle,
        onChangeFormURL: Actions.changeFormURL,
        onChangeFormUsername: Actions.changeFormUsername,
        onChangeFormPassword: Actions.changeFormPassword,
        onRenderGroupForm: Actions.renderGroupForm,
        onAddPasswordGroup: Actions.addPasswordGroup,
        onChangeGroupName: Actions.changeGroupFormGroupName,
        onChangeFormPasswordGroup: Actions.changeFormPasswordGroup,
        onStartEditPassword: Actions.startEditPassword,

        searchString: SearchFormStore.getState(),
        onChangeSearchString: Actions.changeSearchString,
    }
}

export default Container.createFunctional(AppView, getStores, getState);

