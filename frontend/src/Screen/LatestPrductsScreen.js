import React,{useEffect} from 'react'
import { Spinner, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getProductShopNow } from '../actions/productActions'

const LatestPrductsScreen = () => {

    const dispatch = useDispatch()

    const productShopNow = useSelector(state=> state.productShopNow)
    const {loading, products, error} = productShopNow

    useEffect(()=>{
        dispatch(getProductShopNow())
    },[dispatch])

    return (
        <>
        {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
        error ? <Alert variant='danger'>{error}</Alert> : (
        
        <div className='d-flex my-2 overflow-hidden hover'>  
        {products.map(p => (
            
            <div style={{
                position: 'relative',
                width: '200px', 
                height: '200px', 
                }}
            key={p._id}
            className='mx-1 ' 
                > 
            
            <img src={p.images[0]} alt='testImg' style={{width: '200px', height: '200px', objectFit: 'cover'}} />
            
                    <div style={{
                        position: 'absolute', 
                        width: '100%',
                        bottom: '5px', 
                        background: '#FDF6F0',
                        opacity: '0.5',
                        }}>
                    <LinkContainer to={`/product/${p._id}`}>
                    <p style={{
                        color: 'black',
                    }}
                    className='text-nowrap overflow-hidden'
                    >{p.name}</p>  
                    </LinkContainer>                  
                    </div>
            </div> 
            
        ))}    
        </div>
        )
        }        
        </>
    )
}

export default LatestPrductsScreen
