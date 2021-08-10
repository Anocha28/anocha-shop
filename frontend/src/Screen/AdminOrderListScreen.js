import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Moment from 'react-moment'
import { Spinner, Alert, Table, Button, Container } from 'react-bootstrap'
import {listOrders} from '../actions/orderActions'

const AdminOrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/')
        }
        dispatch(listOrders())
    },[dispatch, history, userInfo])

    return (
        <Container>
            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> :
            <>
                <h1>Admin order list</h1>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>USER</td>
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
                                    <td>{order.user.name}</td>
                                    <td><Moment format="DD MMM YY">{order.createdAt}</Moment></td>
                                    <td>$ {(Number(order.totalPrice)).toFixed(2)}</td>
                                    <td>{order.isPaid ? 
                                    <><Moment format="DD MMM YY">{order.paidAt}</Moment> <i className="bi bi-check-lg"></i></> : 
                                    <i className="bi bi-x-lg"></i>
                                    }</td>
                                    <td>{order.isDelivered ? 
                                    <><Moment format="DD MMM YY">{order.deliveredAt}</Moment> <i className="bi bi-check-lg"></i></> : 
                                    <i className="bi bi-x-lg"></i>}</td>
                                    <td>
                                    <LinkContainer to={`order/${order._id}`}>
                                    <Button size='sm' variant='outline-dark'><i className="bi bi-plus-lg"></i></Button>
                                    </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            }
            
        </Container>
    )
}

export default AdminOrderListScreen
