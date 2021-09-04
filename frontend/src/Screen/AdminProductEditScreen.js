import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, InputGroup, Image, Spinner, Alert, Container } from 'react-bootstrap'
import { updateProduct, detailProduct } from '../actions/productActions'
import { listCategory } from '../actions/categoryActions'
import { PRODUCT_UPDATE_DEFAULT } from '../constants/productConstants'
import { PRODUCT_DETAIL_CLEAR } from '../constants/productConstants'
import AddingColorModal from '../Modals/AddingColorModal'
import AddingInventoryModal from '../Modals/AddingInventoryModal'


const AdminProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const dispatch = useDispatch()
    const categoryList = ['Category1', 'Category2', 'Category3', 'Category4', 'Category5']

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: updateLoading, error: updateError, success } = productUpdate




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
    const [image, setImage] = useState([])
    const [newImage, setNewImage] = useState([])
    const [fileArray, setFileArray] = useState([])
    const [warning, setWarning] = useState(null)

    const [colorAdd, setColorAdd] = useState([])


    useEffect(() => {
        if (success) {
            history.push('/admin/products')
            dispatch({ type: PRODUCT_UPDATE_DEFAULT })
            dispatch({ type: PRODUCT_DETAIL_CLEAR })
        } else {
            if (!userInfo || !userInfo.isAdmin) {
                history.push('/')
            } else {
                if (!product || product._id !== productId) {
                    dispatch(detailProduct(productId))
                } else {

                    setCode(product.code)
                    setName(product.name)
                    setDescription(product.description)
                    setPrice(product.price)
                    setCategory(product.category)
                    setImage([...product.images])
                    setSizeList([...product.size])
                    setColorAdd([...product.color.map(c => c._id)])
                    setXS(product.size.includes("XS"))
                    setS(product.size.includes("S"))
                    setM(product.size.includes("M"))
                    setL(product.size.includes("L"))
                    setXL(product.size.includes("XL"))

                }
            }
        }
        return () => {
            dispatch({ type: PRODUCT_UPDATE_DEFAULT })
        }
    }, [success, history, dispatch, userInfo, product, productId])


    const handleCheck = (e) => {
        if (e.target.checked) {
            sizeList.push(e.target.value)
        } else {
            sizeList.splice(sizeList.indexOf(e.target.value), 1)
        }
        setSizeList([...sizeList])
    }

    const imagePreviewHandle = (e) => {
        setNewImage(e.target.files)
        //console.log(e.target.files)
        let imgFiles = []
        imgFiles.push(e.target.files)
        for (let i = 0; i < imgFiles[0].length; i++) {
            fileArray.push(URL.createObjectURL(imgFiles[0][i]))
        }
        //console.log(fileArray)
        setFileArray(fileArray)
    }

    const deleteImageHandle = (imageToRemove) => {
        const newImgList = image.filter(i => i !== imageToRemove)
        setImage([...newImgList])
    }


    const submitHandler = (e) => {
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
        if (isEmpty) {
            setWarning('Please complete required fields.')
        } else if (sizeList.length === 0) {
            setWarning('Sizes are required')
        } else if (newImage.length === 0 && image.length === 0) {
            setWarning('At least 1 image required')
        } else {
            const data = new FormData()
            if (newImage.length !== 0) {
                setWarning(null)
                data.append('code', code)
                data.append('name', name)
                data.append('description', description)
                data.append('price', price)
                data.append('category', category)
                data.append('size', sizeList)
                data.append('images', image)
                if (colorAdd.length !== 0) { data.append('color', colorAdd) }
                for (let i = 0; i < newImage.length; i++) {
                    data.append('files', newImage[i])
                }

            } else {
                setWarning(null)
                data.append('code', code)
                data.append('name', name)
                data.append('description', description)
                data.append('price', price)
                data.append('category', category)
                data.append('size', sizeList)
                if (colorAdd.length !== 0) { data.append('color', colorAdd) }
                data.append('images', image)
            }

            dispatch(updateProduct(productId, data))

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
                {updateLoading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                {updateError && <Alert variant='danger'>{updateError}</Alert>}
                {error && <Alert variant='danger'>{error}</Alert>}
                {warning && <Alert variant='danger'>{warning}</Alert>}

                {loading && <div className='text-center'><Spinner animation="border" variant="secondary" /></div>}
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Code <small className='text-muted'>(required)</small>
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            disabled
                            type="number"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
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
                            onChange={e => setName(e.target.value)}
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
                            onChange={e => setDescription(e.target.value)}
                            style={{ height: '100px' }} />
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
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            {categoryList.map((c, index) => (
                                <option
                                    key={index}
                                    value={c}

                                >{c}</option>
                            ))}
                        </Form.Control>
                        <Button
                            size=''
                            variant='dark'
                            className='mt-1'
                            onClick={() => console.log('add category')}
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
                            checked={XS}
                            onChange={(e) => { setXS(!XS); handleCheck(e) }}
                        />
                        <Form.Check
                            type='checkbox'
                            inline
                            label='S'
                            value='S'
                            checked={S}
                            onChange={(e) => { setS(!S); handleCheck(e) }}
                        />
                        <Form.Check
                            type='checkbox'
                            inline
                            label='M'
                            value='M'
                            checked={M}
                            onChange={(e) => { setM(!M); handleCheck(e) }}
                        />
                        <Form.Check
                            type='checkbox'
                            inline
                            label='L'
                            value='L'
                            checked={L}
                            onChange={(e) => { setL(!L); handleCheck(e) }}
                        />
                        <Form.Check
                            type='checkbox'
                            inline
                            label='XL'
                            value='XL'
                            checked={XL}
                            onChange={(e) => { setXL(!XL); handleCheck(e) }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Images Adding
                    </Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            type='file'
                            multiple
                            name="image"
                            accept='.jpg,.jpeg,.png'
                            onChange={e => imagePreviewHandle(e)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        New Images
                    </Form.Label>
                    <Col sm={9} className=''>
                        {newImage && fileArray.map((img, idx) => (
                            <div key={idx} className='d-inline'>
                                <Image src={img} style={{ width: '100px' }} className='px-2' />

                            </div>
                        ))}
                    </Col>
                </Form.Group>




                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>
                        Images List
                    </Form.Label>
                    <Col sm={9} className=''>
                        {image && image.map((img, idx) => (
                            <div key={idx} className='d-inline'>
                                <Image
                                    src={`/${img}`}
                                    className='px-2'
                                    style={{ width: '100px' }}
                                />
                                <Button
                                    size='sm'
                                    variant='danger'
                                    className='m-0 px-1'
                                    value={img}
                                    onClick={(e) => deleteImageHandle(e.target.value)}
                                >x</Button>
                            </div>
                        ))}
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="my-4">
                    <Form.Label column sm={3}>
                        Edit Available Colors
                    </Form.Label>
                    <Col sm={9}>
                        <AddingColorModal colorAdd={colorAdd} setColorAdd={setColorAdd} />
                        <Form.Label className='ml-3'>{colorAdd.length} - colors</Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="my-4">
                    <Form.Label column sm={3}>
                        Add Inventory
                    </Form.Label>
                    <Col sm={9}>
                        <AddingInventoryModal color={product && product.color} size={product && product.size} />
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

export default AdminProductEditScreen
