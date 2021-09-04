import React, {useState, useEffect} from 'react'
import Moment from 'react-moment'
import Meta from '../Components/Meta'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Spinner, Image,
    Button, ButtonGroup, Alert, ToggleButton, Form, Container} from 'react-bootstrap'

import Rating from '../Components/Rating'
import {CarouselScreen} from '../Components/CarouselScreen'
import {detailProduct, createProductReview, deleteReview} from '../actions/productActions'
import {addToCart} from '../actions/cartActions'
import {PRODUCT_DETAIL_CLEAR} from '../constants/productConstants'
import { PRODUCT_CREATE_REVIEW_DEFAULT } from '../constants/productConstants'
// import { LinkContainer } from 'react-router-bootstrap'

const ProductScreen = ({match}) => {
    const productId = match.params.id
    const dispatch = useDispatch()
    
    const [qty, setQty] = useState(1)
    const [select, setSelect] = useState(null)
    const [sizeSelect, setSizeSelect] = useState('')
    const [inventory, setInventory] = useState(null)
    const [addToCartAlert, setAddToCartAlert] = useState(false)
    const [warning, setWarning] = useState(null)
    const [itemExistWarning, setItemExistWarning] = useState(false)
    //const [sizeList, setSizeList] = useState([])
    const [stockQty, setStockQty] = useState(1)

    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState('')
    const [reviewWarning, setReviewWarning] = useState(null)

   
    const productDetail = useSelector(state => state.productDetail)
    const {loading, error, product} = productDetail

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {loading: loadingReview, error: errorReview, success} = productCreateReview

    const productDeleteReview = useSelector(state => state.productDeleteReview)
    const {loading: loadingDeleteReview, error: errorDeleteReview, success: successDeleteReveiw} = productDeleteReview

    //const colorList = product.inventory.map(c => { return {'code': c.color.code, 'name': c.color.name, 'image': c.color.image}})
    //const inventoryList = [...new Map(colorList.map(item => [item['code'], item])).values()]
    //const finalColors = [...new Set(colorList)]
    //console.log(inventoryList)


    const cart = useSelector(state=> state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(success){
            setReviewWarning('Review submitted.')
            setRate(0)
            setComment('')
        }
        dispatch(detailProduct(match.params.id))
        
        return () => {
            dispatch({type: PRODUCT_DETAIL_CLEAR})
            dispatch({type: PRODUCT_CREATE_REVIEW_DEFAULT})
            setReviewWarning(null)
        }
    },[dispatch, match, success, successDeleteReveiw])


    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    
    const sizeListHandler = (inv) => {    
          
        setInventory(inv)
        setQty(1)
        setStockQty(1)
        setSizeSelect('')
        //setSizeList(product.inventory.filter(item => item.color.code === color.code).map(item => { return {'size': item.detail.size, 'qty': item.detail.qty}}))
        //console.log(color)
    }

    const sizeSelectHandler = (qty, e) => {
        setStockQty(qty)
        setSizeSelect(e.currentTarget.value)
        setQty(1)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(comment === '') {
            setReviewWarning('Please write something about the product before submit.')
        } else {
            dispatch(createProductReview(match.params.id, {
                rate, comment
            }))
            setReviewWarning(null)
        }
        
    }

    
        
    
        // console.log([...product.inventory.map(d => d.detail.reduce((a, b) => a + b.qty, 0))].reduce((a, b)=> a + b, 0))
        // console.log(data)
        // Number(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    

    const addToCardHandler = () => {
        const productToAdd = {
            productId: product._id,
            inventory: inventory,
            size: sizeSelect,
            qty: qty

        }
        const isEmpty = Object.values(productToAdd).some(x => x === null || x === '')
        const itemExist = cartItems.find(x => x.productId === productToAdd.productId && x.inventory.code === productToAdd.inventory.code && x.size === productToAdd.size)

        if(isEmpty){
            setWarning('Please, select color and size.')
        } else if (itemExist) {
            setWarning(null)
            setAddToCartAlert(false)
            setItemExistWarning(true)        
        } else {
            setWarning(null)
            setItemExistWarning(false)  
            dispatch(addToCart(product._id, inventory, sizeSelect, qty))
            setAddToCartAlert(true)
        }  
    }

    const handleDeleteReview = (id) => {
        dispatch(deleteReview(productId, id))
    }
    return (
        <>        
        <Container>
            {/* <LinkContainer to='/'>
            <div  className='btn btn-sm btn-dark'><i className="bi bi-chevron-left"></i> Back</div>
            </LinkContainer> */}
        {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> : 
            error ? <Alert variant='danger'>{error}</Alert> : product && (            
            <>
            <Meta title={product.name} />
            <Row className='py-3'>
                <Col xs={6} sm={6} md={6} lg={6}>
                    <CarouselScreen 
                        pictures={product.images}
                        thumbs={true}
                        play={false}
                        loop={false}
                        interval={null}

                    />
                </Col>

            <Col xs={6} sm={6} md={6} lg={6}>
                <ListGroup variant='flush'>
                    
                    <div className='alert1'>
                    {itemExistWarning && <Alert variant='secondary'>This item is already in cart.</Alert>}
                    {warning && <Alert variant='danger'>{warning}</Alert>}
                    {addToCartAlert && <Alert variant='success'>Successfully added to cart. <Link to='/cart'>Go to cart.</Link></Alert>}
                    </div>

                    <ListGroup.Item className='py-2'>
                        <Row className=''>
                            <Col sm={12} md={12} lg={8} className=''>
                                <h4>{product.name}</h4>
                            </Col>
                            <Col sm={12} md={12} lg={4}>                                
                                <h4>$ {addDecimals(product.price)}</h4>                                
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item className='d-flex justify-content-between'> 
                        <div className='pl-3'>
                        <Row><Rating value={product.rating} /></Row>
                        <Row><p className='pt-1'>{product.numReviews} reviews</p></Row>
                            
                        </div>

                        <div>
                        
                        {[...product.inventory.map(d => d.detail.reduce((a, b) => a + b.qty, 0))].reduce((a, b)=> a + b, 0)
                        
                        === 0 &&
                        <h5 className='badge badge-danger p-2 m-0'>Sold Out</h5>}
                        </div>
                    </ListGroup.Item>


                    <ListGroup.Item className='py-2'>
                    <div className='pb-2'><h4>Description</h4></div>
                        <p>{product.description}</p>
                    </ListGroup.Item>

                    <ListGroup.Item className='py-2'>
                        <div className='ml-3'>
                            <Row className='py-3'> 
                                <h5>Colors</h5> 
                            </Row>
                            
                            <Row>
                            {product.inventory.map((i, index)=>(
                                <Col lg={1} md={2} sm={2} xs={2} key={index} className='m-1 p-0 colorPictures'>                            
                                <Image  
                                    src={`/${i.color.image}`} 
                                    alt="colors" 
                                    onClick={()=> {setSelect(index); sizeListHandler(i)}}
                                    className={index === select ? 'colorSelect' : ''}
                                    roundedCircle 
                                    fluid 

                                    />                            
                                </Col>
                            ))}
                            </Row>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <Row className='py-3'>
                        <Col sm={12} md={12} lg={8} className='py-1'>   
                            <h5>Size</h5>  

                            {inventory && (
                                <ButtonGroup toggle>
                                {inventory.detail.map((item, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    variant='outline-secondary'
                                    name="size"
                                    value={item.size}
                                    checked={sizeSelect === item.size}
                                    onChange={(e) => {sizeSelectHandler(item.qty, e)}}
                                >
                                    {item.size}
                                </ToggleButton>
                                ))}
                            </ButtonGroup>
                            )}                   
                            
                        </Col>

                        

                        <Col sm={8} md={6} lg={4} className='py-1'>
                            <h5>Qty</h5>

                            {stockQty === 0 ? <Button disabled variant='danger'>Out of Stock</Button> : (
                                <ButtonGroup>
                                <Button 
                                    disabled={qty === 1}
                                    variant='outline-secondary' 
                                    onClick={()=>setQty(qty-1)}>
                                    <i className="bi bi-dash-lg"></i>
                                </Button>

                                <Button 
                                    disabled 
                                    variant='outline-secondary'>
                                    <strong className='px-4'>{qty}</strong>
                                </Button>

                                <Button 
                                    disabled={stockQty <= qty} 
                                    variant='outline-secondary' 
                                    onClick={()=>setQty(qty+1)}>
                                    <i className="bi bi-plus-lg"></i>
                                </Button>
                                
                                </ButtonGroup>
                            )}
                            
                        </Col>
                    </Row>                                      
                    </ListGroup.Item>


                    <ListGroup.Item className='py-5'>
                        <Button
                        disabled = {stockQty === 0}
                        onClick={addToCardHandler}
                        variant='dark'
                        className='btn-block py-2'
                        type='button'
                        >
                            Add to cart
                        </Button>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className='d-grid'>
                        <h3>Make a review</h3>
                        {errorReview && <Alert variant='danger'>{errorReview}</Alert>}
                        {reviewWarning && <Alert variant='warning'>{reviewWarning}</Alert>}
                        {loadingReview && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                        {userInfo ? (
                            <Form onSubmit = {submitHandler}>
                                <Form.Group controlId='rate'>
                                <div  className='my-2'>
                                    <Form.Label className='mr-3'>Rating</Form.Label>
                                    <i onClick={e => setRate(1)} className={`hover ${rate >= 1 ? "bi bi-star-fill" :  "bi bi-star"}`} style={{color: '#FFC107'}}></i>
                                    <i onClick={e => setRate(2)} className={`hover ${rate >= 2 ? "bi bi-star-fill" :  "bi bi-star"}`} style={{color: '#FFC107'}}></i>
                                    <i onClick={e => setRate(3)} className={`hover ${rate >= 3 ? "bi bi-star-fill" :  "bi bi-star"}`} style={{color: '#FFC107'}}></i>
                                    <i onClick={e => setRate(4)} className={`hover ${rate >= 4 ? "bi bi-star-fill" :  "bi bi-star"}`} style={{color: '#FFC107'}}></i>
                                    <i onClick={e => setRate(5)} className={`hover ${rate >= 5 ? "bi bi-star-fill" :  "bi bi-star"}`} style={{color: '#FFC107'}}></i>
                                </div>
                                    <Form.Control 
                                        as='textarea'
                                        rows={4}
                                        placeholder='Your comment'
                                        value={comment}
                                        onChange={(e)=>setComment(e.target.value)}
                                        className='mb-3' />
                                    
                                    <Button className='mr-auto' type='submit' variant='outline-dark'>Submit</Button>
                                </Form.Group>
                            </Form>
                        ) : 
                            <Alert variant='light'>Please login to write a review.</Alert>
                        }  
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>

        <Row className='border-top'>
            <Col md={6} >
            {loadingDeleteReview && <div className='text-center'><Spinner animation="border" variant="secondary" /></div> }
            {errorDeleteReview && <Alert variant='warning'>{errorDeleteReview}</Alert>}
            <h2 className='my-3'>Product reviews</h2>
                {product.reviews.length === 0 && <Alert variant='info'>No reviews</Alert>}
                <ListGroup variant='flush' >
                    {product.reviews.map( r => (
                        <ListGroup.Item key={r._id} className='m-0 p-2'>
                            <div className='d-flex justify-content-between'>
                            <span>
                            <strong className='mr-3'>{r.name}</strong>
                            <Rating value={r.rating} />
                            </span>
                            <span className='ml-auto'>
                            {userInfo._id === r.user &&
                                <Button 
                                    size="sm"
                                    variant='dark'
                                    className='m-0 py-0 px-1'
                                    onClick={()=>handleDeleteReview(r._id)}
                                    ><i className="bi bi-x-square m-0 p-0"></i>
                                </Button>
                            }
                            </span>
                            </div>
                            <p><small><Moment format="DD MMM YY">{r.createAt}</Moment></small></p>
                            <p>{r.comment}</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
        </>
        ) 
    }        
    </Container>
    </>
    )
}

export default ProductScreen
