import {
    COLOR_LIST_REQUEST,
    COLOR_LIST_SUCCESS,
    COLOR_LIST_FAIL,
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_SUCCESS,
    COLOR_CREATE_FAIL,
    COLOR_CREATE_DEFAULT,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DETAIL_REQUEST,
    COLOR_DETAIL_SUCCESS,
    COLOR_DETAIL_FAIL,
    COLOR_DETAIL_DEFAULT,
    COLOR_UPDATE_REQUEST,
    COLOR_UPDATE_SUCCESS,
    COLOR_UPDATE_FAIL,
    COLOR_UPDATE_DEFAULT,
} from '../constants/colorContants'


export const colorListReducer = (state = {colors: []}, action) => {
    switch(action.type){
        case COLOR_LIST_REQUEST:
            return {loading: true}
        case COLOR_LIST_SUCCESS:
            return {loading: false, colors: action.payload}
        case COLOR_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}


export const colorCreateReducer = (state = {success: false}, action) => {
    switch(action.type){
        case COLOR_CREATE_REQUEST:    
            return {loading: true }
        case COLOR_CREATE_SUCCESS: 
            return {loading: false, success: true, color: action.payload}
        case COLOR_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_CREATE_DEFAULT:
            return {}
        default:
            return state
    }
}

export const colorDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case COLOR_DELETE_REQUEST:    
            return {loading: true}
        case COLOR_DELETE_SUCCESS: 
            return {loading: false, success: true}
        case COLOR_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const colorDetailReducer = (state = {color: {}}, action) => {
    switch(action.type){
        case COLOR_DETAIL_REQUEST:    
            return {...state, loading: true}
        case COLOR_DETAIL_SUCCESS: 
            return {loading: false, color: action.payload}
        case COLOR_DETAIL_FAIL: 
            return {loading: false, error: action.payload}
        case COLOR_DETAIL_DEFAULT: 
            return {color: {}}
        default:
            return state
    }
}


export const colorUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case COLOR_UPDATE_REQUEST:
            return {loading: true}
        case COLOR_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case COLOR_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case COLOR_UPDATE_DEFAULT:
            return {loading: false, error: null, success: false}
        default: return state
    }
}
