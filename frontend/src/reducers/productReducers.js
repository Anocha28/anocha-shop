import { 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAIL_REQUEST, 
    PRODUCT_DETAIL_SUCCESS, 
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_CLEAR,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_DEFAULT,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_DEFAULT,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_DEFAULT,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_INVENTORY_REQUEST,
    PRODUCT_INVENTORY_SUCCESS,
    PRODUCT_INVENTORY_FAIL,
    PRODUCT_INVENTORY_DEFAULT,
    PRODUCT_SHOPNOW_REQUEST,
    PRODUCT_SHOPNOW_SUCCESS,
    PRODUCT_SHOPNOW_FAIL,
    PRODUCT_SHOPNOW_DEFAULT,
} from '../constants/productConstants'


export const productListReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default: return state
    }
}

export const productDetailReducer = (state = {product: {reviews: [], images: [], color: [], size:[], inventory: []}}, action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:    
            return {loading: true, ...state}
        case PRODUCT_DETAIL_SUCCESS: 
            return {loading: false, product: action.payload}
        case PRODUCT_DETAIL_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_DETAIL_CLEAR:
            return { state }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:    
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS: 
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const productCreateReducer = (state = {success: false}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:    
            return {loading: true }
        case PRODUCT_CREATE_SUCCESS: 
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_DEFAULT:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = {success: false}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:    
            return {loading: true }
        case PRODUCT_UPDATE_SUCCESS: 
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_DEFAULT:
            return {}
        default:
            return state
    }
}


export const productCreateReviewReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:    
            return {loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS: 
            return {loading: false, success: true}
        case PRODUCT_CREATE_REVIEW_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_DEFAULT:
            return {}
        default:
            return state
    }
}


export const productTopRatedReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_TOP_REQUEST:    
            return {loading: true }
        case PRODUCT_TOP_SUCCESS: 
            return {loading: false, products: action.payload}
        case PRODUCT_TOP_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const productInventoryReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_INVENTORY_REQUEST:    
            return {loading: true }
        case PRODUCT_INVENTORY_SUCCESS: 
            return {loading: false, products: action.payload}
        case PRODUCT_INVENTORY_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_INVENTORY_DEFAULT:
            return {}
        default:
            return state
    }
}

export const productShopNowReducer = (state = {products: []}, action) => {
    switch(action.type){
        case PRODUCT_SHOPNOW_REQUEST:    
            return {loading: true }
        case PRODUCT_SHOPNOW_SUCCESS: 
            return {loading: false, products: action.payload}
        case PRODUCT_SHOPNOW_FAIL: 
            return {loading: false, error: action.payload}
        case PRODUCT_SHOPNOW_DEFAULT:
            return {}
        default:
            return state
    }
}
