import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_INVENTORY_REQUEST,
    PRODUCT_INVENTORY_SUCCESS,
    PRODUCT_INVENTORY_FAIL,
    PRODUCT_SHOPNOW_REQUEST,
    PRODUCT_SHOPNOW_SUCCESS,
    PRODUCT_SHOPNOW_FAIL,
} from '../constants/productConstants'


export const listProducts = (keyword = '', pageNumber = '', pageSize = '') => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const detailProduct = (id) => async(dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })           
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const createProduct = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',
                //Accept: 'application/json',                
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post('/api/products/new', formData, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const updateProduct = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',
                Accept: 'application/json',                
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.put(`/api/products/${id}`, formData, config)
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const createProductReview = (productId, data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.post(`/api/products/${productId}/reviews`, data, config)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const listTopProducts = () => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`/api/products/top`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getProductInventory = () => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_INVENTORY_REQUEST})
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {             
                Authorization: `Bearer ${userInfo.token}`
            }
        }        

        const {data} = await axios.get(`/api/products/inventory`, config)

        dispatch({
            type: PRODUCT_INVENTORY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_INVENTORY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getProductShopNow = () => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_SHOPNOW_REQUEST})
        
        const {data} = await axios.get(`/api/products/shopnow`)

        dispatch({
            type: PRODUCT_SHOPNOW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_SHOPNOW_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}



