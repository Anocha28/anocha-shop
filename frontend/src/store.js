import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    productListReducer, 
    productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopRatedReducer,
    productInventoryReducer,
    productShopNowReducer,
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userContactUsReducer,
    contactUsListReducer,
    contactUsDeleteReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
} from './reducers/userReducers'
import {
    colorCreateReducer,
    colorDeleteReducer,
    colorListReducer,
    colorDetailReducer,
    colorUpdateReducer,
} from './reducers/colorReducers'
import {
    addInventoryReducer,
} from './reducers/inventoryReducers'
import {
    orderCreateReducer, 
    orderDeliverReducer, 
    orderDetailReducer,
    orderListMyReducer,
    orderListReducer,
    orderPayReducer,
} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    productInventory: productInventoryReducer,
    productShopNow: productShopNowReducer,

    cart: cartReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userContactUs: userContactUsReducer,
    contactUsList: contactUsListReducer,
    contactUsDelete: contactUsDeleteReducer,
   
    colorList: colorListReducer,
    colorCreate: colorCreateReducer,
    colorDelete: colorDeleteReducer,
    colorDetail: colorDetailReducer,
    colorUpdate: colorUpdateReducer,

    addInventory: addInventoryReducer,

    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderListMy: orderListMyReducer,
    orderDeliver: orderDeliverReducer,
    forgotPassword: forgotPasswordReducer,    
    resetPassword: resetPasswordReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
                            JSON.parse(localStorage.getItem('userInfo')) : null

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
                            JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
                            JSON.parse(localStorage.getItem('shippingAddress')) : {}


                            

const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools
    (applyMiddleware(...middleware)))



export default store