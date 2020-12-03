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

export const getAdoptionsSuccess = (pets) => {
    return {
        type: actionTypes.GET_ADOPTIONS,
        pets: pets
    }
}

export const getAdoptionsFail = (error) => {
    return {
        type: actionTypes.GET_ADOPTIONS_FAIL,
        error: error
    }
}

export const getAdoptions = () => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.get('/api/adopt', config)
            .then(res => {
                dispatch(getAdoptionsSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(getAdoptionsFail(err.response.data.errors));
            });
    }
}