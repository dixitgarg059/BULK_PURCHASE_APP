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
    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    
                        this.state.product.map((currentProduct, i) => {
                            if(this.state.username === currentProduct.username)
                                return (
                                    <tr>
                                        <td>{currentProduct.username}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.quantity}</td>
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