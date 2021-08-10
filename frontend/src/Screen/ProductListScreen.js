import React from 'react'
import { Card } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import Rating from '../Components/Rating'

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

const ProductListScreen = ({product}) => {
    return (
        <Card className='p-0' style={{padding: '5px'}}>
            <Link to={`/product/${product._id}`}>
            <Card.Img src={`/${product.images[0]}`} variant='top' style={{ height : '200px', objectFit: 'cover'}} />
            </Link>
            <Card.Body className='' style={{padding: '5px'}}>

                <LinkContainer to={`/product/${product._id}`} className='m-0 p-0'>
                <Card.Text className='m-0 p-0 text-nowrap overflow-hidden'><small>{product.name}</small></Card.Text>
                </LinkContainer>

                <Card.Text className='m-0 p-0'>  
                    ${addDecimals(product.price)}                                   
                </Card.Text>

                <Card.Text className='mb-1'>
                <small>{product.color.length} colors</small>
                </Card.Text>
                <Card.Text style={{marginTop: '5px'}}>
                <small>
                    <Rating value={product.rating} />
                    <small className='ml-2'>{product.numReviews} <span className=''>reviews</span></small>
                </small>
                </Card.Text>          
            </Card.Body>
            
        </Card>
    )
}

export default ProductListScreen
