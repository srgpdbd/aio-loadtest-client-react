import { reducer as form } from 'redux-form';
import tests from './tests';
import editor from './editor';
import factoryRun from './factory-run';

const reducers = { tests, editor, factoryRun, form };

export default reducers;
