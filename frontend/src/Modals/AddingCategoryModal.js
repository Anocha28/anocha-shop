import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Button, Spinner, Alert, Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory } from '../actions/categoryActions';
//import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants';

const AddingCategoryModal = () => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState('')

    const categoryCreate = useSelector(state=>state.categoryCreate)
    const {loading, error, success} = categoryCreate

    useEffect(()=>{
        setNewCategory('')
        if(success){
            handleClose()
        }
        
    },[success])
    const handleSubmit = (e) => {       
        e.preventDefault()
        if(newCategory === ''){
            toast.error('You can not submit empty data')
            return
        }
        dispatch(createCategory(newCategory))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button 
                variant='outline-dark'
                size='sm'
                className='my-3' 
                onClick={handleShow}>
            Add new category
            </Button>

           <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add new category </Modal.Title>
            </Modal.Header>

            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div> }
            { error && <Alert variant='danger'>{error}</Alert> }

            <Modal.Body>
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
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Category name</Form.Label>
                    <Form.Control 
                        type="text"  
                        value={newCategory}
                        onChange={(e)=>{setNewCategory(e.target.value)}}
                        />
                </Form.Group>
                
                <Button 
                    variant="outline-dark" 
                    type="submit"
                    onClick={handleSubmit}
                    >
                    Submit
                </Button>
                </Form>

            </Modal.Body>
            

            {/* <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClose}>
                Add
            </Button>
            </Modal.Footer> */}
        </Modal>
        
        </>
    )
}

export default AddingCategoryModal
