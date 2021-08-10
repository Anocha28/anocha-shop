import React, {useState} from 'react'
import {Modal, Button, ListGroup, FormControl, Col} from 'react-bootstrap'


const AddingInventoryModal = ({color, size}) => {
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
        <Button 
            size='' 
            variant="outline-dark" 
            onClick={handleShow}
            className=''
            >
        <i className="bi bi-plus-lg"></i>
        </Button>

        <Modal show={show} size='lg' onHide={handleClose} dialogClassName="modal-90w" centered>
            <Modal.Header closeButton>
            <Modal.Title>Add Inventory to product</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ListGroup>
                    {color && color.map(item=>(
                        <ListGroup.Item key={item.code} >
                            <Col className='d-inline'>
                                {item.code}
                            </Col>
                            <Col className='d-inline'>
                                {item.name}
                            </Col>
                            <Col className='d-inline'>
                                {size.map((size, index)=>(
                                    <div className='d-inline' key={index}>
                                       {size}
                                        <FormControl
                                        type='number'
                                        min='0'
                                        className='d-inline mr-3'
                                        style={{width: '75px'}}
                                        />
                                    </div>
                                ))}
                            </Col>
                        </ListGroup.Item>
                    ))}
                </ListGroup>                
            </Modal.Body>
            

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        
    </>
    )
}

export default AddingInventoryModal
