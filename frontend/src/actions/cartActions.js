import axios from 'axios'
import {
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (productId, inventory, size, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`)
    const itemInventory = await data.inventory.find(inv => inv._id === inventory._id)    
    const stockCount = await itemInventory.detail.find(d => d.size === size)    
    let sku = ''
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            sku: sku.concat(productId,itemInventory.color._id,size),
            productId: data._id,
            name: data.name,
            image: data.images[0],
            price: data.price,
            stockCount: stockCount.qty,
            inventory: itemInventory,
            colorId: inventory.color._id,
            size,
            qty,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (productId, colorId, size) => (dispatch, getState) => {
    let sku = ''

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: sku.concat(productId, colorId, size)
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const increaseQty = (inventoryId, productId,colorId,size,qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`)    
    const itemInventory = await data.inventory.find(ivn => ivn._id === inventoryId)      
    const stockCount = await itemInventory.detail.find(d => d.size === size)    
    let sku = ''

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: sku.concat(productId,colorId,size),
    })

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                sku: sku.concat(productId,colorId,size),
                productId: data._id,
                name: data.name,
                image: data.images[0],
                price: data.price,
                stockCount: stockCount.qty,
                inventory: itemInventory,
                colorId: itemInventory.color._id,
                size,
                qty: qty + 1,
            }
        })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const decreaseQty = (inventoryId, productId,colorId,size,qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${productId}`)    
    const itemInventory = await data.inventory.find(ivn => ivn._id === inventoryId)      
    const stockCount = await itemInventory.detail.find(d => d.size === size)    
    let sku = ''

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: sku.concat(productId,colorId,size),
    })

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                sku: sku.concat(productId,colorId,size),
                productId: data._id,
                name: data.name,
                image: data.images[0],
                price: data.price,
                stockCount: stockCount.qty,
                inventory: itemInventory,
                colorId: itemInventory.color._id,
                size,
                qty: qty - 1,
            }
        })
    
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}


