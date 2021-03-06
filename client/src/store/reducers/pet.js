import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: [],
    message: null,
    pets: [],
    pet: null,
    deleted: false,
    page: 1,
    filterPage: 1
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
        case actionTypes.GET_PETS:
            return {
                ...state,
                error: [],
                message: null,
                pets: state.pets.concat(action.pets),
                page: action.page + 1
            }
        case actionTypes.GET_PETS_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.FILTER_PETS:
            return {
                ...state,
                error: [],
                message: null,
                pets: state.pets.concat(action.pets),
                filterPage: action.page + 1
            }
        case actionTypes.FILTER_PETS_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.CLEAR_PETS:
            return {
                ...state,
                error: [],
                message: null,
                pets: [],
                page: 1,
                filterPage: 1
            }
        case actionTypes.GET_PET_BY_ID:
            return {
                ...state,
                error: [],
                pet: action.pet
            }
        case actionTypes.GET_PET_BY_ID_FAIL:
            return {
                ...state,
                error: action.error,
            }
        case actionTypes.EDIT_A_PET:
            return {
                ...state,
                error: [],
                message: 'Successfully edited a pet!'
            }
        case actionTypes.EDIT_A_PET_FAIL:
            return {
                ...state,
                error: action.error,
                message: null,
            }
        case actionTypes.DELETE_A_PET:
            return {
                ...state,
                error: [],
                deleted: true,
            }
        case actionTypes.DELETE_A_PET_FAIL:
            return {
                ...state,
                error: action.error,
                deleted: false
            }
        default:
            return state;
    }
};

export default reducer;