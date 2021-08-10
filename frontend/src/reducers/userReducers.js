import { 
    ADMIN_CONTACTUS_DELETE_FAIL,
    ADMIN_CONTACTUS_DELETE_REQUEST,
    ADMIN_CONTACTUS_DELETE_RESET,
    ADMIN_CONTACTUS_DELETE_SUCCESS,
    ADMIN_CONTACTUS_FAIL,
    ADMIN_CONTACTUS_REQUEST,
    ADMIN_CONTACTUS_RESET,
    ADMIN_CONTACTUS_SUCCESS,
    USER_CONTACTUS_FAIL,
    USER_CONTACTUS_REQUEST,
    USER_CONTACTUS_RESET,
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
    USER_FORGOTPASSWORD_RESET,
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
    USER_RESETPASSWORD_RESET,
    USER_RESETPASSWORD_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants"


export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default: return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}

export const userDetailsReducer = (state = {user: {}}, action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        case USER_DETAILS_RESET:
            return {user: {}}
        default: return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}

export const userListReducer = (state = {users: []}, action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading: true}
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case USER_LIST_RESET:
            return {users: []}
        default: return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true}
        case USER_DELETE_SUCCESS:
            return {loading: false, success: true}
        case USER_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}

export const userUpdateReducer = (state = {user: {}}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case USER_UPDATE_RESET:
            return {user: {}}
        default: return state
    }
}

export const userContactUsReducer = (state = {}, action) => {
    switch(action.type){
        case USER_CONTACTUS_REQUEST:
            return {loading: true}
        case USER_CONTACTUS_SUCCESS:
            return {loading: false, success: true}
        case USER_CONTACTUS_FAIL:
            return {loading: false, error: action.payload}
        case USER_CONTACTUS_RESET:
            return {}
        default: return state
    }
}

export const contactUsListReducer = (state = {messages: []}, action) => {
    switch(action.type){
        case ADMIN_CONTACTUS_REQUEST:
            return {loading: true, messages: []}
        case ADMIN_CONTACTUS_SUCCESS:
            return {
                loading: false, 
                messages: action.payload.messages, 
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case ADMIN_CONTACTUS_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_CONTACTUS_RESET:
            return {messages: []}
        default: return state
    }
}

export const contactUsDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case ADMIN_CONTACTUS_DELETE_REQUEST:
            return {loading: true}
        case ADMIN_CONTACTUS_DELETE_SUCCESS:
            return {loading: false, success: true}
        case ADMIN_CONTACTUS_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case ADMIN_CONTACTUS_DELETE_RESET:
            return {}
        default: return state
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type){
        case USER_FORGOTPASSWORD_REQUEST:
            return {loading: true}
        case USER_FORGOTPASSWORD_SUCCESS:
            return {loading: false, success: true}
        case USER_FORGOTPASSWORD_FAIL:
            return {loading: false, error: action.payload}
        case USER_FORGOTPASSWORD_RESET:
            return {}
        default: return state
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch(action.type){
        case USER_RESETPASSWORD_REQUEST:
            return {loading: true}
        case USER_RESETPASSWORD_SUCCESS:
            return {loading: false, success: true}
        case USER_RESETPASSWORD_FAIL:
            return {loading: false, error: action.payload}
        case USER_RESETPASSWORD_RESET:
            return {}
        default: return state
    }
}