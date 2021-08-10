import React, {useEffect} from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { contactList } from '../actions/userActions'
import { Container, Row, Spinner, Alert, Table } from 'react-bootstrap'
import Paginate from '../Components/Paginate'
import ContactUsDetailModel from '../Modals/ContactUsDetailModel'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import {deleteContactMessage} from '../actions/userActions'
import {ADMIN_CONTACTUS_DELETE_RESET} from '../constants/userConstants'

const AdminContactUsListScreen = ({match}) => {
    const dispatch = useDispatch()
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1


    const contactUsList = useSelector(state=> state.contactUsList)
    const {loading, messages, error, page, pages} = contactUsList
    const contactUsDelete = useSelector(state=> state.contactUsDelete)
    const {loading: deleteLoading, error: deleteError, success} = contactUsDelete

    useEffect(()=>{
        dispatch(contactList(keyword, pageNumber, ''))
        return () => {
            dispatch({type: ADMIN_CONTACTUS_DELETE_RESET})
        }
    },[dispatch, keyword, pageNumber, success])

    const handleDelete = (id) => {
        dispatch(deleteContactMessage(id))
    }

    return (
        <Container className='mt-4'>
            <h1>Message List</h1>
            {deleteLoading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
            {deleteError && <Alert variant='danger'>{deleteError}</Alert>}
            {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> : 
            error ? <Alert variant='danger'>{error}</Alert> : 
            <>

            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>DATE</th>
                        <th>TITLE</th>
                        <th>MESSAGE</th>
                        <th>MORE</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(m => (
                        <tr key={m._id}>
                            <td>{m.user.name}</td> 
                            <td>{m.user.email}</td>
                            <td><Moment format='DD MMM YY'>{m.createdAt}</Moment></td>
                            <td>{m.title}</td>
                            <td>{m.content.substring(0, 40)}{m.content.length > 40 ? '...' : ''}</td>
                            <td><ContactUsDetailModel sender={m.user} title={m.title} content={m.content} /></td>
                            <td><DeleteConfirmModal deleteFunction={handleDelete} id={m._id} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            </>
            }

            <Row className='my-5 justify-content-center'>
                <div className='m-auto'>
                    <Paginate className='' pages = {pages} page={page} keyword={keyword ? keyword : ''}/>
                </div>
            </Row>
            
        </Container>
    )
}

export default AdminContactUsListScreen
