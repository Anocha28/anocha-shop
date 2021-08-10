import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, InputGroup, Spinner, Alert, Container} from 'react-bootstrap'
import {createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_DEFAULT} from '../constants/productConstants'
import AddingColorModal from '../Modals/AddingColorModal'

const AdminCreateProductScreen = ({history}) => {

    const dispatch = useDispatch()
    const categoryList = ['Category1','Category2','Category3','Category4','Category5']

    const productCreate = useSelector(state=>state.productCreate)
    const {loading, error, success} = productCreate
    

    const [XS, setXS] = useState(false)
    const [S, setS] = useState(false)
    const [M, setM] = useState(false)
    const [L, setL] = useState(false)
    const [XL, setXL] = useState(false)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [sizeList, setSizeList] = useState([])
    const [image, setImage] = useState(null)
    const [warning, setWarning] = useState(null)

    const [colorAdd, setColorAdd] = useState([])


    useEffect(()=>{
        if(success) {
            dispatch({type: PRODUCT_CREATE_DEFAULT})
            history.push('/admin/products')
        }
        return ()=>{
            
        }
    },[success, history, dispatch])

    
    const handleCheck = (e) => {        
        if(e.target.checked){
            sizeList.push(e.target.value)            
        } else {
          sizeList.splice(sizeList.indexOf(e.target.value), 1)          
        }  
        setSizeList([...sizeList])      
    }

    
    const submitHandler = async (e) => {
        e.preventDefault()     
        
        const newProduct = {
            code,
            name,
            description,
            price,
            category,
            sizeList,
            image,
        }
        const isEmpty = Object.values(newProduct).some(x => x === null || x === '')        
        if(isEmpty) {
            setWarning('Please complete required fields.')
        }else if(sizeList.length === 0){
            setWarning('Sizes are required')
        } else {
            setWarning(null)
            const data = new FormData()
            data.append('code', code)
            data.append('name', name)
            data.append('description', description)
            data.append('price', price)
            data.append('category', category)
            data.append('size', sizeList)
            if(colorAdd.length !== 0) {data.append('color', colorAdd)}
            for(let i = 0; i < image.length; i++) {
                data.append('files', image[i])
            }
            dispatch(createProduct(data))
        }   
    }

    return (
        <Container>

            <div className='mb-3 pb-5'>
                <h3 className='pr-3 mt-2'>Create new product</h3>
                <Link to='/admin/products' className='btn btn-sm btn-dark'> 
                <i className="bi bi-arrow-90deg-left pr-2"></i>
                Back to product list</Link>
            </div> 

            <Form onSubmit={submitHandler} autoComplete='off' noValidate>    

            {error && <Alert variant='danger'>{error}</Alert>}
            {warning && <Alert variant='danger'>{warning}</Alert>}
            
            {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}            
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Code <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>
                <Form.Control 
                    type="number" 
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    placeholder="Code" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Name <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>
                <Form.Control 
                    type="text"
                    value={name}
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Name" />
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Description <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>
                <Form.Control 
                    as="textarea" 
                    placeholder="Description" 
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    style={{ height: '100px' }}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Price
                </Form.Label>
                <Col sm={9}>
                <InputGroup className="mb-2">
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl 
                        type="number" 
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price" />
                </InputGroup>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Category <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>
                <Form.Control as='select' onChange={e => setCategory(e.target.value)}>                    
                    {categoryList.map((c, index)=> (                        
                        <option 
                        key={index}
                        value={c}
                        
                        >{c}</option>
                    ))}
                </Form.Control>   
                <Button 
                    size='sm' 
                    variant='dark' 
                    className='mt-1'
                    onClick={()=> console.log('add category')}
                >
                <i className="bi bi-plus-circle-dotted pr-2"></i>
                add new category</Button>            
                </Col>

            </Form.Group>

            <Form.Group as={Row} className='my-4'>
                <Form.Label column={3}>
                    Available Sizes <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>

                    <Form.Check
                        type='checkbox'
                        inline
                        label='XS'
                        value='XS'
                        defaultChecked={XS}
                        onChange={(e) => 
                        {setXS(!e.target.checked); handleCheck(e)}}                        
                    />
                    <Form.Check
                        type='checkbox'
                        inline
                        label='S'
                        value='S'
                        defaultChecked={S}
                        onChange={(e) => {setS(!e.target.checked); handleCheck(e)}}                        
                    />
                    <Form.Check
                        type='checkbox'
                        inline
                        label='M'
                        value='M'
                        defaultChecked={M}
                        onChange={(e) => {setM(!e.target.checked); handleCheck(e)}}                        
                    />
                    <Form.Check
                        type='checkbox'
                        inline
                        label='L'
                        value='L'
                        defaultChecked={L}
                        onChange={(e) => {setL(!e.target.checked); handleCheck(e)}}                        
                    />
                    <Form.Check
                        type='checkbox'
                        inline
                        label='XL'
                        value='XL'
                        defaultChecked={XL}
                        onChange={(e) => {setXL(!e.target.checked); handleCheck(e)}}                        
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                Images <small className='text-muted'>(required)</small>
                </Form.Label>
                <Col sm={9}>
                    <Form.Control 
                        type='file'
                        multiple
                        name="image"
                        accept='.jpg,.jpeg,.png'
                        onChange={e => setImage( e.target.files)}
                        />
                    </Col>
            </Form.Group>



            <Form.Group as={Row} className="my-4">
                <Form.Label column sm={3}>
                Add Available Colors 
                </Form.Label>
                <Col sm={9}>
                <AddingColorModal colorAdd={colorAdd} setColorAdd={setColorAdd} />
                <Form.Label className='ml-3'>{colorAdd.length} - colors</Form.Label>
                </Col>
            </Form.Group>



            <Form.Group as={Row} className="mt-5">
                <Col sm={{ span: 10, offset: 3 }}>
                <Button type="submit" variant='dark'><i className="bi bi-save2 pr-2"></i>Save</Button>
                </Col>
            </Form.Group>
            </Form>
        </Container>
    )
}

export default AdminCreateProductScreen
