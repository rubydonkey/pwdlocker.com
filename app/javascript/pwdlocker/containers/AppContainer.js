/**
 * Created by zarko on 7/19/17.
 */

import {Container} from 'flux/utils';

import AppView from '../views/AppView';
import Actions from '../data/PWDLockerActions';

import PasswordStore from '../data/PasswordStore';
import PasswordFormStore from '../data/PasswordFormStore';
import PasswordGroupStore from '../data/PasswordGroupsStore';

function getStores() {
    return [
        PasswordStore,
        PasswordFormStore,
        PasswordGroupStore,
    ];
}
function getState() {
    return{
        passwords: PasswordStore.getState(),
        passwordForm: PasswordFormStore.getState(),
        passwordGroups: PasswordGroupStore.getState(),

        onAddPassword: Actions.addPassword,
        onUpdatePassword: Actions.updatePassword,
        onDeletePassword: Actions.deletePassword,

        onChangeFormTitle: Actions.changeFormTitle,
        onChangeFormURL: Actions.changeFormURL,
        onChangeFormUsername: Actions.changeFormUsername,
        onChangeFormPassword: Actions.changeFormPassword,

        onToggleGroupForm: Actions.toggleGroupForm,
        onAddPasswordGroup: Actions.addPasswordGroup,
        onChangeGroupName: Actions.changeGroupFormGroupName,
        onUpdateFormPasswordGroup: Actions.updateFormPasswordGroup,
    }
}

export default Container.createFunctional(AppView, getStores, getState);

