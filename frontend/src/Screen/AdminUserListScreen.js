import React, {useEffect} from 'react'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'

const AdminUserListScreen = ({history}) => {

    const dispatch = useDispatch()
    const userList = useSelector(state=> state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {success} = userDelete

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')            
        } else {
            dispatch(listUsers())
        }
        
    },[dispatch, userInfo, history, success])

    const deleteHandler = (id) => {
            dispatch(deleteUser(id))      
    }

    return (
        <Container>
            <h1>Users</h1>
            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<i className="bi bi-check2" style={{fontSize: '1.5rem', color: 'cornflowerblue'}}></i>) : (<i className="bi bi-x-circle" style={{fontSize: '1.5rem'}}></i>) }</td>
                                <td>                                    
                                    <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                        <Button 
                                        variant='light' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-gear" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                <DeleteConfirmModal deleteFunction={deleteHandler} id={user._id} />
                                    {/* <Button
                                    variant='danger'
                                    size='sm'
                                    className='p-0'
                                    onClick={()=> deleteHandler(user._id)}
                                    ><i className="bi bi-trash" style={{fontSize: '1.5rem'}}></i></Button>                                     */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                
            </Table>
            }
        </Container>
    )
}

export default AdminUserListScreen
