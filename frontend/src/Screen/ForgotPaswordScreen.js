import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row,Col, Form, Button, Alert, Spinner} from 'react-bootstrap'
import { forgetPassword } from '../actions/userActions'
import { USER_FORGOTPASSWORD_RESET } from '../constants/userConstants'


const ForgotPasswordScreen = ({history}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const forgotPassword = useSelector(state => state.forgotPassword)
    const {loading, error, success} = forgotPassword
  

    useEffect (()=>{
        //console.log(window.location)
        if(success){
            history.push('/login')
        }
        return()=>{
            dispatch({type: USER_FORGOTPASSWORD_RESET})
        }
    }, [history,dispatch, success])

    const submitHandler = (e) => {
        
        e.preventDefault()
        if(email === '') {
            setMessage("Please fill in all the required.")
        } else {
            setMessage(null)
            dispatch(forgetPassword(email, window.location.origin))
            
        }
    }

        return (
            <>
            <Container className="login">
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded shadow'>

                            <div className='text-center'>
                            <h2 className='my-3'>Forgot Password</h2>
                            </div>

                            {message && <Alert variant='danger' className='p-2 m-4'>{message}</Alert>}
                            {error && <Alert variant='danger' className='p-2 m-4'>{error}</Alert>}
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Please provide your email address <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={email}
                                        className='p-2'
                                        onChange={e=>setEmail(e.target.value)}>
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

export default ForgotPasswordScreen

