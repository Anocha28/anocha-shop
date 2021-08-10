import React from 'react'
import {Nav, ProgressBar, Row , Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4, now}) => {
    return (
        <>
        <Nav className='justify-content-center '>
            <Nav.Item className='px-2'>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link><p className='m-0'>Sign In</p></Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                    <p className='m-0'>Sign In</p>
                    </Nav.Link>}
            </Nav.Item>

            <Nav.Item className='px-2'>
                {step2 ? (
                    <LinkContainer to='/shipping'  className='ml-0'>
                        <Nav.Link><p className='m-0'>Shipping</p></Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                    <p className='m-0'>Shipping</p>
                    </Nav.Link>}
            </Nav.Item>

            <Nav.Item className='px-2'>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link><p className='m-0'>Payment</p></Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                    <p className='m-0'>Payment</p>
                </Nav.Link>}
            </Nav.Item>

            <Nav.Item className='px-2'>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link><p className='m-0'>Order</p></Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                    <p className='m-0'>Order</p>
                    </Nav.Link>}
            </Nav.Item>            
        </Nav>

        <Row className='mb-4'>
        <Col md={2} lg={3} xl={3}>
        </Col>

            <Col sm={12} md={8} lg={6} xl={6}>
            <ProgressBar animated variant='secondary' now={now} />
            </Col>

        <Col md={2} lg={3} xl={3}>
        </Col>
         
         </Row>
         </>
    )
}


export default CheckoutSteps
