import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import {LinkContainer} from 'react-router-bootstrap'
import Moment from 'react-moment'
import {Row,Col, Form, Button, Alert, Spinner, Table, Container} from 'react-bootstrap'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ history}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
    
    const userDetails = useSelector(state=>state.userDetails)
    const {loading, error, user} = userDetails
    
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const orderListMy = useSelector(state=>state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || user.name !== userInfo.name) {
                dispatch(getUserDetails('profile'))                
            } else {
                setName(user.name)
                setEmail(user.email)
            }
            dispatch(listMyOrders())
        }
    }, [dispatch, history, userInfo, user])

    
    const submitHandler = (e) => {
        e.preventDefault()

        if(name === '' || email === '' || password === '' || confirmPassword === '') {
            setMessage("Please fill in all the required.")
            setSuccess(null)
        } else if(password !== confirmPassword) {
            setMessage("Password do not match")
            setSuccess(null)
        } else {
            //console.log('update user')
            dispatch(updateUserProfile({id: user._id, name, email, password }))
            setSuccess('Profile updated successfully.')
            setMessage(null)
            setPassword('')
            setConfirmPassword('')
        }        
    }
    
        return (
            <Container>
                <Row className="">
                    <Col sm={12} md={4} lg={4} xl={4} className="m-auto">
                        <div className='mx-auto border rounded'>
    
                            <div className='text-center'>
                             <h2 className='my-3'>Profile update</h2>                             
                            </div>
    
                            {message && <Alert variant='danger' className='p-2 m-4'>{message}</Alert>}
                            {success && <Alert variant='success' className='p-2 m-4'>{success}</Alert>}
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /><small className='m-auto'>please wait</small></div>}
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Name <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={name}
                                        className='p-2'
                                        onChange={e=>setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                
                                
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Email <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={email}
                                        className='p-2'
                                        onChange={e=>setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
    
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Password <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    
                                    <Form.Control
                                        type='password'
                                        value={password}
                                        className='p-2'
                                        onChange={e=>setPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Confirm Password <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    
                                    <Form.Control
                                        type='password'
                                        value={confirmPassword}
                                        className='p-2'
                                        onChange={e=>setConfirmPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
    
                                    <Button
                                    block
                                    type='submit'
                                    variant='dark'
                                    
                                    >
                                    <strong>Submit</strong>
                                    </Button>                            
                            </Form>
                           
                        </div>
                    </Col>

                    <Col sm={12} md={8} lg={8} xl={8} className="">
                        <h3>Order List </h3>
                        {loadingOrders ? <div className='text-center'><Spinner animation="border" variant="secondary" /><small className='m-auto'>please wait</small></div> :
                        errorOrders ? <Alert variant='danger'>{errorOrders}</Alert> :
                            (
                                <Table striped bordered hover responsive className='table-sm'>
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>DATE</td>
                                            <td>TOTAL</td>
                                            <td>PAID</td>
                                            <td>DELIVERED</td>
                                            <td>DETAILS</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index}>
                                                <td>{order.code}</td>
                                                <td><Moment format="DD MMM YY">{order.createdAt}</Moment></td>
                                                <td>$ {(Number(order.totalPrice)).toFixed(2)}</td>
                                                <td>{order.isPaid ? 
                                                <><Moment format="DD MMM YY">{order.paidAt}</Moment> <i className="bi bi-check-lg"></i></> : 
                                                <LinkContainer to={`order/${order._id}`}>
                                                <Button size='sm' variant='outline-info'>Pay now <i className="bi bi-caret-right-square"></i></Button>
                                                </LinkContainer>
                                                }</td>
                                                <td>{order.isDelivered ? <i className="bi bi-check-lg "></i> : <i className="bi bi-x-lg"></i>}</td>
                                                <td>
                                                <LinkContainer to={`order/${order._id}`}>
                                                <Button size='sm' variant='outline-dark'><i className="bi bi-plus-lg"></i></Button>
                                                </LinkContainer>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )
                        }
                    </Col>
                </Row>    
            </Container>
        )
}

export default ProfileScreen
