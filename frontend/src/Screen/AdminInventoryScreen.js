import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Form, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {addToInventory} from '../actions/inventoryActions'
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

    const [color, setColor] = useState('')
    const [detail, setDetail] = useState([])



    useEffect(()=>{
        if( !userInfo || !userInfo.isAdmin){
            history.push('/')
        } else {
           dispatch(detailProduct(productId))
        }   
        return () => {
            dispatch({type: INVENTORY_ADD_DEFAULT})
        } 
    },[userInfo, dispatch, history, productId, success])

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

    const submitHandler = () => {
        const inventoryDetail = {
            colorId: color,
            detail: detail,
        }
        dispatch(addToInventory(productId, inventoryDetail))
    }

    return (
        <Container>

                <Link to='/admin/products' className='btn btn-sm btn-dark mb-4'> 
                <i className="bi bi-arrow-90deg-left pr-2"></i>
                Back to product list</Link>


            {loading || addLoading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 
            product && 
            <Container className='' >
                <Row className=''>
                    <Col lg={6} className='border border-dark'>
                        <ListGroup variant='flush'>
                        {addError && <Alert variant='danger' className='my-2'>{addError}</Alert> }
                            <ListGroup.Item>
                                <h1>Style: {product.code}</h1>
                            </ListGroup.Item>
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

                            <ListGroup.Item>
                                <ListGroup variant='flush'>
                                {color && product.size.map((s, index)=> (
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

                                   
                                ))}
                                </ListGroup> 
                            </ListGroup.Item>

                            <ListGroup.Item className=''>
                                <Button
                                variant='outline-dark'
                                className='btn-block'
                                onClick={submitHandler}
                                disabled={!color}
                                >
                                <i className="bi bi-plus-lg mr-3"></i>
                                Add</Button>
                            </ListGroup.Item>
                        </ListGroup>

                        
                        
                        
                    </Col>
                    <Col lg={6} className='border border-dark'>
                        <ListGroup>
                            <ListGroup.Item>
                                <h1>Inventory List</h1>
                            </ListGroup.Item>
                            <ListGroup.Item> 
                                {product.inventory.map(d=>(
                                    <p key={d._id}>{d.color.code} - {d.detail.map((a, idx)=>(<span className='mr-2' key={idx}>{a.size}:{a.qty}</span>))}</p>
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                
            </Container>
            


            }
        </Container>
    )
}

export default AdminInventoryScreen
