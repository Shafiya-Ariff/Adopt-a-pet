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

export const getPetsSuccess = (pets) => {
    return {
        type: actionTypes.GET_PETS,
        pets: pets
    }
}

export const getPetsFail = (error) => {
    return {
        type: actionTypes.GET_PETS_FAIL,
        error: error
    }
}

export const getPets = () => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.get('/api/pets/all', config)
            .then(res => {
                dispatch(getPetsSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(addAPetFail(err.response.data.errors));
            });
    }
}

export const getPetByIdSuccess = (pet) => {
    return {
        type: actionTypes.GET_PET_BY_ID,
        pet: pet
    }
}

export const getPetByIdFail = (error) => {
    return {
        type: actionTypes.GET_PET_BY_ID_FAIL,
        error: error
    }
}

export const getPetById = (id) => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.get('/api/pets/'+id, config)
            .then(res => {
                dispatch(getPetByIdSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(getPetByIdFail(err.response.data.msg));
            });
    }
}

export const editAPetSuccess = (pet) => {
    return {
        type: actionTypes.EDIT_A_PET,
        pet: pet,
    }
}

export const editAPetFail = (error) => {
    return {
        type: actionTypes.EDIT_A_PET_FAIL,
        error: error
    }
}

export const editAPet = (name, type, breed, age, location, image,id) => {
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

        axios.post('/api/pets/upload-a-pet/'+id, formData, config)
            .then(res => {
                dispatch(editAPetSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(editAPetFail(err.response.data.errors));
            });
    }
};

export const deletePetSuccess = (pet) => {
    return {
        type: actionTypes.DELETE_A_PET,
        pet: pet
    }
}

export const deletePetFail = (error) => {
    return {
        type: actionTypes.DELETE_A_PET_FAIL,
        error: error
    }
}

export const deletePet = (id) => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.delete('/api/pets/'+id, config)
            .then(res => {
                dispatch(deletePetSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(deletePetFail(err.response.data.errors));
            });
    }
}