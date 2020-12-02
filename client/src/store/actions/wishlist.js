import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addToWishlistSuccess = (pet) => {
    return {
        type: actionTypes.ADD_TO_WISHLIST,
        pet: pet,
    }
}

export const addToWishlistFail = (error) => {
    return {
        type: actionTypes.ADD_TO_WISHLIST_FAIL,
        error: error
    }
}

export const addToWishlist = (id) => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.post('/api/wishlist/'+id, config)
            .then(res => {
                dispatch(addToWishlistSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(addToWishlistFail(err.response.data.msg));
            });
    }
};

export const getWishlistSuccess = (pets) => {
    return {
        type: actionTypes.GET_WISHLIST,
        pets: pets
    }
}

export const getWishlistFail = (error) => {
    return {
        type: actionTypes.GET_WISHLIST_FAIL,
        error: error
    }
}

export const getWishlist = () => {
    return dispatch => {
        const config = {
            headers: {
                'x-auth-token': localStorage.token
            }
        }

        axios.get('/api/wishlist', config)
            .then(res => {
                dispatch(getWishlistSuccess(res.data));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(getWishlistFail(err.response.data.errors));
            });
    }
}