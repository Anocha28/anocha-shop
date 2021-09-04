import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import { Table, Spinner, Alert, Container, Button } from 'react-bootstrap'
import { listCategory, deleteCategory } from '../actions/categoryActions'
import AddingCategoryModal from '../Modals/AddingCategoryModal'
import EditCategoryModal from '../Modals/EditCategoryModal'



const AdminCategoryListScreen = () => {

    const dispatch = useDispatch()
    const categoryList = useSelector(state=>state.categoryList)
    const {loading, error, categories} = categoryList

    const categoryCreate = useSelector(state=>state.categoryCreate)
    const {success: successCreate} = categoryCreate

    const categoryUpdate = useSelector(state=>state.categoryUpdate)
    const {success: successUpdate} = categoryUpdate

    const categoryDelete = useSelector(state=>state.categoryDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = categoryDelete

    useEffect(()=>{
        dispatch(listCategory())
    }, [dispatch, successCreate, successDelete, successUpdate])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
        dispatch(deleteCategory(id))
        }
    }

    return (
        <Container>
        <AddingCategoryModal />
        {loadingDelete && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
        {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
        { loading ? <div className='text-center'><Spinner animation="border" variant="secondary" /></div> :
        error ? <Alert variant='danger'>{error}</Alert> :
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Created Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c, index)=> (
                            <tr key={index}>
                                <td>{c.category}</td>
                                <td><Moment format="DD MMM YY">{c.createdAt}</Moment></td>
                                <td>
                                <EditCategoryModal categoryId = {c._id} categoryToEdit = {c.category} />
                                {/* <Button 
                                        variant='light' 
                                        size='sm'
                                        className='p-0'
                                        ><i className="bi bi-gear" style={{fontSize: '1.5rem'}}></i>
                                    </Button> */}
                                </td>
                                <td><Button
                                    variant='danger'
                                    size='sm'
                                    className='p-0'
                                    onClick={()=> deleteHandler(c._id)}
                                    ><i className="bi bi-trash" style={{fontSize: '1.5rem'}}></i></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
    }

    </Container>   
    )
}

export default AdminCategoryListScreen
