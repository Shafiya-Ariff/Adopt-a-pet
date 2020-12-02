import {combineReducers} from 'redux';
import registerReducer from './register';
import authReducer from './auth';
import petReducer from './pet';
import wishlistReducer from './wishlist';
import adoptReducer from './adopt';

export default combineReducers({
    register: registerReducer,
    auth: authReducer,
    pet: petReducer,
    wishlist: wishlistReducer,
    adopt: adoptReducer
});