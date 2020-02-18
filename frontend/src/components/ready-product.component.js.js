import React, {Component} from 'react';
import axios from 'axios';

export default class Products extends Component {

    constructor(props) {
        super(props);
        // this.state
        this.state={
            username :this.props.location.user,
            product:[],
            final_products:[]
      
          }

    }
    componentDidMount() {
        axios.get('http://localhost:4000/a')
             .then(response => {
                 this.setState({product: response.data});
            // let final_products=[];
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    Dispatch=(ownername,productname) =>{
        // this.props.history.push()
        alert("you are dispatching the product");
        
        // this.props.history.push({
        //     pathname:'/login/customer/search-products/products/order',
        //     customername:this.state.username,
        //     vendorname:ownername,
        //     productname:this.state.productname
        //   });
        const Pr2={
            username:ownername,
            productname:productname,
            status:"Dispatched"
        }
        axios.put('http://localhost:4000/update-product2',Pr2)
                    .then(response => console.log(""));
    }

    // }
    //     Cancel=(ownername,productname) =>{
    //         // this.props.history.push()
    //         alert("you are dispatching the product");
            
    //         // this.props.history.push({
    //         //     pathname:'/login/customer/search-products/products/order',
    //         //     customername:this.state.username,
    //         //     vendorname:ownername,
    //         //     productname:this.state.productname
    //         //   });
    //         const Pr2={
    //             username:ownername,
    //             productname:productname,
    //             status:"Canceled"
    //         }
    //         axios.put('http://localhost:4000/update-product2',Pr2)
    //                     .then(response => console.log(""));

    //     }
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity of Bundle</th>
                            {/* <th>Status</th> */}
                            {/* <th>Count</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    
                        this.state.product.map((currentProduct, i) => {
                            if(this.state.username === currentProduct.username && currentProduct.status ==="Ready")
                                return (
                                    <tr>
                                        <td>{currentProduct.username}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.quantity}</td>
                                        {/* <td>{currentProduct.status}</td> */}
                                        {/* <td>{currentProduct.count}</td> */}
                                        <button type="button" onClick={() => this.Dispatch(currentProduct.username,currentProduct.productname)}>Dispatch</button>
                                        {/* <button type="button" onClick={() => this.Cancel(currentProduct.username,currentProduct.productname)}>Cancel</button> */}
                                    </tr>
                                )
                            
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}