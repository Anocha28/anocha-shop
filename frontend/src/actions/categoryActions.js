import axios from 'axios'
import { 
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_SUCCESS, 
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_FAIL
} from '../constants/categoryConstants'


export const listCategory = () => async(dispatch) => {
    try {
        dispatch({
            type: CATEGORY_LIST_REQUEST
        }) 
        const {data} = await axios.get('/api/category')
        dispatch({
            type: CATEGORY_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}

export const createCategory = (category) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        }) 
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post('/api/category', {category}, config)
        dispatch({
            type: CATEGORY_CREATE_SUCCESS, 
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}

export const deleteCategory = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        }) 
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.delete(`/api/category/${id}`, config)
        dispatch({
            type: CATEGORY_DELETE_SUCCESS, 
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}

export const updateCategory = (id, category) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
        }) 
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: { 
                'Content-Type' : 'application/json',             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.put(`/api/category/${id}`, {category}, config)
        dispatch({
            type: CATEGORY_UPDATE_SUCCESS, 
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}