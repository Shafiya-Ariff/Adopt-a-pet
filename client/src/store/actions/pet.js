import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addAPetSuccess = (pet) => {
    return {
        type: actionTypes.ADD_A_PET,
        pet: pet,
    }
}

export const addAPetFail = (error) => {
    return {
        type: actionTypes.ADD_A_PET_FAIL,
        error: error
    }
}

export const addAPet = (name, type, breed, age, location, image) => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('type', type);
        formData.append('breed', breed);
        formData.append('age', age);
        formData.append('location', location);

        axios.post('/api/pets/upload-a-pet', formData, config)
            .then(res => {
                dispatch(addAPetSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(addAPetFail(err.response.data.errors));
            });
    }
}