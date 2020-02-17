import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class ORDER_PRODUCT extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productname:this.props.location.productname,
            quantity:0
        };
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        ref=this;

    }
    
    onChangeQuantity(event) {
        // alert(this);
        this.setState({ quantity: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
         ref.props.history.push({
             pathname: '/login/customer/search-products/products',
             product_name: ref.state.productname
         });
         ref.setState({
             productname:''
         });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}