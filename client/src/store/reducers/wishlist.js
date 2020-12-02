import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    message: null,
    success: false,
    removed: false,
    pets: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_WISHLIST:
            return {
                ...state,
                error: null,
                message: 'Successfully added to wishlist!',
                success: true
            }
        case actionTypes.ADD_TO_WISHLIST_FAIL:
            return {
                ...state,
                error: action.error,
                message: 'Error adding to wishlist',
                success: false
            }
        case actionTypes.GET_WISHLIST:
            return {
                ...state,
                error: null,
                message: null,
                pets: action.pets
            }
        case actionTypes.GET_WISHLIST_FAIL:
            return {
                ...state,
                error: action.error,
                message: 'Unable to retrieve wishlist'
            }
        case actionTypes.REMOVE_PET_FROM_WISHLIST:
            return {
                ...state,
                error: null,
                removed: true,
            }
        case actionTypes.REMOVE_PET_FROM_WISHLIST_FAIL:
            return {
                ...state,
                error: action.error,
                removed: false
            }
        default:
            return state;
    }
};

export default reducer;