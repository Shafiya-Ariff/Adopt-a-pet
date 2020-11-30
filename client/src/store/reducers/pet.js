import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: [],
    message: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_A_PET:
            return {
                ...state,
                error: [],
                message: 'Successfully added a pet!'
            }
        case actionTypes.ADD_A_PET_FAIL:
            return {
                ...state,
                error: action.error,
                message: null,
            }
        default:
            return state;
    }
};

export default reducer;