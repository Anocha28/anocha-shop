import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Button, Form, Spinner, Alert, ListGroup, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {addToInventory, deleteInventoryDetail, updateToInventory} from '../actions/inventoryActions'
import { detailProduct } from '../actions/productActions'
import { INVENTORY_ADD_DEFAULT } from '../constants/inventoryConstants'


const AdminInventoryScreen = ({match, history}) => {
    const productId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const productDetail = useSelector(state=>state.productDetail)
    const {loading, error, product} = productDetail
    const addInventory = useSelector(state=>state.addInventory)
    const {loading: addLoading, error: addError, success} = addInventory
    const deleteInventory = useSelector(state=>state.deleteInventory)
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = deleteInventory
    const updateInventory = useSelector(state=>state.updateInventory)
    const {loading: updateLoading, error: updateError, success: updateSuccess} = updateInventory

    const [color, setColor] = useState('')
    const [detail, setDetail] = useState([])
    const [edit, setEdit] = useState(false)
    const [editColor, setEditColor] = useState(null)
    const [colorToEdit, setColorToEdit] = useState('')


    useEffect(()=>{
        if( !userInfo || !userInfo.isAdmin){
            history.push('/')
        } else {
           dispatch(detailProduct(productId))
        }   
        return () => {
            dispatch({type: INVENTORY_ADD_DEFAULT})
        } 
    },[userInfo, dispatch, history, productId, success, deleteSuccess, updateSuccess])

    const handleDetail = (size, qty) => {
        if(qty !== 0){
            if(detail.some(d => d.size === size)){
                var objIndex = detail.findIndex(o => o.size === size)
                detail[objIndex].qty = qty
                setDetail([...detail])
            } else {
                detail.push({"size": size, "qty": qty})
                setDetail([...detail])
            }
        } else {
            if(detail.some(d => d.size === size)){
                var objIndex1 = detail.findIndex(o => o.size === size)
                detail.splice(objIndex1, 1) 
                setDetail([...detail])
            }else {
                setDetail([...detail])
            }            
        }
    }

    const handleEdit = (d) => {
        
        setEditColor(d)
        setColor('')
        setColorToEdit(d.color._id)
        setEdit(true)
        
        d.detail.map(c => {
            detail.push({"size": c.size, "qty": c.qty})
            return setDetail([...detail])
        })         
    }

    const submitEditedInventory = (e) => {
        if(detail.length === 0){
            toast.error("You can't submit empty qty.")
            return
        }
        e.preventDefault()
        const inventoryDetail = {
            colorId: colorToEdit,
            detail: detail,
        }
        dispatch(updateToInventory(productId, inventoryDetail))
        setColor('')
        setColorToEdit('')
        setDetail([])
        setEdit(false)
        setEditColor(null)
    }

    const submitHandler = (e) => {
        
        if(detail.length === 0){
            toast.error("You can't submit empty qty.")
            return
        }
        e.preventDefault()
        const inventoryDetail = {
            colorId: color,
            detail: detail,
        }
        dispatch(addToInventory(productId, inventoryDetail))
        setColor('')
        setColorToEdit('')
        setDetail([])
        setEdit(false)
        setEditColor(null)
    }

    const deleteHandler = (productId, inventoryId) => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteInventoryDetail(productId, inventoryId))
        }        
    }

    return (
        <Container>
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

                <Link to='/admin/products' className='btn btn-sm btn-dark mb-4'> 
                <i className="bi bi-arrow-90deg-left pr-2"></i>
                Back to product list</Link>


            {loading || addLoading || updateLoading ? <Spinner animation="border" variant="dark" /> :
            error  ? <Alert variant='danger'>{error}</Alert> : 
            updateError ? <Alert variant='danger'>{updateError}</Alert> : 
            product && 
            <Container className='' >
                <Row className=''>
                    <Col lg={4} className='border border-dark'>
                        <ListGroup variant='flush'>
                        {addError && <Alert variant='danger' className='my-2'>{addError}</Alert> }
                            <ListGroup.Item>
                                <h1>Style: {product.code}</h1>
                            </ListGroup.Item>

                            {edit ?
                                <ListGroup.Item>
                                <p className='d-flex justify-content-between'>
                                    <span>Edit-{editColor.color.code}:{editColor.color.name}</span>
                                    <Button 
                                        size='sm'
                                        variant='outline-dark' 
                                        onClick={()=>{
                                            setEdit(false);
                                            setEditColor(null);
                                            setColor('');
                                            setDetail([]);
                                            }}>Back to Add</Button>
                                </p>                                
                                                              
                            </ListGroup.Item>
                            : 
                            <ListGroup.Item>
                                <h3>Choose Color</h3>                                
                                <Form.Control as='select' onChange={e => setColor(e.target.value)}> 
                                <option>Select</option>                   
                                    {product.color.map((c, index)=> (                        
                                        <option 
                                        key={index}
                                        value={c._id}
                                        
                                        >{c.code} {c.name}</option>
                                    ))}
                                </Form.Control>                                   
                            </ListGroup.Item>
                            }
                            

                            <ListGroup.Item>
                                <ListGroup variant='flush'>
                                {editColor && 
                                    editColor.detail.map((s, index)=> (
                                    <ListGroup.Item className='d-flex' key={index}>
                                    <Col lg={2} className='m-0 p-0'>
                                    <p className='mt-2 ml-3'>{s.size}</p>
                                    </Col>
                                    <Col lg={10} className='m-0 p-0'>
                                    <Form.Control
                                        
                                        type='number'
                                        min='0'
                                        className=''
                                        name={s.size}
                                        defaultValue={s.qty}
                                        //onChange={(e)=>console.log(e.target.name, e.target.value)}
                                        onBlur={e => handleDetail(e.target.name, Number(e.target.value))}
                                        style={{width: '200px'}}
                                        />
                                </Col>
                                  </ListGroup.Item>                                   
                                ))}
                                
                                {color && 
                                    product.size.map((s, index)=> (
                                    <ListGroup.Item className='d-flex' key={index}>
                                    <Col lg={2} className='m-0 p-0'>
                                    <p className='mt-2 ml-3'>{s}</p>
                                    </Col>
                                    <Col lg={10} className='m-0 p-0'>
                                    <Form.Control
                                        // autoFocus={true}
                                        type='number'
                                        min='0'
                                        className=''
                                        name={s}
                                        // onChange={e=> console.log(e.target.name, e.target.value)}
                                        onBlur={e => handleDetail(e.target.name, Number(e.target.value))}
                                        style={{width: '200px'}}
                                        />
                                </Col>
                                  </ListGroup.Item>                                   
                                ))                              
                                }
                                </ListGroup> 
                            </ListGroup.Item>

                            {color && 
                                <ListGroup.Item className=''>
                                <Button
                                variant='outline-dark'
                                className='btn-block'
                                onClick={submitHandler}
                                
                                >
                                <i className="bi bi-plus-lg mr-3"></i>
                                Add</Button>
                            </ListGroup.Item>
                            }

                            {editColor &&
                                <ListGroup.Item className=''>
                                <Button
                                variant='outline-dark'
                                className='btn-block'
                                onClick={submitEditedInventory}
                                
                                >
                                <i className="bi bi-plus-lg mr-3"></i>
                                Submit</Button>
                            </ListGroup.Item>                                
                            }
                            
                        </ListGroup>
                    </Col>

                    {deleteLoading ? <Spinner animation="border" variant="dark" /> :
                    deleteError ? <Alert variant='danger'>{deleteError}</Alert> : 
                    <Col lg={8} className='border border-dark'>
                        <ListGroup>
                            <ListGroup.Item>
                                <h1>Inventory List</h1>
                            </ListGroup.Item>
                            <ListGroup.Item> 

                            <Table striped bordered hover size='sm'>
                                    <thead>
                                        <tr>
                                            <th>Color</th>
                                            <th>Detail</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>

                            

                            <tbody>                                            
                                {product.inventory.map((detail, index)=> (
                                    <tr key={index}>
                                        <td>{detail.color.code}</td>
                                        <td className='d-flex justify-content-between'>{detail.detail.map((d,index)=> (
                                            <p key={index} className='mt-2 mb-0'>{d.size}-{d.qty}</p>
                                        ))}</td>
                                        <td>
                                        <Button 
                                            size='sm' 
                                            variant='outline-dark'
                                            onClick={()=> handleEdit(detail)}
                                            style={{fontSize: '1.4rem'}}
                                            className='p-0'
                                            ><i className="bi bi-gear px-2"></i></Button>
                                        </td>
                                        <td>
                                        <Button 
                                            size='sm' 
                                            variant='outline-danger'
                                            onClick={()=> deleteHandler(productId, detail._id )}
                                            style={{fontSize: '1.4rem'}}
                                            className='p-0'
                                            ><i className="bi bi-trash px-2"></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                                
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    }
                    
                </Row>
                
            </Container>
            


            }
        </Container>
    )
}

export default AdminInventoryScreen
