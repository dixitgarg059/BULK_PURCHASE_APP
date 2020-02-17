import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class ORDER_PRODUCT extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            customername:ref.props.location.customername,
            vendorname:ref.props.location.vendorname,
            productname:ref.props.location.productname,
            quantity:0
        };
        ref.onChangeQuantity = ref.onChangeQuantity.bind(ref);
    

    }
    
    onChangeQuantity(event) {
        // alert(ref);
        ref.setState({ quantity: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const Product={
            customername:ref.state.customername,
            vendorname:ref.state.vendorname,
            productname:ref.state.productname,
            quantity:ref.state.quantity,
            status:"WAITING"
        }
        alert("adding to database");
        alert(ref.state.customername);
        axios.post('http://localhost:4000/add_order', Product)
            .then(res => console.log(res.data));

        // // axios.put('http://localhost:4000/updateorder',Product)
        ref.setState({
            quantity:0
        });
        alert("Ordering done!\n");
    }
    render() {
        return (
            <div>
                <form onSubmit={ref.onSubmit}>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={ref.state.quantity}
                               onChange={ref.onChangeQuantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Order1" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}