import axios from 'axios'
import { 
    INVENTORY_ADD_FAIL, 
    INVENTORY_ADD_REQUSET, 
    INVENTORY_ADD_SUCCESS, 
} from '../constants/inventoryConstants'

export const addToInventory = (productId, inventoryDetail) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVENTORY_ADD_REQUSET
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post(`/api/inventory/${productId}`, inventoryDetail, config)
        dispatch({
            type: INVENTORY_ADD_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: INVENTORY_ADD_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}