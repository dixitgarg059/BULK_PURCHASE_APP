import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class Searched_Products extends Component {
    
    constructor(props) {
        // alert("debuff");
        super(props);
        ref=this;       
        ref.state = {
            username:ref.props.location.username,
            productname :ref.props.location.product_name,
            // productname:'',
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/a')
             .then(response => {
                 ref.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    Order=(ownername) =>{
        // this.props.history.push()
        // alert("you are ordering");
        // alert(this.state.username);
        this.props.history.push({
            pathname:'/login/customer/search-products/products/order',
            customername:this.state.username,
            vendorname:ownername,
            productname:this.state.productname
          });
    }
    render() {
        
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Productname</th>
                            <th>Price</th>
                            <th>Quantity Remaining in the Bundle</th>
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
                                    <td>{currentProduct.quantity - currentProduct.count}</td>  
                                    <button type="button" onClick={() => this.Order(currentProduct.username)}>ORDER</button>
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