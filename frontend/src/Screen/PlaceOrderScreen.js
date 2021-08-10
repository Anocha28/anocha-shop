import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Alert, Spinner, Card, Container} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { CART_RESET } from '../constants/cartConstants'


const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const cartItemList = cart.cartItems.map(item => {
        return {
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            color: item.colorId,
            size: item.size,
            qty: item.qty
        }
    })

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
    cart.shippingPrice = addDecimals(Number(cart.itemsPrice > 100 ? 0 : 50))
    cart.taxPrice = addDecimals(Number((0.15*cart.itemsPrice)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    cart.paymentMethod = localStorage.getItem('paymentMethod') ? 
                            JSON.parse(localStorage.getItem('paymentMethod')) : ''

    const orderCreate = useSelector(state => state.orderCreate)
    const {loading, success, error, order} = orderCreate

    useEffect(()=> {
        if(success){        
            localStorage.removeItem('cartItems')
            localStorage.removeItem('shippingAddress')
            localStorage.removeItem('paymentMethod')
            dispatch({
                type: CART_RESET
            })    
            history.push(`order/${order._id}`)
        }

        if(cart.cartItems.length === 0){
            history.push('/')
        }
        
        // eslint-disable-next-line
    },[dispatch, success, history])

    const placeOrderHandler = () => {        
        dispatch(createOrder({
            orderItems: cartItemList,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    


    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 now={100} />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address :</strong> {' '}
                                {cart.shippingAddress.address}, {' '}
                                {cart.shippingAddress.city}, {' '}
                                {cart.shippingAddress.province}, {' '}
                                {cart.shippingAddress.country}, {' '}
                                {cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method : </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Alert variant='info'>Cart is empty</Alert> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.productId}`} style={{textDecoration: 'none', color: 'black'}}><p>{item.name}</p></Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x {addDecimals(item.price)} = $ {addDecimals(item.qty * item.price)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summery</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>$ {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>$ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div>
                                : error && <Alert variant='danger'>{error}</Alert>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                variant='dark'
                                disabled={cart.cartItems === 0} 
                                onClick={placeOrderHandler}
                                block>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default PlaceOrderScreen
