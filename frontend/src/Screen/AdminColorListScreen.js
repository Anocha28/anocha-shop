import React, { useEffect} from 'react'
import Moment from 'react-moment'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Spinner, Alert, Row, Col, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listColors, deleteColor } from '../actions/colorActions'

const AdminColorListScreen = ({history}) => {

    const dispatch = useDispatch()

    const colorList = useSelector(state=> state.colorList)
    const {loading, error, colors} = colorList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    
    const colorDelete = useSelector(state=>state.colorDelete)
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = colorDelete


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')            
        } else {
            dispatch(listColors())
        }
        
    },[dispatch, deleteSuccess, userInfo, history])

    const deleteHandler = (id) => {
            dispatch(deleteColor(id))
    }

    return (
        <Container>
            <Row className='align-items-center pb-3'>
                <Col>
                    <h1>Colors</h1>
                </Col>
                <Col>
                    <Link to='/admin/colors/new' className='btn btn-sm btn-dark'>
                    <i className="bi bi-plus-square-dotted p-2 mt-4" ></i> Create Color
                    </Link>
                </Col>
                {/* <Col>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
                        <FormControl
                        placeholder="Search color code"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        onChange={(e)=> setSearch(e.target.value)}
                        />
                    </InputGroup>           
                </Col> */}
            </Row>

          
            {deleteError && <Alert variant='danger'>{deleteError}</Alert>}          
            {deleteLoading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}   
            {loading ? <Spinner animation="border" variant="dark" /> :
            error ? <Alert variant='danger'>{error}</Alert> : 
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>NAME</th>
                        <th>IMAGE</th>
                        <th>CREATED</th>
                        <th>MORE/EDIT</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {colors.map(color => (
                            <tr key={color._id}>
                                <td>{color.code}</td>
                                <td>{color.name}</td>
                                <td>
                                    <Row className='m-0 p-0 justify-content-center'>
                                        <Col lg={2} md={3} sm={4} xs={6} className='m-1 p-0'> 
                                            <Image src={`/${color.image}`} alt={color.name} style={{width: '30px', height: '30px'}} />
                                        </Col>
                                    </Row>
                                </td>
                                <td><Moment format="MM/DD">{color.createdAt}</Moment></td>


                                <td>                                    
                                    <LinkContainer to={`/admin/colors/${color._id}/edit`}>
                                        <Button 
                                        variant='light' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-gear" style={{fontSize: '1.5rem'}}></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                <DeleteConfirmModal deleteFunction={deleteHandler} id={color._id} />
                                    {/* <Button
                                    variant='danger'
                                    size='sm'
                                    className='p-0'
                                    onClick={()=> deleteHandler(color._id)}
                                    ><i className="bi bi-trash" style={{fontSize: '1.5rem'}}></i></Button>                                     */}
                                </td>
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

export default AdminColorListScreen
