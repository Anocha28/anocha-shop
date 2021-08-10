import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form,Container, Row, Col, Button} from 'react-bootstrap'
import CheckoutSteps from './CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart


    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    useEffect(()=>{
        if(Object.keys(shippingAddress).length === 0) {
            history.push('/shipping')
        }
    },[history, shippingAddress])



    const submitHandler = (e) => {
        e.preventDefault()
            dispatch(savePaymentMethod(paymentMethod))
            history.push('/placeorder')
    }



    return (
        <Container className="">
        <CheckoutSteps step1 step2 step3 now={75} />
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded'>
    
                            <div className='text-center'>
                             <h2 className='my-3'>Payment Method</h2>                             
                            </div>
    
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
                                
                                    <Form.Group>
                                        <Form.Label as='legend'>
                                            Select Method
                                        </Form.Label>
                                        <Col>
                                            <Form.Check 
                                                type='radio' 
                                                label='Paypal or Credit Card' 
                                                id='Paypal'
                                                name='paymentMethod'
                                                value='Paypal'
                                                checked
                                                onChange={(e)=> setPaymentMethod(e.target.value)}
                                                ></Form.Check>

                                                <Form.Check 
                                                type='radio' 
                                                label='Stripe' 
                                                id='Stripe'
                                                name='paymentMethod'
                                                value='Stripe'
                                                
                                                onChange={(e)=> setPaymentMethod(e.target.value)}
                                                ></Form.Check>
                                        </Col>
                                    </Form.Group>
                                    <Button
                                    block
                                    type='submit'
                                    variant='dark'
                                    
                                    >
                                    <strong>Proceed to Order</strong>
                                    </Button>                            
                            </Form>
                           
                        </div>
                    </Col>
                </Row>
            </Container>      
            
    )
}

export default PaymentScreen

