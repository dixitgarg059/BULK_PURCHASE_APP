import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class Searched_Products extends Component {
    
    constructor(props) {
        super(props);
        ref=this;       
        ref.state = {
            username:ref.props.location.username,
            productname :ref.props.location.product_name,
            products: [],
            users:[]
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
    componentDidMount() {
        axios.get('http://localhost:4000/a')
             .then(response => {
                 ref.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/')
             .then(response => {
                 ref.setState({users:response.data});
             })
             .catch(function(error){
                 console.log(error);
             })
    }
    Order=(ownername) =>{
        this.props.history.push({
            pathname:'/login/customer/search-products/products/order',
            customername:this.state.username,
            vendorname:ownername,
            productname:this.state.productname,
            username:this.state.username
          });
    }

    sortByPrice=()=>{

        let sortedProductsAsc;
        sortedProductsAsc= this.state.products.sort((a,b)=>{
           return parseInt(a.price)  - parseInt(b.price);
        })

        this.setState({
            products:sortedProductsAsc
        })
    }
    sortByQuantity=()=>{

        let sortedProductsAsc;
        sortedProductsAsc= this.state.products.sort((a,b)=>{
           return parseInt(a.quantity-a.count)  - parseInt(b.quantity-b.count);
        })

        this.setState({
            products:sortedProductsAsc
        })
    }
    sortByRating=()=>{

        let sortedProductsAsc;
        sortedProductsAsc= this.state.products.sort((a,b)=>{
           return parseInt(a.price)  - parseInt(b.price);
        })
        this.setState({
            products:sortedProductsAsc
        })
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vendorname</th>
                            <th>Productname</th>
                            <th>Price</th>
                            <th>Vendor Rating</th>
                            
                            <th>Quantity Remaining in the Bundle</th>
                            <th>
                                    <button type="button" onClick={() => this.sortByPrice()}>SORT BY PRICE</button>
                                    <button type="button" onClick={() => this.sortByQuantity()}>SORT BY QUANTITY</button>


                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        ref.state.products.map((currentProduct, i) => {
                            if(currentProduct.productname === ref.state.productname && currentProduct.status === "Waiting")
                            return (
                                <tr>
                                    <td>{currentProduct.username}</td>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{this.getVendorRating(currentProduct.username)}</td>
                                    <td>{currentProduct.quantity - currentProduct.count}</td>  
                                    <button type="button" onClick={() => this.Order(currentProduct.username)}>ORDER</button>
                  
                                
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
    getVendorRating(vendorname)
    {    
        let ret=0;
        for(var i=0;i<ref.state.users.length;i++)
        {
            if(ref.state.users[i].username === vendorname && ref.state.users[i].type ==="Vendor")
            {
                let sum=ref.state.users[i].sum;
                let cnt=ref.state.users[i].count;
                if(cnt!=0){
                ret=sum/cnt;
                break;
              }
            }
        }
        if(ret === 0)
            ret="unrated";
        return ret;
    }
}