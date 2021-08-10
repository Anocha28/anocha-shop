import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Modal, Button, ListGroup, Spinner, Alert, Col, Image, FormCheck} from 'react-bootstrap'
import {listColors} from '../actions/colorActions'

const AddingColorModal = ({colorAdd, setColorAdd}) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    

    const colorList = useSelector(state=>state.colorList)
    const {loading, error, colors} = colorList
    
    useEffect(()=>{
        dispatch(listColors())

    },[dispatch])

    const handleCheck = (id) => {       
        if(colorAdd.indexOf(id) !== -1){
            colorAdd.splice(colorAdd.indexOf(id), 1)
        } else {
            colorAdd.push(id)
        }               
        setColorAdd([...colorAdd])
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
            <i className="bi bi-plus-lg"></i>
            </Button>

           <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add availabel color for style </Modal.Title>
            </Modal.Header>

            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 

            <Modal.Body>
                <ListGroup variant='flush'>
                {colors.map(color => (
                    <ListGroup.Item key={color.code} className='d-flex m-0 p-1'>
                    <Col>
                        <Image src={`/${color.image}`} alt={color.name} className='w-50' fluid/>
                    </Col>
                    <Col className='my-auto'>
                        {color.code}
                    </Col>
                    <Col className='my-auto'>
                        {color.name}
                    </Col>  
                    <Col className='my-auto'>
                        <FormCheck 
                        type="checkbox" 
                        label="Add" 
                        value={color._id}
                        checked={colorAdd.indexOf(color._id) !== -1 ? true : false}
                        onChange={(e)=> handleCheck(e.target.value)}
                        />
                    </Col>                  
                    </ListGroup.Item>
                ))}
                    
                </ListGroup>

            </Modal.Body>
            }

            <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClose}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default AddingColorModal
