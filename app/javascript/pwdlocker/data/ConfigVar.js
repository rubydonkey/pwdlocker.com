import * as Immutable from 'immutable';

const ConfigVar = Immutable.Record({
    id: 0,
    data: null,
    isCreated: false,
    isUpdated: false,
    isDeleted: false,
});

export default ConfigVar;