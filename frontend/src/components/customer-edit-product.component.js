import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class ORDER_PRODUCT extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            customername:ref.props.location.customername,
            username:ref.props.location.customername,
            vendorname:ref.props.location.vendorname,
            productname:ref.props.location.productname,
            prev_quantity:ref.props.location.quantity,
            new_quantity:0
        };
        ref.onChangeQuantity = ref.onChangeQuantity.bind(ref);

    }
    searchProducts=() => {
    this.props.history.push({
        pathname:'/login/customer/search-products',
        username:this.state.username});
  }
  listProducts=() => {

      this.props.history.push({
          pathname:'/login/customer/list-products',
          username:this.state.customername
      });
  }
    
    onChangeQuantity(event) {
        ref.setState({ new_quantity: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        if(ref.state.quantity == 0)
        {
            alert("invalid input\n");
            return ;
        }
        const Pr={
            username:ref.state.vendorname,
            productname:ref.state.productname
        }
        let new_cnt=0;
        let stat="Waiting";
        axios.post('http://localhost:4000/check1',Pr)
            .then(response => {
                
                let quant=parseInt(response.data.quantity);
                let cnt=response.data.count;
                new_cnt=parseInt(cnt)+parseInt(ref.state.new_quantity)-parseInt(ref.state.prev_quantity);
                if(new_cnt > quant)
                {
                    // alert("ordered quantity cannot exceed")
                    alert("ordered quantity cannot exceed quantity remaining in the bundle");
                    return ;
                }
                else if(new_cnt == quant)
                {
                    stat="Ready";
                }
                else
                {
                    stat="Waiting";
                }
                const Product={
                    customername:ref.state.customername,
                    vendorname:ref.state.vendorname,
                    productname:ref.state.productname,
                    quantity:ref.state.new_quantity,
                    status:"WAITING"
                }
                axios.put('http://localhost:4000/update_order_in_order', Product)
                    .then(res => console.log(res.data));
                const Pr3={
                    username:ref.state.vendorname,
                    productname:ref.state.productname,
                    count:new_cnt,
                    status:stat
                }
                
                axios.put('http://localhost:4000/update-product',Pr3)
                    .then(response => console.log("update-product_done")); 
                    alert("Editing done!\n");
            });
        
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
                <form onSubmit={ref.onSubmit}>
                    <div className="form-group">
                        <label>New Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={ref.state.quantity}
                               onChange={ref.onChangeQuantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="EDIT ORDER" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}