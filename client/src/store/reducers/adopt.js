import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null,
    message: null,
    success: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADOPT:
            return {
                ...state,
                error: null,
                message: 'Please check your mail for further instructions!',
                success: true
            }
        case actionTypes.ADOPT_FAIL:
            return {
                ...state,
                error: action.error,
                message: 'Error adopting. Please try again.',
                success: false
            }
        default:
            return state;
    }
};

export default reducer;