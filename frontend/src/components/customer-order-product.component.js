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
            username:ref.props.location.username,
            quantity:0
        };
        ref.onChangeQuantity = ref.onChangeQuantity.bind(ref);
    

    }
    
    onChangeQuantity(event) {

        ref.setState({ quantity: event.target.value });
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
    onSubmit(e) {
        e.preventDefault();

        const Product={
            customername:ref.state.customername,
            vendorname:ref.state.vendorname,
            productname:ref.state.productname,
            quantity:ref.state.quantity,
            status:"WAITING"
        }
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
                new_cnt=parseInt(cnt)+parseInt(ref.state.quantity);
                if(new_cnt > quant)
                {
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
                axios.post('http://localhost:4000/add_order', Product)
                    .then(res => console.log(res.data));
                const Pr2={
                    username:ref.state.vendorname,
                    productname:ref.state.productname,
                    count:new_cnt,
                    status:stat
                }
                axios.put('http://localhost:4000/update-product',Pr2)
                    .then(response => console.log(""));
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
                        <label>Quantity: </label>
                        <input type="text" 
                               className="form-control" 
                               value={ref.state.quantity}
                               onChange={ref.onChangeQuantity}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Order" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}