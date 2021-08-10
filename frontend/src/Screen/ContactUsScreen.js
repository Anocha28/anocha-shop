import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row,Col, Form, Button, Alert, Spinner} from 'react-bootstrap'
import {contact} from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import {USER_CONTACTUS_RESET} from '../constants/userConstants'
import { Link } from 'react-router-dom'


const ContactUsScreen = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [warning, setWarning] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const userContactUs = useSelector(state => state.userContactUs)
    const {loading: loadingContact, error: errorContact, success} = userContactUs

    useEffect (()=>{
        if(!userInfo) {
            setMessage('Please login or create an account first.')
        }
        if(success){
            setSuccessMessage('Your message submitted successfully. ')
            setMessage('')
            setTitle('')
            setContent('')
            setWarning('')
        }
        return() => {
            dispatch({type: USER_CONTACTUS_RESET})
        }
    }, [ userInfo, success, dispatch])

    const submitHandler = (e) => {
        
        e.preventDefault()
        if(title === '' || content === '') {
            setWarning("Please fill in all the required.")
        } else {
            setMessage('')
            setWarning('')
            const contactData = {
                title,
                content,
            }
            dispatch(contact(contactData))
            
        }
    }

        return (
            <>
            <Container className="login">
                <Row className="h-100">
                    <Col sm={12} md={8} lg={6} className="m-auto">
                        <div className='mx-auto border rounded'>

                            <div className='text-center'>
                            <h2 className='my-3'>Contact Us</h2>
                            </div>

                            {message ? 
                            <>
                            <Alert variant='warning' className='p-2 m-3'>{message}</Alert> 
                            <LinkContainer to='/login?redirect=contact' className='m-3 '>
                                <Button variant='dark'>Login</Button> 
                            </LinkContainer>
                            </>
                            :
                            error ? <Alert variant='danger' className='p-2 m-4'>There is an error. {error}</Alert> :
                            errorContact ? <Alert variant='danger' className='p-2 m-4'>There is an error. {errorContact}</Alert> :
                            loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
                            loadingContact ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
                            <>
                            {warning && <Alert variant='warning' className='p-2 m-4'>{warning}</Alert> }
                            {successMessage && <Alert variant='info' className='p-2 m-4'>{successMessage}
                            Go back to<Link to='/'> Home</Link>
                            </Alert>}
                            <Form  className='p-4' onSubmit={submitHandler} autoComplete='off' noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label className=''>
                                        Title <small className='text-muted'>(required)</small>
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={title}
                                        placeholder='Please write a short note.'
                                        className='p-2'
                                        onChange={e=>setTitle(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className=''>
                                        Message <small className='text-muted'>(required)</small>
                                    </Form.Label>                                
                                    <Form.Control
                                        as='textarea'
                                        rows={5}
                                        placeholder='What do you want us to know?'
                                        value={content}
                                        className='p-2'
                                        onChange={e=>setContent(e.target.value)}>
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
                            </>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>      
            </>
        )
}

export default ContactUsScreen
