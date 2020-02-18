// import React from 'react';
import React, {Component} from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
export default class VENDOR extends Component{
  constructor(props){
    super(props);
    this.state={
      username :this.props.location.username

    }
  }
  showProducts=() => {
    if(!this.state.username)
      alert("LOGIN FIRST!!\n");
    else{
    this.props.history.push({
    pathname:'/login/vendor/products',
    user:this.state.username
  });
}
  }
    createProduct=() => { 
          if(!this.state.username)
            alert("LOGIN FIRST!!\n");
          else{   
          this.props.history.push({
          pathname:'/login/vendor/add-products',
          user:this.state.username
        });
      }
    }
    showReadyProducts=() => {
      if(!this.state.username)
        alert("LOGIN FIRST!!\n");
      else{
      this.props.history.push({
      pathname:'/login/vendor/ready_products',
      user:this.state.username
    });
  }
  }
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <button type="button" onClick={this.createProduct}>
                  ADD-PRODUCT1
                </button>
              </li>
              <li className="navbar-item">
                <button type="button" onClick={this.showProducts}>
                SHOW-PRODUCTS
                </button>

              </li>
              <li className="navbar-item">
                <button type="button" onClick={this.showReadyProducts}>
                SHOW-READY-TO-DISPATCH-PRODUCTS
                </button>
                
              </li>
              
            </ul>
          </div>
          <div>
            {this.state.username}
          </div>
        </nav>

        <br/>
         
      </div>
    )
  }
}