import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: actionTypes.GET_USER_DETAILS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: actionTypes.GET_USER_DETAILS_FAIL,
        });
    }
};

export const logout = () => async dispatch => {
    try {
        localStorage.removeItem('item');
        dispatch({
            type: actionTypes.LOGOUT
        })
    } catch (error) {
        dispatch({
            type: actionTypes.LOGOUT_FAIL
        })
    }
}