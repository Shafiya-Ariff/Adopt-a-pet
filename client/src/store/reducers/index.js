import {combineReducers} from 'redux';
import registerReducer from './register';
import authReducer from './auth';
import petReducer from './pet';

export default combineReducers({
    register: registerReducer,
    auth: authReducer,
    pet: petReducer,
});