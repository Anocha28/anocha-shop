import {
    INVENTORY_ADD_REQUSET,
    INVENTORY_ADD_SUCCESS,
    INVENTORY_ADD_FAIL,
    INVENTORY_ADD_DEFAULT,
    INVENTORY_DELETE_REQUSET,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_DELETE_FAIL,
    INVENTORY_DELETE_DEFAULT,
    INVENTORY_UPDATE_REQUSET,
    INVENTORY_UPDATE_SUCCESS,
    INVENTORY_UPDATE_FAIL,
    INVENTORY_UPDATE_DEFAULT
} from '../constants/inventoryConstants'

export const addInventoryReducer = (state = {}, action) => {
    switch(action.type){
        case INVENTORY_ADD_REQUSET:
            return {loading: true}
        case INVENTORY_ADD_SUCCESS:
            return {loading: false, success: true}
        case INVENTORY_ADD_FAIL:
            return {loading: false, error: action.payload}
        case INVENTORY_ADD_DEFAULT:
            return {}
        default: return state
    }
}

export const deleteInventoryReducer = (state = {}, action) => {
    switch(action.type){
        case INVENTORY_DELETE_REQUSET:
            return {loading: true}
        case INVENTORY_DELETE_SUCCESS:
            return {loading: false, success: true}
        case INVENTORY_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case INVENTORY_DELETE_DEFAULT:
            return {}
        default: return state
    }
}

export const updateInventoryReducer = (state = {}, action) => {
    switch(action.type){
        case INVENTORY_UPDATE_REQUSET:
            return {loading: true}
        case INVENTORY_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case INVENTORY_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case INVENTORY_UPDATE_DEFAULT:
            return {}
        default: return state
    }
}