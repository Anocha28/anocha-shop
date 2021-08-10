import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} inline  className='d-flex'>
            <div>
            <Form.Control 
                type='text'
                value={keyword}
                placeholder='Search...'
                className='mr-sm-2 ml-sm-5 d-inline'
                onChange={(e) => setKeyword(e.target.value)}
                ></Form.Control>
            <Button 
                type='submit' 
                variant='outline-dark' 
                className='d-inline'
                ><i className="bi bi-search m-0 p-0"></i></Button>
            </div>
        </Form>
    )
}

export default SearchBox
