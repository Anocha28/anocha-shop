import React, {useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import { ListGroup } from 'react-bootstrap';

const ContactUsDetailModel = ({sender, title, content}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
            More
            </Button>

           <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
            </Modal.Header>

           

            <Modal.Body>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                <h3>Sender</h3>
                <p>{sender.name} - {sender.email}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                <h3 >Title</h3>
                <p>{title}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                <h3>Message</h3>
                <p>{content}</p>
                </ListGroup.Item>
                </ListGroup>

            </Modal.Body>
        </Modal>        
        </>
    )
}

export default ContactUsDetailModel
