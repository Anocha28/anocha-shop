import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Container, Spinner, Alert, Table, Row, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductInventory } from '../actions/productActions'

const AdminInventoryDataScreen = () => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const productInventory = useSelector(state => state.productInventory)
    const {loading, error, products} = productInventory

    useEffect(()=> {
        dispatch(getProductInventory())
    },[dispatch])


    // const handleEdit = (productId, invId) => {
    //     console.log(productId, invId)
    // }

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
            
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>COLOR</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>TOTAL</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    products.map((product,idx) => (
                        <React.Fragment key={idx}>
                            {product.inventory.map((inv, idx)=>(
                                
                                    <tr key={idx}>
                                        <td>{product.code}</td>
                                        <td>{inv.color.code}</td>
                                        <td>
                                        {(inv.detail.filter(x => x.size === 'XS')).map(y => y.qty)}
                                        </td>
                                        <td>
                                        {(inv.detail.filter(x => x.size === 'S')).map(y => y.qty)}
                                        </td>
                                        <td>
                                        {(inv.detail.filter(x => x.size === 'M')).map(y => y.qty)}
                                        </td>
                                        <td>
                                        {(inv.detail.filter(x => x.size === 'L')).map(y => y.qty)}
                                        </td>
                                        <td>
                                        {(inv.detail.filter(x => x.size === 'XL')).map(y => y.qty)}
                                        </td>
                                        <td>
                                            {inv.detail.reduce((a,b)=> a+b.qty,0)}
                                        </td>
                                        <td className='m-0 p-0'>
                                            <LinkContainer to={`/admin/products/${product._id}/inventory`}>
                                            <Button 
                                                variant='light' 
                                                size='sm'
                                                className='m-0 p-0'
                                                // onClick={()=> handleEdit(product._id, inv._id)}
                                                ><i className="bi bi-gear m-0 p-0" style={{fontSize: '1.5rem'}}></i>
                                            </Button>
                                            </LinkContainer>
                                        </td>
                                        
                                    </tr>
                                
                            ))}
                        </React.Fragment>
                    ))
                    }
                                          
                    </tbody>                
            </Table>
            </>
            
            }
        </Container>
    )
}

export default AdminInventoryDataScreen
