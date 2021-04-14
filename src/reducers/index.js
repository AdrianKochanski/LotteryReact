import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import lottery from './lottery';

export default combineReducers({
    lottery,
    form: formReducer
});