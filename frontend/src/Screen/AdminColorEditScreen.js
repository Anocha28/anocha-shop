import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Form, Row, Col, Button, Image, Alert, Spinner, Container} from 'react-bootstrap'
import { getColor, updateColor } from '../actions/colorActions'
import { COLOR_UPDATE_DEFAULT, COLOR_DETAIL_DEFAULT } from '../constants/colorContants'

const AdminColorEditScreen = ({match, history}) => {
    const dispatch = useDispatch()
    
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [warning, setWarning] = useState(null)

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const colorDetail = useSelector(state=>state.colorDetail)
    const {loading, error, color} = colorDetail  

    const colorUpdate = useSelector(state=>state.colorUpdate)
    const {loading: updateLoading, error: updateError, success} = colorUpdate 
    
    useEffect(()=>{
        if(success) {
            dispatch({type: COLOR_UPDATE_DEFAULT})
            dispatch({type: COLOR_DETAIL_DEFAULT})
            history.push('/admin/colors')
        } else {
            if(!userInfo || !userInfo.isAdmin){
                history.push('/login')            
            } else {
                if(!color.code || color._id !== match.params.id) {
                    dispatch(getColor(match.params.id))
                } else {
                    setCode(color.code)
                    setName(color.name)
                    setImage(color.image)  
                }                     
            }
        }
       
    },[dispatch, match.params.id, history, userInfo, color, success])


    const submitHandler = (e) => {
        e.preventDefault()     
        if(code === '' || name === '') {
            setWarning("Please complete the required")
        } else {
            if(newImage) {
                const data = new FormData()
                data.append('code', code)
                data.append('name', name)
                data.append('files', newImage)                
                dispatch(updateColor(match.params.id, data))
                setWarning(null)
            } else {
                const data = new FormData()
                data.append('code', code)
                data.append('name', name)
                data.append('image', image)
                dispatch(updateColor(match.params.id, data))
                setWarning(null)
            }
        }
    }


    return (
        <Container>
            <div className='mb-3 pb-5'>
                <h3 className='pr-3 mt-2'>Edit color</h3>
                <Link to='/admin/colors' className='btn btn-sm btn-dark'> 
                <i className="bi bi-arrow-90deg-left pr-2"></i>
                Back to color list</Link>
            </div> 

            {updateLoading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
            {updateError && <Alert variant='danger'>{updateError}</Alert>}
            {warning && <Alert variant='danger'>{warning}</Alert>}
            {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div>
            : error ? <Alert variant='danger'>{error}</Alert>
            : (
            <Form onSubmit={submitHandler} autoComplete='off' noValidate> 
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
                Images 
                </Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        type='file'
                        name="image"
                        accept='.jpg,.jpeg,.png'
                        onChange={e => setNewImage(e.target.files[0])}
                        />
                    </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={2}>Preview</Form.Label>
                <Col sm={10}>
                    <div style={{width: '100px'}}>
                    {newImage ? <><Image src={URL.createObjectURL(newImage)} /> 
                    <Button 
                    size='sm'
                    variant='outline-dark'
                    className=' ml-4'
                    onClick={()=> {setNewImage(''); setImage(color.image)}}
                    ><i className="bi bi-trash"></i></Button>
                    </>
                    :
                    <Image src={`/${color.image}`} alt={color.name} fluid/>
                    }
                    </div>
                </Col>
            </Form.Group>


            <Form.Group as={Row} className="mt-5">
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" variant='dark'><i className="bi bi-save2 pr-2"></i>Update</Button>
                </Col>
            </Form.Group>
            </Form>
            )
            }   
        </Container>
    )
}

export default AdminColorEditScreen
