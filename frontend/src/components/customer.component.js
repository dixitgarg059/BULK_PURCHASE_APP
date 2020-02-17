// import React from 'react';
import React, {Component} from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import SEARCH_PRODUCT from './customer-search-product.component'
export default class Customer extends Component{
  constructor(props){
    super(props);
    // this.state={
    //   username :'',
    //   productname :'',
    //   price :0,
    //   quantity :0

    // }
  }
  searchProducts=() => {
    this.props.history.push('/login/customer/search-products');
  }
//   createProduct=() => {
//     this.props.history.push('/login/vendor/add-products');
//   }
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <button type="button" onClick={this.searchProducts}>
                  Search Product
                </button>
              </li>
              {/* <li className="navbar-item">
                <button type="button" onClick={this.showProducts}>
                SHOW-PRODUCTS
                </button>
              </li> */}
            </ul>
          </div>
        </nav>
        <br/>
      </div>
    )
  }
}