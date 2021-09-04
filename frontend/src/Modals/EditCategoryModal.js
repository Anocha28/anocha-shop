import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Modal, Button, Spinner, Alert, Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCategory } from '../actions/categoryActions';
//import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants';

const EditCategoryModal = ({categoryId, categoryToEdit}) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [newCategory, setNewCategory] = useState('')

    const categoryCreate = useSelector(state=>state.categoryCreate)
    const {loading, error, success} = categoryCreate

    useEffect(()=>{
        setNewCategory(categoryToEdit)
        if(success){
            handleClose()
        }
        
    },[success, categoryToEdit])
    const handleSubmit = (e) => {       
        e.preventDefault()
        if(newCategory === ''){
            toast.error('You can not submit empty data')
            return
        }
        dispatch(updateCategory(categoryId, newCategory))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button 
                variant='light' 
                size='sm'
                className='p-0'
                onClick={handleShow}
                ><i className="bi bi-gear" style={{fontSize: '1.5rem'}}></i>            
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

export default EditCategoryModal
