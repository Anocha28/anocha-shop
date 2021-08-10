import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row,Col, Form, Button, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetThePassword } from '../actions/userActions'
import { USER_RESETPASSWORD_RESET } from '../constants/userConstants'


const ResetPasswordScreen = ({history, location}) => {
    const dispatch = useDispatch()
    const id = location.pathname ? location.pathname.split('/')[2] : ''
    const token = location.pathname ? location.pathname.split('/')[3] : ''
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const resetPassword = useSelector(state => state.resetPassword)
    const {loading, error, success} = resetPassword

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
  

    useEffect (()=>{
        if(userInfo){
            history.push('/')
        }
        
        if(success){
            toast.success('Your new password is saved. Please login.')
            setPassword('')
            setConfirmPassword('')
        }
        return()=>{
            dispatch({type: USER_RESETPASSWORD_RESET})
        }
    }, [history,dispatch, userInfo, success])

    const submitHandler = (e) => {
        
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error("Password does not match.")
        } else {
            dispatch(resetThePassword(id, token, password))
            
        }
    }

        return (
            <>
            <Container className="login">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded shadow'>

                            <div className='text-center'>
                            <h2 className='my-3'>Reset Password</h2>
                            </div>

                            
                            {error && toast.error(error)}
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Type your new password <small className='text-muted'>(required)</small>
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
                                        Confirm password <small className='text-muted'>(required)</small>
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
                </Row>
            </Container>      
            </>
        )
}

export default ResetPasswordScreen

