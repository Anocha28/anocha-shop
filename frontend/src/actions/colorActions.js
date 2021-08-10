import axios from 'axios'
import {
    COLOR_LIST_SUCCESS,
    COLOR_LIST_REQUEST,
    COLOR_LIST_FAIL,
    COLOR_CREATE_REQUEST,
    COLOR_CREATE_SUCCESS,
    COLOR_CREATE_FAIL,
    COLOR_DELETE_REQUEST,
    COLOR_DELETE_SUCCESS,
    COLOR_DELETE_FAIL,
    COLOR_DETAIL_REQUEST,
    COLOR_DETAIL_SUCCESS,
    COLOR_DETAIL_FAIL,
    COLOR_UPDATE_REQUEST,
    COLOR_UPDATE_SUCCESS,
    COLOR_UPDATE_FAIL,
} from '../constants/colorContants'

export const listColors = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_LIST_REQUEST
        })  
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get('/api/colors', config)
        dispatch({
            type: COLOR_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLOR_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}

export const createColor = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',              
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        const {data} = await axios.post('/api/colors/new', formData, config)
        dispatch({
            type: COLOR_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLOR_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const updateColor = (id, formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_UPDATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type' : 'multipart/form-data',  
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }        
        await axios.put(`/api/colors/${id}`, formData, config)
        dispatch({
            type: COLOR_UPDATE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: COLOR_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteColor = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_DELETE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/colors/${id}`, config)
        dispatch({
            type: COLOR_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: COLOR_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const getColor = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: COLOR_DETAIL_REQUEST
        })        
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/colors/${id}`, config)
        dispatch({
            type: COLOR_DETAIL_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: COLOR_DETAIL_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,})
    }
}