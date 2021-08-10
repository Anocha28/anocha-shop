import React,{useState} from 'react'
import {Modal, Button} from 'react-bootstrap'


const DeleteConfirmModal = ({deleteFunction, id}) => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const handleConfirm = () => {
        deleteFunction(id)
        setShow(true);
    }

    return (
        <>
            <Button variant="outline-danger" className='p-0' style={{fontSize: '1.5rem'}} onClick={handleShow}>
            <i className="bi bi-trash px-2" style={{fontSize: '1.5rem'}}></i>
            </Button>


           <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete ?</Modal.Title>
            </Modal.Header>

            <Modal.Body className='d-flex justify-content-between'>
            <Button variant="outline-dark" className='px-5' onClick={handleClose}>
                No
            </Button>

            <Button variant="outline-danger" className='px-5' onClick={handleConfirm}>
                Yes
            </Button>
            </Modal.Body>

        </Modal>
        </>
    )
}

export default DeleteConfirmModal
