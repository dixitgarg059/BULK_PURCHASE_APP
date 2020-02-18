
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
export default class Customer extends Component{
  constructor(props){
    super(props);
    this.state={
        username:this.props.location.username
    }
  }
  searchProducts=() => {
    this.props.history.push({
        pathname:'/login/customer/search-products',
        username:this.state.username});
  }
  listProducts=() => {

      this.props.history.push({
          pathname:'/login/customer/list-products',
          username:this.state.username
      });
  }
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <button type="button" onClick={this.searchProducts}>
                  Search Products
                </button>
              </li>
              <li className="navbar-item">
                <button type="button" onClick={this.listProducts}>
                  List Products
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <br/>
      </div>
    )
  }
}