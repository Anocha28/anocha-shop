import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Form,Container, Row, Alert, Col, Button} from 'react-bootstrap'
import CheckoutSteps from './CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [province, setProvince] = useState(shippingAddress.province)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [message, setMessage] = useState(null)


    useEffect(()=>{
        if(cart.cartItems.length === 0){
            history.push('/cart')
        }
    },[cart, history])
    
 
    const submitHandler = (e) => {
        e.preventDefault()
        const addressToSave = {
            address,
            city,
            postalCode,
            province,
            country,
            phone
        }

        const isEmpty = Object.values(addressToSave).every(x =>  x === '' || x === undefined || x === null);
        if(isEmpty) {
            setMessage("Please fill in all the required.")
        } else {
            dispatch(saveShippingAddress({address, city, postalCode, province, country, phone}))
            history.push('/payment')
            setMessage(null)
        }       
    }



    return (
        <Container className="">
        <CheckoutSteps step1 step2 now={50} />
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded'>
    
                            <div className='text-center'>
                             <h2 className='my-3'>Shipping Details</h2>                             
                            </div>

                            {message && <Alert variant='danger' className='p-2 m-4'>{message}</Alert>}
    
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='false' noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Address <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={address}
                                        className='p-2'
                                        onChange={e=>setAddress(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        City <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={city}
                                        className='p-2'
                                        onChange={e=>setCity(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Province <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={province}
                                        className='p-2'
                                        onChange={e=>setProvince(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Country <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={country}
                                        className='p-2'
                                        onChange={e=>setCountry(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Postal Code <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={postalCode}
                                        className='p-2'
                                        onChange={e=>setPostalCode(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Phone <small className='text-muted'>(optional)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={phone}
                                        className='p-2'
                                        onChange={e=>setPhone(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                
                                
                                
    
                                    <Button
                                    block
                                    type='submit'
                                    variant='dark'
                                    
                                    >
                                    <strong>Proceed to Payment</strong>
                                    </Button>                            
                            </Form>
                           
                        </div>
                    </Col>
                </Row>
            </Container>      
            
    )
}

export default ShippingScreen
