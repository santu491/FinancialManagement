import {rootReducer} from '../combinedReducers/combindedReducers';
import {createStore} from 'redux';

const store = createStore(rootReducer);

export {store};
