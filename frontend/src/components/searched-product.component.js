import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class Searched_Products extends Component {
    
    constructor(props) {
        // alert("debuff");
        super(props);
        ref=this;       
        ref.state = {
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
    Order=() =>{
        alert("you are ordering");
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
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        ref.state.products.map((currentProduct, i) => {
                            if(currentProduct.productname === ref.state.productname)
                            return (
                                <tr>
                                    <td>{currentProduct.username}</td>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.price}</td>
                                    <td>{currentProduct.quantity}</td>  
                                    <button type="button" onClick={this.Order}>ORDER</button>
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