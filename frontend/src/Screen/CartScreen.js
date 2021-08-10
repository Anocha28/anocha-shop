import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Image, Row, Col, ListGroup,Button, Alert, InputGroup, FormControl, Container} from 'react-bootstrap'
import {removeFromCart, increaseQty, decreaseQty} from '../actions/cartActions'
import CheckoutSteps from './CheckoutSteps'

const CartScreen = ({history}) => {

    const dispatch = useDispatch()

    const {cartItems} = useSelector(state => state.cart)
    //const {product} = useSelector(state => state.productDetail)
    const {userInfo} = useSelector(state=>state.userLogin)


    let sortedCartItems = []
    sortedCartItems = cartItems.sort((a, b) => (a.sku > b.sku) ? 1 : -1);
    
    const removeHandler = (productId, colorCode, size) => {
        dispatch(removeFromCart(productId, colorCode, size))
    }

    const increaseQtyHandler = (inventoryId, productId,colorId,size, qty) => {       
       dispatch(increaseQty(inventoryId, productId,colorId,size,qty))
    }

    const decreaseQtyHandler = (inventoryId, productId,colorId,size, qty) => {    
       dispatch(decreaseQty(inventoryId, productId,colorId,size,qty))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    
    return (
        <Container>
        <Row>
            <Col >
            {sortedCartItems.length === 0 ? 
            <>
                <Alert variant='secondary'>No item in cart,  <Link to={"/"} style={{ color: '#39A9CB' }}>Back to shopping</Link></Alert>
                
            </>
             : 
             <>
             {userInfo ? <CheckoutSteps step1 now={25} /> : <CheckoutSteps now={0} />}
             
             <Row>
             
                 <Col lg={8} md={9} sm={12} >
                    <ListGroup variant="flush">
                        {cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                            <Row>
                               <Col lg={1} md={1} sm={1} xs={1} className='m-0 p-0'>
                                    <Image src={item.image} fluid />
                               </Col> 

                               <Col lg={11} md={11} sm={11} xs={11}> 
                                    <Row>
                                        <Col lg={6} md={6} sm={6} xs={6}>
                                            <Row as='h5' className='pl-2'>
                                                {item.name}
                                            </Row>
                                            <Row>

                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                    <Row>
                                                        <Col lg={6} md={6} sm={6} xs={6} className='pt-2 pr-0'>
                                                            <p className='pr-0 m-auto'>  color</p>
                                                        </Col>
                                                        <Col lg={3} md={3} sm={3} xs={3} className='mt-1 p-0 colorPictures'>
                                                            <Image  
                                                                src={item.inventory.color.image} 
                                                                alt={item.inventory.color.name} 
                                                                roundedCircle
                                                                fluid 
                                                            />    
                                                        </Col>
                                                    </Row>                        
                                                </Col>

                                                <Col lg={6} md={6} sm={6} xs={6}>
                                                    <p className='pt-2'>size - {item.size}</p>
                                                </Col>
                                            </Row>                                            
                                        </Col>
                                        
                                        <Col as= 'h5' lg={2} md={2} sm={2} xs={2} className='m-auto p-0'>
                                            $ {addDecimals(item.price * item.qty)}
                                        </Col>
                                        <Col lg={3} md={3} sm={3} xs={3}  className='m-auto p-0'>
                                            <InputGroup>
                                            <Button 
                                                size='sm' 
                                                disabled={item.qty === 1} 
                                                variant='light' 
                                                onClick={()=> decreaseQtyHandler(item.inventory._id, item.productId, item.colorId, item.size, item.qty )}
                                                ><i className="bi bi-dash-lg"></i>
                                            </Button>                       
                                                    <span className='w-25'>
                                                    <FormControl 
                                                    size='sm'
                                                    className=''
                                                    disabled
                                                    placeholder={item.qty}
                                                    /> 
                                                    </span>                           
                                            {/* need to put a disable in below button by checking stock qty */}
                                            <Button 
                                                size='sm' 
                                                disabled={item.stockCount <= item.qty}
                                                variant='light' 
                                                onClick={()=> increaseQtyHandler(item.inventory._id, item.productId, item.colorId, item.size, item.qty )}
                                                ><i className="bi bi-plus-lg"></i>
                                            </Button>
                                            </InputGroup>
                                            
                                        </Col>
                                        <Col lg={1} md={1} sm={1} xs={1} className='m-auto'>
                                            <Button 
                                                size='sm'
                                                variant='secondary' 
                                                className='p-1'
                                                onClick={() => removeHandler(item.productId, item.colorId, item.size)}
                                            >
                                            <i className="bi bi-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                               </Col>
                            </Row>
                    
                        </ListGroup.Item>
                
                    ))}
                    </ListGroup>
                 </Col>
                 


                 <Col lg={4} md={3} sm={12}>
                    <ListGroup>
                        <ListGroup.Item className='py-3'>
                            <h4>Subtotal - {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h4>
                            <hr className='pb-2' />
                            <h4>Shipping Fee - $ 0.00</h4>
                            <hr className='pb-2' />
                            <h4>Total - ${cartItems.reduce((acc, item)=> acc+item.qty * item.price, 0).toFixed(2)}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                                <Button
                                    block
                                    disabled={cartItems.length===0}
                                    variant='dark'
                                    onClick={checkoutHandler}
                                    >Proceed to Shipping
                                </Button>                           
                        </ListGroup.Item>
                    </ListGroup>
                     
                 </Col>
             </Row>  
             </>
            }
            
            </Col>
           
        </Row>
        </Container>
    )
}

export default CartScreen
