import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class LIST_PRODUCT extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            username:ref.props.location.username,
            products: [],
            all_products:[],
            users:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/a1')
             .then(response => {
                ref.setState({products: response.data});
                axios.get('http://localhost:4000/a')
                    .then(response => {
                    ref.setState({all_products: response.data});
                })
                    .catch(function(error) {
                    console.log(error);
             })
        
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
    Edit=(ownername,productname,quantity) =>{
        ref.props.history.push({
            pathname:'/login/customer/list-products/edit-product',
            customername:ref.state.username,
            vendorname:ownername,
            productname:productname,
            quantity:quantity
          });
    }
    RateVendor=(ownername,productname) =>{
        ref.props.history.push({
            pathname:'/login/customer/list-products/rate-vendor',
            vendorname:ownername,
            username:ref.state.username
          });
    }
    ProductReview=(ownername,productname) =>{
        ref.props.history.push({
            pathname:'/login/customer/list-products/product-review',
            customername:ref.state.username,
            vendorname:ownername,
            productname:productname
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
           return parseInt(a.price)  - parseInt(b.price);
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
                        <th>Quantity Ordered</th>
                        <th>Vendor Rating</th>
                        <th>Status</th>
                        <th>Quantity left for the order to get placed</th>
                    </tr>          
                    </thead>
                    <tbody>
                    { 
                        ref.state.products.map((currentProduct, i) => {
                            if(currentProduct.customername ===   ref.state.username)
                            if(ref.getStatus(currentProduct.productname,currentProduct.vendorname) === "Waiting")
                            {
                                return (
                                    <tr>
                                        <td>{currentProduct.vendorname}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{ref.getVendorRating(currentProduct.vendorname)}</td>
                                        <td>Waiting</td>  
                                        <td>{ref.getQuantity(currentProduct.productname,currentProduct.vendorname)}</td>
                                        <button type="button" onClick={() => this.Edit(currentProduct.vendorname,currentProduct.productname)}>Edit</button>

                                        </tr>
                                )


                            }
                            else if(ref.getStatus(currentProduct.productname,currentProduct.vendorname) === "Placed")
                            {

                                return (
                                    <tr>
                                        <td>{currentProduct.vendorname}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{ref.getVendorRating(currentProduct.vendorname)}</td>
                                        <td>Placed</td>  
                                        <td>0</td>
                                        <button type="button" onClick={() => this.RateVendor(currentProduct.vendorname,currentProduct.productname)}>RateVendor</button>


                                    </tr>
                                )


                            }
                            else if(ref.getStatus(currentProduct.productname,currentProduct.vendorname) === "Dispatched")
                            {

                                return (
                                    <tr>
                                        <td>{currentProduct.vendorname}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{ref.getVendorRating(currentProduct.vendorname)}</td>
                                        <td>Dispatched</td>  
                                        <td>0</td>
                                        <button type="button" onClick={() => this.ProductReview(currentProduct.vendorname,currentProduct.productname)}>Review</button>


                                    </tr>
                                )
                            }
                            else
                            {
                                return (
                                    <tr>
                                        <td>{currentProduct.vendorname}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>{ref.getVendorRating(currentProduct.vendorname)}</td>
                                        <td>{ref.getStatus(currentProduct.productname,currentProduct.vendorname)}</td>  
                                        <td>0</td>
                                    </tr>
                                )
                            }
                        })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        )
    }
    getStatus(productname,vendorname)
    {
        let st="Waiting";
        for(var i=0;i<ref.state.all_products.length;i++)
            {
                if(ref.state.all_products[i].productname === productname && ref.state.all_products[i].username === vendorname)
                    st=ref.state.all_products[i].status;
            }
        if(st === "Ready")
            st="Placed";
        return st;
    }
    getQuantity(productname,vendorname)
    {
        let st=0;
        for(var i=0;i<ref.state.all_products.length;i++)
            {
                if(ref.state.all_products[i].productname === productname && ref.state.all_products[i].username === vendorname)
                {
                    st=parseInt(ref.state.all_products[i].quantity)  - parseInt(ref.state.all_products[i].count);
                    break;
                }
            }
        return st;
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
                ret=sum/cnt;
                break;
            }
        }
        if(ret==0)
            ret="Unrated";
        return ret;
    }
}