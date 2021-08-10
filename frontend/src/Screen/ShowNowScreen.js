import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Container, Row, Col, Spinner, Alert} from 'react-bootstrap'
import ProductListScreen from './ProductListScreen'
import { getProductShopNow } from '../actions/productActions'

const ShopNowScreen = () => {
    const dispatch = useDispatch()

    const productShopNow = useSelector(state=> state.productShopNow)
    const {loading, products, error} = productShopNow


    useEffect(()=>{
        dispatch(getProductShopNow())
    },[dispatch])

    return (

        <>  
        <Container>     
            <div className='pt-4'>
           
            {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> : 
            error ? <Alert variant='danger'>{error}</Alert> : (
            <>
            <h4 className='text-center'>Season drop</h4>
            <Row>            
                {products.map(p=>(
                    <Col key={p._id} lg={2} md={3} sm={4} xs={4} className='p-1 '>
                    <ProductListScreen product={p} />
                </Col>
                ))}
            </Row>             
            
            </>      
            )}
            </div>

        </Container>
        </>
    )
}

export default ShopNowScreen
