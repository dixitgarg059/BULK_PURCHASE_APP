import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class SEARCH_PRODUCT extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productname: '',
            username:this.props.location.username
        };
        this.onChangeProductname = this.onChangeProductname.bind(this);
        ref=this;

    }
    
    onChangeProductname(event) {
        this.setState({ productname: event.target.value });
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
    onSubmit(e) {
        e.preventDefault();
         ref.props.history.push({
             pathname: '/login/customer/search-products/products',
             product_name: ref.state.productname,
             username:ref.state.username
         });
         ref.setState({
             productname:''
         });
    }
    render() {
        return (
            <div>
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
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Productname: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductname}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}