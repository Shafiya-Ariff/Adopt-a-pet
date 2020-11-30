import * as actionTypes from './actionTypes';
import axios from 'axios';

export const registerSuccess = (email, password) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        email: email,
        password: password
    }
}

export const registerFail = (error) => {
    return {
        type: actionTypes.REGISTER_FAIL,
        error: error
    }
}

export const register = (email, password) => {
    return dispatch => {
        const registerData = {
            email: email,
            password: password,
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post('/api/users', registerData,config)
            .then(res => {
                dispatch(registerSuccess(res.data.email, res.data.password));
            })
            .catch(err => {
                dispatch(registerFail(err.response.data.errors));
            });
    }
}

export const registerClear = () => dispatch => {
    dispatch({
        type:actionTypes.REGISTER_CLEAR
    })
}