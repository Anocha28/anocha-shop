import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Form, Row, Col, Button, Image, Alert, Spinner, Container} from 'react-bootstrap'
import { createColor } from '../actions/colorActions'
import {COLOR_CREATE_DEFAULT} from '../constants/colorContants'


const AdminCreateColorScreen = ({history}) => {

    const colorCreate = useSelector(state=>state.colorCreate)
    const {loading, error, success} = colorCreate

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [warning, setWarning] = useState(null)
    const [created, setCreated] = useState('')

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')            
        }
        if(success) {
            setCode('')
            setName('')
            setImage('')
            setWarning(null)
            setCreated('Successfully created.')
        }
        return () => {        
            dispatch({type: COLOR_CREATE_DEFAULT})
        }
    },[dispatch, history, userInfo, success])

    const submitHandler = (e) => {
        e.preventDefault()     
        const newColor = {
            code,
            name,
            image,
        }
        const isEmpty = Object.values(newColor).some(x => x === null || x === '')        
        if(isEmpty) {
            setWarning('Please complete required fields.')
            return
        }
        const data = new FormData()
        data.append('code', code)
        data.append('name', name)
        data.append('files', image)
        
        dispatch(createColor(data))
        setWarning(null)
           
    }
    return (
        <Container>
            <div className='mb-3 pb-5'>
                <h3 className='pr-3 mt-2'>Create new color</h3>
                <Link to='/admin/colors' className='btn btn-sm btn-dark'> 
                <i className="bi bi-arrow-90deg-left pr-2"></i>
                Back to color list</Link>
            </div> 

            <Form onSubmit={submitHandler} autoComplete='off' noValidate>    

            {error && <Alert variant='danger'>{error}</Alert>}
            {warning && <Alert variant='danger'>{warning}</Alert>}
            {created && <Alert variant='info'>{created}</Alert>}
            
            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}             
            <Form.Group as={Row} className="mb-3 pb-3">
                <Form.Label column sm={2}>
                Code <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                    type="number" 
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    placeholder="Code" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 pb-3">
                <Form.Label column sm={2}>
                Name <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                    type="text" 
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    placeholder="Name" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Images <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        type='file'
                        name="image"
                        accept='.jpg,.jpeg,.png'
                        onChange={e => setImage(e.target.files[0])}
                        />
                    </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>Preview</Form.Label>
                <Col sm={10}>
                    {image && <><Image src={URL.createObjectURL(image)} style={{width: '100px', height: '100px'}} /> 
                    <Button 
                    size='sm'
                    variant='outline-dark'
                    className=' ml-4'
                    onClick={()=>setImage('')}
                    ><i className="bi bi-trash"></i></Button>
                    </>}
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mt-5">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" variant='dark'><i className="bi bi-save2 pr-2"></i>Save</Button>
                </Col>
            </Form.Group>
            </Form>
        </Container>
    )
}


export default AdminCreateColorScreen
