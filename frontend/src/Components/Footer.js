import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from "react-bootstrap"

const Footer = () => {
    return (
        <footer className='noprint'>
            <Container>
                    {/* <hr className='py-4' />
                    <div className='my-4'>
                    <Row>
                        <Col lg={6} md={8} sm={12}>
                            <h1 className='text-center pt-3'>A-Web Ecommerce</h1>                            
                        </Col>

                        <Col lg={3} md={2} sm={12}>
                            <ListGroup variant='flush'>                                
                                <Link to='/help' style={{ textDecoration: 'none', color: 'black', border: 'none' }}>
                                <ListGroup.Item>Help Center</ListGroup.Item>
                                </Link>
                                <LinkContainer to='/shippinganddelivery'>
                                <ListGroup.Item>Shipping & Delivery</ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to='/orderandpayment'>
                                <ListGroup.Item>Order & Payment</ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to='/returnandrefunds'>
                                <ListGroup.Item>Return & Refunds</ListGroup.Item>
                                </LinkContainer>
                            </ListGroup>
                        </Col>
                        <Col lg={3} md={2} sm={12}>
                        <ListGroup variant='flush'>
                                <LinkContainer to='/terms'>
                                <ListGroup.Item>Terms</ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to='/policy'>
                                <ListGroup.Item>Privary Policy</ListGroup.Item>
                                </LinkContainer>
                                <LinkContainer to='contact'>
                                <ListGroup.Item>Contact Us</ListGroup.Item>
                                </LinkContainer>   
                                <ListGroup.Item>
                                <i className="bi-facebook px-2" style={{fontSize: '2rem'}}></i>
                                <i className="bi-instagram px-2" style={{fontSize: '2rem'}}></i>
                                <i className="bi-twitter px-2" style={{fontSize: '2rem'}}></i>
                                <i className="bi-youtube px-2" style={{fontSize: '2rem'}}></i>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    </div> */}

                    <hr className='pb-4' />


                <Row>
                    <Col className='text-center pb-3'>
                        {/* <Link to='/help' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Help Center</small>
                        </Link>
                        <Link to='/delivery' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Shipping & Delivery</small>
                        </Link>
                        <Link to='/orderandpayment' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Order & Payment</small>
                        </Link>
                        <Link to='/returnandrefunds' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Return & Refunds</small>
                        </Link> */}
                        <Link to='/terms' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Terms</small>
                        </Link>
                        <Link to='/policy' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Privacy Policy</small>
                        </Link>
                        <Link to='/contact' style={{ textDecoration: 'none', color: '#232323', border: 'none' }}>
                        <small className='mx-3'>Contact Us</small>
                        </Link>

                                
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; | {new Date().getFullYear()} | A-Web by Anocha
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
