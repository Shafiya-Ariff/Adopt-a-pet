import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: [],
    message: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                error: [],
                message: 'Successfully registered!'
            }
        case actionTypes.REGISTER_FAIL:
            return {
                ...state,
                error: action.error,
                message: null,
            }
        case actionTypes.REGISTER_CLEAR:
            return {
                ...state,
                error: [],
                message: null,
            }
        default:
            return state;
    }
};

export default reducer;