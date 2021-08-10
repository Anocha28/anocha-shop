import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2' 
import {Spinner, Alert, Image, Row, Col, ListGroup, Container} from 'react-bootstrap'
import Moment from 'react-moment'
import {useDispatch, useSelector} from 'react-redux'
import { getOrderDetail, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { ORDER_CREATE_DEFAULT } from '../constants/orderConstants'




const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetail = useSelector(state => state.orderDetail)
    const {loading, order, error} = orderDetail

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay


    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    if(!loading && order) {
        order.itemsPrice = addDecimals(Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
        order.shippingPrice = addDecimals(Number(order.shippingPrice))
        order.taxPrice = addDecimals(Number(order.taxPrice))
        order.totalPrice = (Number(order.itemsPrice) + Number(order.shippingPrice) + Number(order.taxPrice)).toFixed(2)
    
    }
    
    useEffect(()=>{

        const addPaypalScript = async () => {
            const {data:clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = ()=> {setSdkReady(true)}
            document.body.appendChild(script)
        }

        if(!order || successPay || order._id !== orderId) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderDetail(orderId))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPaypalScript()
            }else {
                setSdkReady(true)
            }
        }

        

        return()=> {
            dispatch({type: ORDER_CREATE_DEFAULT})
        }
        
    },[dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        //console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }


    return (
            <Container>
            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 
            <>
            <h3 className='text-center'>Order Details</h3>
            <Row className='border border-secondary h-3'>
                <h4 className='m-2'>Name : <strong>{order.user.name}</strong></h4>
                <h4 className='d-inline ml-auto m-2'>Order ID : <strong>{order.code}</strong></h4>
            </Row>
            <Row className='border-bottom pb-3'>
                <Col>
                    <h5 className='my-3'>Shipping Address : </h5>
                    <p className='m-1 p-0'>{order.shippingAddress.address}</p>
                    <p className='m-1 p-0'>{order.shippingAddress.city}</p>
                    <p className='m-1 p-0'>{order.shippingAddress.province}, {order.shippingAddress.postalCode}</p>
                    <p className='m-1 p-0'>{order.shippingAddress.country}</p>
                    <p className='m-1 p-0'>{order.shippingAddress.phone}</p>
                    <a href={`mailto:${order.user.email}`} style={{color: 'black'}}><p className='m-1 p-0'>{order.user.email}</p></a>
                </Col>
                <Col>
                    <h5 className='my-3 text-right'>Date : <Moment format="DD MMM YYYY">{order.createdAt}</Moment></h5>
                    <p className='m-1 p-0 text-right'>Payment Method : {order.paymentMethod}</p>
                    <p className={`m-1 p-0 text-right ${order.isPaid ? 'bg-success' : 'bg-warning'}`}>Paid : {order.isPaid ? 'Yes' : 'No'}</p>
                    <p className={`m-1 p-0 text-right ${order.isDelivered ? 'bg-success' : 'bg-warning'}`}>Delivered : {order.isDelivered ? 'Yes' : 'No'}</p>
                    
                </Col>
            </Row>

            <Row>
                <Col className='border-right'>
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item className="d-flex flex-row" key={index}>
                                <Image src={`/${item.image}`} style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                                <p className='my-2 mx-3 px-1'>{item.name}</p>
                                <p className='my-2 mx-3 px-1'>{item.color.code}</p>
                                <p className='my-2 mx-3 px-1'>{item.size}</p>
                                <p className='my-2 mx-3 px-1'>{item.qty}</p>
                                <p className='my-2 mx-3 px-1'>$ {item.price}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5 className='text-right my-2'>Sub total: $ {order.itemsPrice}</h5>
                            <h5 className='text-right my-2'>Shipping price: $ {order.shippingPrice}</h5>
                            <h5 className='text-right my-2'>Tax price: $ {order.taxPrice}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3 className='text-right mt-5'>Total : $ {order.totalPrice}</h3>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row className='mt-3 border-top noprint'>
            <Col>

            </Col>
            <Col>
                {!order.isPaid && (
                    <>
                    {loadingPay && <div className='text-center'><Spinner animation="border" variant="secondary" /></div> }
                    {!sdkReady ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> : (
                        <div className='mt-4'>
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                        </div>
                    )}
                    </>
                    )}
            </Col>
            </Row>
            </>
            }
            </Container>
)}

export default OrderScreen
