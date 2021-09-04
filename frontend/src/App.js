import React from 'react'
import { useSelector } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import './App.css';
import HomeScreen from './Screen/HomeScreen'
import Header from './Components/Header'
import Footer from './Components/Footer'
import LoginScreen from './Screen/LoginScreen'
import SignupScreen from './Screen/SignupScreen'
import TermsScreen from './Screen/TermsScreen'
import PolicyScreen from './Screen/PolicyScreen'
import ReturnScreen from './Screen/ReturnScreen'
import OrderAndPaymentScreen from './Screen/OrderAndPaymentScreen'
import ShippingAndDeliveryScreen from './Screen/ShippingAndDeliveryScreen'
import HelpCenterScreen from './Screen/HelpCenterScreen';
import ContactUsScreen from './Screen/ContactUsScreen';
import OrderTrackingScreen from './Screen/OrderTrackingScreen'
import ProductScreen from './Screen/ProductScreen'
import CartScreen from './Screen/CartScreen'
import ShippingScreen from './Screen/ShippingScreen'
import ProfileScreen from './Screen/ProfileScreen'
import NotFoundScreen from './Screen/NotFoundScreen'
import AdminProductListScreen from './Screen/AdminProductListScreen';
import PaymentScreen from './Screen/PaymentScreen';
import PlaceOrderScreen from './Screen/PlaceOrderScreen';
import AdminUserListScreen from './Screen/AdminUserListScreen';
import AdminUserEditScreen from './Screen/AdminUserEditScreen';
import AdminProductEditScreen from './Screen/AdminProductEditScreen';
import AdminCreateProductScreen from './Screen/AdminCreateProductScreen';
import AdminColorListScreen from './Screen/AdminColorListScreen';
import AdminCreateColorScreen from './Screen/AdminCreateColorScreen';
import AdminColorEditScreen from './Screen/AdminColorEditScreen';
import AdminInventoryScreen from './Screen/AdminInventoryScreen';
import OrderScreen from './Screen/OrderScreen';
import AdminOrderListScreen from './Screen/AdminOrderListScreen';
import AdminOrderScreen from './Screen/AdminOrderScreen';
//import AdminInventoryListScreen from './Screen/AdminInventoryListScreen';
import ShopNowScreen from './Screen/ShowNowScreen';
import AdminContactUsListScreen from './Screen/AdminContactUsListScreen';
import ForgotPaswordScreen from './Screen/ForgotPaswordScreen';
import ResetPasswordScreen from './Screen/ResetPasswordScreen';
import AdminCategoryListScreen from './Screen/AdminCategoryListScreen';
import AdminInventoryDataScreen from './Screen/AdminInventoryDataScreen';


function App() {
  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin

  return (
    
    <Router>
    <Header />
    <main className='pt-1'>
    
        <>
          <Switch>
          <Route path='/shopnow' component={ShopNowScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/register' component={SignupScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} exact/>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/order/:id' component={AdminOrderScreen} />
          <Route path='/terms' component={TermsScreen} />
          <Route path='/policy' component={PolicyScreen} />
          <Route path='/forgotpassword' component={ForgotPaswordScreen} exact/>
          <Route path='/forgotpassword/:id/:token' component={ResetPasswordScreen} exact/>


          <Route path='/returnandrefunds' component={ReturnScreen} />
          <Route path='/orderandpayment' component={OrderAndPaymentScreen} />
          <Route path='/delivery' component={ShippingAndDeliveryScreen} />
          <Route path='/help' component={HelpCenterScreen} />
          <Route path='/contact' component={ContactUsScreen} />
          <Route path='/tracking' component={OrderTrackingScreen} />
          
          <Route path='/admin/users/:id/edit' component={AdminUserEditScreen} />
          <Route path='/admin/products/:id/edit' component={AdminProductEditScreen} />
          <Route path='/admin/products/:id/inventory' component={AdminInventoryScreen} />
          <Route path='/admin/colors/:id/edit' component={AdminColorEditScreen} />
          <Route path='/admin/products/new' component={AdminCreateProductScreen} />
          <Route path='/admin/colors/new' component={AdminCreateColorScreen} />

          <Route path='/admin/inventory' component={AdminInventoryDataScreen} />
          <Route path='/admin/contactus' component={AdminContactUsListScreen} />
          <Route path='/admin/category' component={AdminCategoryListScreen} />


          <Route path='/admin/products' component={AdminProductListScreen} exact/>
          <Route path='/admin/products/:pageNumber' component={AdminProductListScreen} exact/>

          {/* <Route path='/admin/products'>
            {userInfo && userInfo.isAdmin ?  <AdminProductListScreen match={match} history={history}/> : <Redirect to='/' />}
          </Route> */}

          <Route path='/admin/orders'>
            {userInfo && userInfo.isAdmin ?  <AdminOrderListScreen /> : <Redirect to='/' />}
          </Route>

          <Route path='/admin/users'>
            {userInfo && userInfo.isAdmin ?  <AdminUserListScreen /> : <Redirect to='/' />}            
          </Route>

          <Route path='/admin/colors'>
            {userInfo && userInfo.isAdmin ?  <AdminColorListScreen /> : <Redirect to='/' />}            
          </Route>


          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/' component={HomeScreen} exact />
          <Route component={NotFoundScreen} />


          
          </Switch>
        </>

     </main>
     <div>
     <Footer />
     </div>
    </Router>
  );
}

export default App;
