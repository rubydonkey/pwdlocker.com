import * as Immutable from 'immutable';

const ConfigVar = Immutable.Record({
    id: 0,
    data: null,
    applications: null,
});

export default ConfigVar;