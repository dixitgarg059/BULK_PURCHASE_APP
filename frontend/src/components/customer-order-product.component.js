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
        // alert("adding to database");
        // alert(ref.state.customername);
        axios.post('http://localhost:4000/add_order', Product)
            .then(res => console.log(res.data));
        //  .catch(function(error) {
            // console.log(error);
        // })
        // // axios.put('http://localhost:4000/updateorder',Product)
        // ref.setState({
        //     quantity:0
        // });
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
                // alert(new_cnt);
                if(new_cnt >= quant)
                {
                    // alert("in if ");
                    stat="Ready";
                    // new_cnt=0;  

                }
                else
                {
                    // alert("in else");
                    stat="Waiting";
                }
                
                // this.setState({users: response.data.});

                const Pr2={
                    username:ref.state.vendorname,
                    productname:ref.state.productname,
                    count:new_cnt,
                    status:stat
                }
                // alert(Pr2.status);
                // alert(Pr2.count);
        
                axios.put('http://localhost:4000/update-product',Pr2)
                    .then(response => console.log(""));
                            // 
                    alert("Ordering done!\n");
            });
        
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
                        <input type="submit" value="Order" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}