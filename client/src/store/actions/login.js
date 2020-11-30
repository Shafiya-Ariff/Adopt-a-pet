import * as actionTypes from './actionTypes';
import axios from 'axios';
import { loadUser } from './auth';

export const loginSuccess = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
    }
}

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    }
}

export const login = (email, password) => {
    return dispatch => {
        const loginData = {
            email: email,
            password: password,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/api/auth', loginData,config)
            .then(res => {
                dispatch(loginSuccess(res.data.token));
                dispatch(loadUser());
            })
            .catch(err => {
                console.log(err.response.data.errors);
                dispatch(loginFail(err.response.data.errors));
            });
    }
}

export const loginClear = () => dispatch => {
    dispatch({
        type:actionTypes.LOGIN_CLEAR
    })
}