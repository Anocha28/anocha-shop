import React, {useState, useEffect} from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container, Spinner, Alert, Row, Col, Form } from 'react-bootstrap'
import Paginate from '../Components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct } from '../actions/productActions'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'

const AdminProductListScreen = ({match, history}) => {

    const pageNumber = match.params.pageNumber || 1
    const perPageList = [ 20, 50, 100]
    const [perPage, setPerPage] = useState(20)

    const [searchKeyword, setSearchKeyword] = useState('')
    
    const dispatch = useDispatch()
    const productList = useSelector(state=> state.productList)
    const {loading, error, products, pages, page} = productList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const productDelete = useSelector(state=> state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: deleteSuccess} = productDelete

    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')            
        } else {
            dispatch(listProducts('', pageNumber, perPage))
        }
        
    },[dispatch, userInfo, history, deleteSuccess, pageNumber, perPage])

    // const searchProduct = products.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(search)))
    // products.filter(product => product.code.includes(search))


    const deleteHandler = (id) => {       
        dispatch(deleteProduct(id))              
    }

    return (
        <Container>
            <Row className='align-items-center pb-3'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col>
                <Link to='/admin/products/new' className='btn btn-sm btn-dark'>
                <i className="bi bi-plus-square-dotted p-2 mt-4" ></i> Create Product
                </Link>
                </Col>

                <Col lg={2} md={2} sm={2} xs={12}>
                <Form.Control as='select' onChange={e => setPerPage(e.target.value)}>                    
                    {perPageList.map((p, index)=> (                        
                        <option 
                        key={index}
                        value={p}
                        
                        >{p} - per page</option>
                    ))}
                </Form.Control>        
                </Col>
                <Col>
                   <Form.Control 
                        type='text' 
                        placeholder='search' 
                        value={searchKeyword} 
                        onChange={e => setSearchKeyword(e.target.value)}

                        />
                </Col>
            </Row>

            
            {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
            {loadingDelete && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
            
            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>RATING</th>
                        <th>CREATED</th>
                        <th>INVENTORY</th>
                        <th>MORE/EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <tbody>                    
                        <>
                        {searchKeyword ? products.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(searchKeyword))).map(product => (
                            <tr key={product._id}>
                                <LinkContainer to={`/product/${product._id}`} >
                                    <td className='hover'>{product.code}</td>
                                </LinkContainer>
                                <LinkContainer to={`/product/${product._id}`} >                                
                                <td className='hover'>{product.name}</td>
                                </LinkContainer>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.rating}</td>
                                <td><Moment format="MM/DD">{product.createdAt}</Moment></td>
                                <td>                                    
                                    <LinkContainer to={`/admin/products/${product._id}/inventory`}>
                                        <Button 
                                        variant='outline-dark' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-plus-lg px-2" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>

                                <td>                                    
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button 
                                        variant='outline-warning' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-gear px-2" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                
                                <DeleteConfirmModal deleteFunction={deleteHandler} id={product._id} />
                                
                                </td>
                            </tr>
                        ))                        
                        : 
                        products.map(product => (
                            <tr key={product._id}>
                                <LinkContainer to={`/product/${product._id}?redirect=admin/products`} >
                                    <td className='hover'>{product.code}</td>
                                </LinkContainer>
                                <LinkContainer to={`/product/${product._id}`} >                                
                                <td className='hover'>{product.name}</td>
                                </LinkContainer>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.rating}</td>
                                <td><Moment format="MM/DD">{product.createdAt}</Moment></td>
                                <td>                                    
                                    <LinkContainer to={`/admin/products/${product._id}/inventory`}>
                                        <Button 
                                        variant='outline-dark' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-plus-lg px-2" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>

                                <td>                                    
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button 
                                        variant='outline-warning' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-gear px-2" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                
                                <DeleteConfirmModal deleteFunction={deleteHandler} id={product._id} />
                                    {/* <Button
                                    variant='danger'
                                    size='sm'
                                    className='p-0'
                                    onClick={()=> deleteHandler(product._id)}
                                    ><i className="bi bi-trash" style={{fontSize: '1.5rem'}}></i></Button>                                     */}
                                </td>
                            </tr>
                        ))}
                        </>                                           
                    </tbody>                
            </Table>
            <Row className='my-3'>
                <div className='m-auto'>
                    <Paginate pages={pages} page={page} isAdmin={true}/>
                </div>
            </Row>
            </>
            }
        </Container>
    )
}

export default AdminProductListScreen

