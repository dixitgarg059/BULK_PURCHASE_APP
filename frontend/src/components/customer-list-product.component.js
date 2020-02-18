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
            all_products:[]
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
        

    }
    Edit=(ownername,productname,quantity) =>{
        alert("You are Editing the Order");
        // this.props.history.push()
        // alert("you are ordering");
        // alert(this.state.username);
        ref.props.history.push({
            pathname:'/login/customer/list-products/edit-product',
            customername:ref.state.username,
            vendorname:ownername,
            productname:productname,
            quantity:quantity
          });
    }
    RateVendor=(ownername,productname) =>{
        alert("You are rating the vendor");
        // ref.props.history.push({
        //     pathname:'/login/customer/list-products/rate-vendor',
        //     customername:ref.state.username,
        //     vendorname:ownername,
        //     productname:productname,
        //     quantity:quantity
        //   });
    }
    ProductReview=(ownername,productname) =>{
        alert("You are  giving  the Product review");
        // this.props.history.push()
        // alert("you are ordering");
        // alert(this.state.username);
        ref.props.history.push({
            pathname:'/login/customer/list-products/product-review',
            customername:ref.state.username,
            vendorname:ownername,
            productname:productname
          });
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                   
                    <tr>
                        <th>Vendorname</th>
                        <th>Productname</th>
                        <th>Quantity Ordered</th>
                        <th>Status</th>
                        <th>Quantity left for the order to get placed</th>
                        {/* <th>Customername</th>  */}

                    </tr>          
                    </thead>
                    <tbody>
                    { 
                        ref.state.products.map((currentProduct, i) => {
                            // ref.state.all_products.map((it,i) =>{
                            if(currentProduct.customername ===   ref.state.username)
                            if(ref.getStatus(currentProduct.productname,currentProduct.vendorname) === "Waiting")
                            {
                                return (
                                    <tr>
                                        <td>{currentProduct.vendorname}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.quantity}</td>
                                        <td>Waiting</td>  
                                        {/* <td>{currentProduct.customername}</td> */}
                                        <td>{ref.getQuantity(currentProduct.productname,currentProduct.vendorname)}</td>
                                        <button type="button" onClick={() => this.Edit(currentProduct.vendorname,currentProduct.productname,currentProduct.quantity)}>Edit</button>


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
                                        <td>Placed</td>  
                                        {/* <td>{currentProduct.customername}</td> */}
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
                                        <td>Dispatched</td>  
                                        {/* <td>{currentProduct.customername}</td> */}
                                        <td>0</td>
                                        <button type="button" onClick={() => this.ProductReview(currentProduct.vendorname,currentProduct.productname)}>Give Product Review</button>


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
                                        <td>{ref.getStatus(currentProduct.productname,currentProduct.vendorname)}</td>  
                                        {/* <td>{currentProduct.customername}</td> */}
                                        <td>0</td>
                                    </tr>
                                )



                            }
                            
                            // })
                        })
                        }
                    </tbody>
                </table>
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
}