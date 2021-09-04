import axios from 'axios'
import { 
    INVENTORY_ADD_FAIL, 
    INVENTORY_ADD_REQUSET, 
    INVENTORY_ADD_SUCCESS,
    INVENTORY_DELETE_FAIL,
    INVENTORY_DELETE_REQUSET,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_UPDATE_FAIL,
    INVENTORY_UPDATE_REQUSET,
    INVENTORY_UPDATE_SUCCESS, 
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

export const deleteInventoryDetail = (productId, inventoryId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVENTORY_DELETE_REQUSET
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/inventory/${productId}/${inventoryId}`, config)
        dispatch({
            type: INVENTORY_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: INVENTORY_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const updateToInventory = (productId, inventoryDetail) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INVENTORY_UPDATE_REQUSET
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.put(`/api/inventory/${productId}`, inventoryDetail, config)
        dispatch({
            type: INVENTORY_UPDATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: INVENTORY_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}