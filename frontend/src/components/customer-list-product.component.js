import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class LIST_PRODUCT extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            username:ref.props.location.username,
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/a1')
             .then(response => {
                 ref.setState({products: response.data});
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
                            <th>Vendorname</th>
                            <th>Productname</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Customername</th> 

                        </tr>
                    </thead>
                    <tbody>
                    { 
                        ref.state.products.map((currentProduct, i) => {
                            if(currentProduct.customername === ref.state.username)
                            return (
                                <tr>
                                    <td>{currentProduct.vendorname}</td>
                                    <td>{currentProduct.productname}</td>
                                    <td>{currentProduct.quantity}</td>
                                    <td>{currentProduct.status}</td>
                                    <td>{currentProduct.customername}</td>
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