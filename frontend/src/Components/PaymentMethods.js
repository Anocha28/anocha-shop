import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Image } from 'react-bootstrap'

const PaymentMethods = () => {
    return (
        <div style={{
            width: '100%', 
            height: '350px',
            marginTop: '100px',
            
            }}
            className='border-top'
            >
            <>
            <Row className='mt-5'>
                <Col sm={6} md={6} lg={6} key='1'>
                    <Row className='justify-content-center'>
                        <h2 className='mt-3 mb-5'>Paymet Methods</h2>
                    </Row>
                    <Row>
                        <Col>
                            <Image src='https://ivcom.ca/wp-content/uploads/paypal-secure-payment.jpg' className='w-100 shadow'/>
                        </Col>
                        <Col>
                            <Image src='https://thimpress.com/wp-content/uploads/2015/06/Stripe-Payment.png' className='img-fluid h-100 shadow'/>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6} md={6} lg={6} key='2'>
                    <Row className='justify-content-center'>
                        <h2 className='mt-3 mb-5'>Follow us on Social</h2>
                    </Row>
                    <Row className='justify-content-center'>
                        <Link
                            to={{pathname: 'https://www.facebook.com'}}
                            target={"_blank"} 
                            style={{color: '#3B5998'}}>
                            <i className="bi-facebook px-3" style={{fontSize: '2rem'}}></i>
                        </Link>
                        <Link 
                            to={{pathname: 'https://www.instagram.com'}}
                            target={"_blank"} 
                            >                            
                            <i className="bi-instagram px-3" style={{fontSize: '2rem'}}></i>
                        </Link>
                        <Link 
                            to={{pathname: 'https://www.twitter.com'}}
                            target="_blank" 
                            style={{color: '#00acee'}}
                            ><i className="bi-twitter px-3" style={{fontSize: '2rem'}}></i>
                        </Link>
                        <Link 
                            to={{pathname: 'https://www.youtube.com'}}
                            target="_blank" 
                            style={{color: '#FF0000'}}
                            ><i className="bi-youtube px-3" style={{fontSize: '2rem'}} ></i>
                        </Link>
                    </Row>
                </Col>
            </Row>
            </>
        </div>
    )
}

export default PaymentMethods
