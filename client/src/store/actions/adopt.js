import * as actionTypes from './actionTypes';
import axios from 'axios';

export const adoptSuccess = (pet) => {
    return {
        type: actionTypes.ADOPT,
        pet: pet,
    }
}

export const adoptFail = (error) => {
    return {
        type: actionTypes.ADOPT_FAIL,
        error: error
    }
}

export const adopt = (id) => {
    return dispatch => {
        axios({method: 'post', url: '/api/adopt/'+id, 
        headers: {
            'x-auth-token': localStorage.token 
        }})
            .then(res => {
                dispatch(adoptSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(adoptFail(err.response.data.msg));
            });
    }
};