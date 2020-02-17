import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LOGIN from './components/login.component'
import VENDOR from './components/vendor.component'
import Customer from './components/customer.component'
import Products from './components/products.component'
import Add_Products from './components/add_products.component'
import SEARCH_PRODUCT from './components/customer-search-product.component'
// import Customer from './components/customer.component'
// import SEARCH_PRODUCT from  './components/customer-search-product.component' 
import Searched_Products from './components/searched-product.component'
function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">LOGIN</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" exact component={CreateUser}/>
        <Route path="/login" exact component={LOGIN}/>
        <Route path="/login/vendor" exact component={VENDOR}/>
        {/* <Route path="/login/customer" exact component={CUSTOMER}/> */}
        <Route path="/login/vendor/products" exact component={Products}/>
        <Route path="/login/vendor/add-products" exact component={Add_Products}/> 
        <Route path="/login/customer" exact component={Customer}/>
        <Route path="/login/customer/search-products" exact component={SEARCH_PRODUCT}/> 

        {/* <Route path="/login/customer/search-products" exact component={SEARCH_PRODUCT}/> */}
        <Route path="/login/customer/search-products/products" exact component={Searched_Products}/> 
        
        {/* pathname:'/login/customer/search-product/products', */}

      </div>
    </Router>
  );
}

export default App;
