import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Spinner, Alert, Table, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductInventory } from '../actions/productActions'

const AdminInventoryListScreen = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const productInventory = useSelector(state => state.productInventory)
    const {loading, error, products} = productInventory

    useEffect(()=> {
        dispatch(getProductInventory())
    },[dispatch])


    // products.filter(product => product.code.includes(search))
    return (
        <Container>
        <Row>
        <Form.Control 
            type='text' 
            placeholder='search code' 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            style={{width: '200px'}}
            className='ml-3 my-3'
            />
        </Row>
            {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
            error ? <Alert variant='danger'>{error}</Alert> :
            <>
            
            <Table striped bordered hover responsive className='table-sm mx-0 my-2'>
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>DETAILS</th>
                        <th>TOTAL QTY</th>
                    </tr>
                    </thead>
                    <tbody>
                    {search ? products.filter(product => product.code.includes(search)).map(product => (
                            <tr key={product._id}>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                <td className='hover'>{product.code}</td>
                                </LinkContainer>
                                <td>
                                    <Table striped bordered hover responsive className='table-sm mb-0'>
                                        <tbody>
                                            {product.inventory.map((i, index)=>(
                                                <tr key={index}>
                                                    <td>{i.color.code}</td>
                                                    <td>{i.color.name}</td>
                                                    <td>
                                                        <Table striped bordered hover responsive className='table-sm mb-0'>
                                                            <thead>
                                                                <tr>
                                                                    {i.detail.map(s => (
                                                                        <th key={s._id}>{s.size}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                {i.detail.map(q => (
                                                                    <td key={q._id}>{q.qty}</td>
                                                                ))}
                                                                </tr>
                                                            </tbody>
                                                        </Table>  
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>{[...product.inventory.map(d => d.detail.reduce((a, b) => a + b.qty, 0))].reduce((a, b)=> a + b, 0)}</td>
                                
                            </tr>
                        ))
                    
                    :
                    products.map(product => (
                            <tr key={product._id}>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                <td className='hover'>{product.code}</td>
                                </LinkContainer>
                                <td>
                                    <Table striped bordered hover responsive className='table-sm mb-0'>
                                        <tbody>
                                            {product.inventory.map((i, index)=>(
                                                <tr key={index}>
                                                    <td>{i.color.code}</td>
                                                    <td>{i.color.name}</td>
                                                    <td>
                                                        <Table striped bordered hover responsive className='table-sm mb-0'>
                                                            <thead>
                                                                <tr>
                                                                    {i.detail.map(s => (
                                                                        <th key={s._id}>{s.size}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                {i.detail.map(q => (
                                                                    <td key={q._id}>{q.qty}</td>
                                                                ))}
                                                                </tr>
                                                            </tbody>
                                                        </Table>  
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>{[...product.inventory.map(d => d.detail.reduce((a, b) => a + b.qty, 0))].reduce((a, b)=> a + b, 0)}</td>
                            </tr>
                        ))
                    }
                                          
                    </tbody>                
            </Table>
            </>
            
            }
        </Container>
    )
}

export default AdminInventoryListScreen
