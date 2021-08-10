import axios from 'axios'
import { CART_RESET } from '../constants/cartConstants'
import { 
    ORDER_DETAIL_DEFAULT, 
    ORDER_LIST_DEFAULT, 
    ORDER_LIST_MY_DEFAULT, 
} from '../constants/orderConstants'
import { PRODUCT_INVENTORY_DEFAULT } from '../constants/productConstants'
import { 
    ADMIN_CONTACTUS_DELETE_FAIL,
    ADMIN_CONTACTUS_DELETE_REQUEST,
    ADMIN_CONTACTUS_DELETE_SUCCESS,
    ADMIN_CONTACTUS_FAIL,
    ADMIN_CONTACTUS_REQUEST,
    ADMIN_CONTACTUS_SUCCESS,
    USER_CONTACTUS_FAIL,
    USER_CONTACTUS_REQUEST,
    USER_CONTACTUS_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_FORGOTPASSWORD_FAIL,
    USER_FORGOTPASSWORD_REQUEST,
    USER_FORGOTPASSWORD_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_RESETPASSWORD_FAIL,
    USER_RESETPASSWORD_REQUEST,
    USER_RESETPASSWORD_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants"


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/login', {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_DETAILS_RESET
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({type: USER_LIST_RESET})
    dispatch({type: ORDER_LIST_DEFAULT})
    dispatch({type: ORDER_LIST_MY_DEFAULT})
    dispatch({type: CART_RESET})
    dispatch({type: ORDER_DETAIL_DEFAULT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: PRODUCT_INVENTORY_DEFAULT})
    dispatch({type: USER_LOGOUT})
    
}

// export const clearUserDetails = () => async(dispatch) => {
//     try {
//         dispatch({type: USER_DETAILS_RESET})
//     } catch (error) {
//         dispatch({
//             type: USER_DETAILS_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//         })
//     }
// }

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/users/${user._id}`,user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const contact = (contactData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CONTACTUS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/users/contact`, contactData, config)

        dispatch({
            type: USER_CONTACTUS_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_CONTACTUS_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}


export const contactList = (keyword = '', pageNumber = '', pageSize = '') => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONTACTUS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`/api/users/contact?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`, config)
        
        dispatch({
            type: ADMIN_CONTACTUS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONTACTUS_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const deleteContactMessage = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADMIN_CONTACTUS_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/users/contact/${id}`, config)

        dispatch({
            type: ADMIN_CONTACTUS_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CONTACTUS_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const forgetPassword = (email,url) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOTPASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        
        await axios.post(`/api/users/forgot`, {email, url}, config)

        dispatch({
            type: USER_FORGOTPASSWORD_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_FORGOTPASSWORD_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const resetThePassword = (id, token, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_RESETPASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
        
        await axios.put(`/api/users/${id}/${token}`, {password}, config)

        dispatch({
            type: USER_RESETPASSWORD_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: USER_RESETPASSWORD_FAIL, 
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}