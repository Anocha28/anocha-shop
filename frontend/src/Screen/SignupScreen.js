import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import {Container, Row,Col, Form, Button, Alert, Spinner} from 'react-bootstrap'
import {register} from '../actions/userActions'

const SignupScreen = ({location, history}) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    const userRegister = useSelector(state=>state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    
    const submitHandler = (e) => {
        e.preventDefault()

        if(name === '' || email === '' || password === '' || confirmPassword === '') {
            setMessage("Please fill in all the required.")
        } else if(password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            dispatch(register(name, email, password))
        }        
    }
    
        return (
            <>
            <Container className="signup">
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded shadow'>
    
                            <div className='text-center'>
                             <h2 className='my-3'>Register</h2>
                             <p className='text-center'>Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}><Button size='sm' variant='dark'>Login</Button></Link></p>
                            </div>
    
                            {message && <Alert variant='danger' className='p-2 m-4'>{message}</Alert>}
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
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
                                    <strong>Register</strong>
                                    </Button>                            
                            </Form>
                            <div className='text-center text-muted mb-3'>
                            <small>By Registering, you agree to the 
                            <Link to={"/terms"} className='px-2'>Terms</Link> and 
                            <Link to={"/policy"} className='px-2'>Privacy Policy.</Link>                            
                            </small>
                            </div>
    
                        </div>
                    </Col>
                </Row>
            </Container>      
            </>
        )
}

export default SignupScreen
