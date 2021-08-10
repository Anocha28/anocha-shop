import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Row,Col, Form, Button, Alert, Spinner} from 'react-bootstrap'
import {getUserDetails, updateUser} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userConstants'

const AdminUserEditScreen = ({match, history}) => {
    const userId = match.params.id
    
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const userDetails = useSelector(state=>state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state=>state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        if(successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/users')
        } else {
            if( !userInfo || !userInfo.isAdmin){
                history.push('/')
            }else{
                if(!user.name || user._id !== userId){
                    dispatch(getUserDetails(userId))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                    setIsAdmin(user.isAdmin)
                }           
            }
        }
        
    }, [dispatch, userId, history, userInfo, user, successUpdate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }
    
        return (
            <>    
            <Container className="signup">
            {/* <Button
            variant='dark'
            onClick={goBackHandler}
            >Go Back</Button> */}

                <Link to='/admin/users' className='btn btn-light my-3'>
                Go Back
                </Link>

                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded'>
                        
                            <div className='text-center'>
                             <h2 className='my-3'>Edit User</h2>                             
                            </div>
    
                           
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                            {loadingUpdate && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
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
                                    <Form.Check
                                        type='checkbox'
                                        label='Admin'
                                        checked={isAdmin}
                                        className='pl-4'
                                        onChange={e=>setIsAdmin(e.target.checked)}>
                                    </Form.Check>
                                </Form.Group>
    
                                    <Button
                                    block
                                    type='submit'
                                    variant='dark'
                                    
                                    >
                                    <strong>Update</strong>
                                    </Button>                            
                            </Form>
                            
                        </div>
                    </Col>
                </Row>
            </Container>      
            </>
        )
}

export default AdminUserEditScreen
