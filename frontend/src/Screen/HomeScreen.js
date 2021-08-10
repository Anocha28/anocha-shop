import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Spinner, Alert} from 'react-bootstrap'
// import {CarouselScreenTop} from '../Components/CarouselScreen'
// import LatestPrductsScreen from './LatestPrductsScreen'
import PaymentMethods from '../Components/PaymentMethods'
import ProductListScreen from './ProductListScreen'
import Paginate from '../Components/Paginate'
import Meta from '../Components/Meta'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({match}) => {
    const dispatch = useDispatch()

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const productList = useSelector(state=> state.productList)
    const {loading, products, error, page, pages} = productList

    // const productTopRated = useSelector(state=> state.productTopRated)
    // const {loading: topLoading, error: topError, products: topProducts} = productTopRated

    useEffect(()=>{
        // dispatch((listTopProducts()))
        dispatch(listProducts(keyword, pageNumber, ''))
    },[dispatch, keyword, pageNumber])

    return (

        <>
        <Meta />
        {!keyword ? 
        <>
            <div className='d-none d-sm-block'>
            <div style={{
                width: '100%', 
                height: '700px', 
                backgroundImage: `url('/clark.jpg')`,
                backgroundSize: 'cover',
                position: 'relative',
                }}            
                >
                <div style={{
                    position: 'absolute', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    marginLeft: '200px', 
                    marginTop: '150px'}}>
                    <div className='m-0' style={{
                        color: '#F9F9F9', 
                        fontFamily: `Abril Fatface, cursive`,                        
                        fontSize: '2rem'}}>
                        You can have anything you want in life if you dress for it. —Edith Head
                    </div>
                    <Link to='/shopnow' className='btn btn-outline-light my-3 ml-2'>Shop now</Link>
                </div>            
            </div>

            {/* --------------------------------------------------------------------------------- */}

            {/* <div
            style={{
                width: '100%', 
                height: '400px', 
                marginTop: '50px',
                position: 'relative',
                }}>

                <h2 className='text-center mb-5'>Lates Products</h2>
                <LatestPrductsScreen />

            </div> */}


            {/* --------------------------------------------------------------------------------- */}

            {/* <div style={{position: 'relative', marginBottom: '100px'}} >
            <video autoPlay='autoplay' muted loop='loop' id='myVideo' >
                <source src="/production.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>

            <div className="content">
            <h1>Heading</h1>
            <p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.</p>
            <Button variant='outline-light'>Category</Button>
            </div>
            </div> */}
            
            {/* <Container className='py-2 border-bottom'>
            {topLoading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
            topError ? <Alert variant='danger'>{topError}</Alert> :
                <><Row>
                    <Col md={3} lg={3} className=''>
                        <h4>Top rated</h4>
                        <CarouselScreenTop products = {topProducts}/>
                    </Col>
                    <Col lg={9} md={9} sm={9} xs={12} >
                        <div>
                        <video autoPlay='autoplay' muted loop='loop' className='w-100' >
                        <source src="/sewing.mp4" type="video/mp4" />
                        Your browser does not support HTML5 video.
                        </video>                        
                        </div>
                    </Col>
                </Row></>            
            }
            </Container> */}
            </div>

            {/* --------------------------------------------------------------------------------- */}
        </>
        :
        <Container className='my-3'>
            <Link to='/' className='btn btn-outline-dark'>Go Back</Link>
        </Container>
        }
        


        <Container>     
            <div className='pt-4'>
            {/* <Row className='text-center'>
                <Col className='py-3'>
                    <Button variant='outline-dark' size='lg'><i className="fab fa-app-store-ios px-2" ></i><small>App Store</small></Button>
                    <Button variant='outline-dark' size='lg'><i className="fab fa-google-play px-2"></i><small>Google Play</small></Button>
                </Col>
            </Row> */}


            {loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> : 
            error ? <Alert variant='danger'>{error}</Alert> : (
            <>
            {keyword ? <h4 className='text-center'>Search Result</h4> : <h3 className='text-center my-4'>Season drop</h3>}
            <Row>            
                {products.map(p=>(
                    <Col key={p._id} lg={2} md={3} sm={4} xs={4} className='p-1 '>
                    <ProductListScreen product={p} />
                </Col>
                ))}
            </Row> 
            <Row className='mt-5'>
                <div className='m-auto'>
                    <Paginate className='' pages = {pages} page={page} keyword={keyword ? keyword : ''}/>
                </div>
            </Row>
            
            </>      
            )}
            </div>
        
        <PaymentMethods />
        </Container>
        </>
    )
}

export default HomeScreen
