import React, {useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useHistory } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Navbar, Nav, NavDropdown,Badge, Image} from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart
    // const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    // const {userInfo} = userUpdateProfile

    useEffect(()=>{   
        
        
    },[cart, userInfo])


    const logoutHandler = () => {
       dispatch(logout()) 
       history.push('/')       
    }


    return (
        
        <Navbar bg="light" expand="lg">
        <Container fluid>


        <LinkContainer to='/'>    
        <Navbar.Brand><Image src='/a-web.png' style={{width:50,}}/>  E-Commerce</Navbar.Brand>
        </LinkContainer> 
              
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

            {/* search box ---------------------------------------------*/}
            <Route render={({history})=><SearchBox history={history} />} />


            <Nav className="ml-auto autohide pr-3 mr-4" align='end'>

                <LinkContainer to='/cart' className='mx-1'>
                    <Nav.Link className='d-flex'>
                    <div>
                        <i className="bi bi-cart4 "></i>
                           <span className='px-1'>Cart</span> 
                        <Badge variant='primary' className='px-1'>{cartItems.length}</Badge>
                    </div>
                    </Nav.Link>
                </LinkContainer>

            {userInfo && userInfo.isAdmin && (
                <>
                <NavDropdown title='Admin Panel' id="nav-dropdown" className='mx-1'>
                <LinkContainer to='/admin/products' >
                    <NavDropdown.Item>
                        Products
                    </NavDropdown.Item> 
                </LinkContainer>

                <LinkContainer to='/admin/inventory' >
                    <NavDropdown.Item>
                        Inventory
                    </NavDropdown.Item> 
                </LinkContainer>

                <LinkContainer to='/admin/colors' >
                    <NavDropdown.Item>
                        Colors
                    </NavDropdown.Item> 
                </LinkContainer>

                <LinkContainer to='/admin/orders' >
                    <NavDropdown.Item>
                        Orders
                    </NavDropdown.Item> 
                </LinkContainer>

                <LinkContainer to='/admin/users' >
                    <NavDropdown.Item>
                        Users
                    </NavDropdown.Item> 
                </LinkContainer>

                <LinkContainer to='/admin/category' >
                    <NavDropdown.Item>
                        Categories
                    </NavDropdown.Item> 
                </LinkContainer>
                              
                <LinkContainer to='/admin/contactus' >
                    <NavDropdown.Item>
                        Contact Us List
                    </NavDropdown.Item> 
                </LinkContainer>
                </NavDropdown>  
                </>
            )}

            { userInfo ? (
                <>   
                <NavDropdown title={userInfo.name} id="nav-dropdown" className='mx-1'>
                <LinkContainer to='/profile' >
                    <NavDropdown.Item>
                        Profile
                    </NavDropdown.Item> 
                </LinkContainer>                
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>              
                </NavDropdown>  
                </>
            ):(
                <>
                <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                </>
            )}

            
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        
    )
}

export default Header
