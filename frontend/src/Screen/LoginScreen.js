import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Row,Col, Form, Button, Spinner} from 'react-bootstrap'
import { login } from '../actions/userActions'


const LoginScreen = ({location, history}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'
  

    useEffect (()=>{
        if(userInfo) {
            history.push(redirect)
        }
        error && toast.error(error)
    }, [history, error, userInfo, redirect])

    const submitHandler = (e) => {        
        e.preventDefault()
        if(email === '' || password === '') {
            toast.error('Please fill in all the required.')
        } else {            
            dispatch(login(email, password))            
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
                            <h2 className='my-3'>Login</h2>
                            </div>
                            
                            
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
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
                                    <Form.Label className='d-flex justify-content-between m-auto'>
                                        <p>Password <small className='text-muted'>(required)</small></p>
                                        <p><Link to={"/forgotpassword"} style={{ color: '#343a40' }}>Forgot Password?</Link></p>
                                    </Form.Label>
                                    
                                    <Form.Control
                                        type='password'
                                        value={password}
                                        className='p-2'
                                        onChange={e=>setPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                    <Button
                                    block
                                    type='submit'
                                    variant='dark'
                                    >
                                    <strong>Login</strong>
                                    </Button>                            
                            </Form>
                            <p className='text-center'>Don't have an account? 
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    <Button size='sm' variant='dark'>Join</Button>
                                </Link>
                            </p>

                        </div>
                    </Col>
                </Row>
            </Container>      
            </>
        )
}

export default LoginScreen
