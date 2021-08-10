import {
    INVENTORY_ADD_REQUSET,
    INVENTORY_ADD_SUCCESS,
    INVENTORY_ADD_FAIL,
    INVENTORY_ADD_DEFAULT
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