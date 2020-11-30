import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    token: null,
    error: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DETAILS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: localStorage.getItem('token')
            }
        case actionTypes.GET_USER_DETAILS_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: localStorage.removeItem('token'),
            }
        case actionTypes.LOGOUT:
        return {
            ...state,
            isAuthenticated: false,
            user: null,
            token: localStorage.removeItem('token'),
        }
        case actionTypes.LOGOUT_FAIL:
        return {
            ...state,
            isAuthenticated: true,
            token: localStorage.getItem('token'),
        }
        case actionTypes.LOGIN_SUCCESS:

            return {
                ...state,
                token: localStorage.setItem('token', action.token),
                isAuthenticated: true,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                token: localStorage.removeItem('token'),
                error: action.error,
                isAuthenticated: false,
            }
        case actionTypes.LOGIN_CLEAR:
            return {
                ...state,
                error: [],
                isAuthenticated: false,
            }
        default:
            return state;
    }
};

export default reducer;