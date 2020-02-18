import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class DISPATCHED_PRODUCT extends Component {

    constructor(props) {
        super(props);
        // ref.state
        ref=this;
        alert(ref);
        ref.state={
            username :ref.props.location.user,
            orders:[],
            products:[]
            // final_products:[]
      
          }

    }
    componentDidMount() {
        axios.get('http://localhost:4000/a3')
             .then(response => {
                 ref.setState({orders: response.data});
            // let final_products=[];
             })
             .catch(function(error) {
                 console.log(error);
             })
            axios.get('http://localhost:4000/a')
            .then(response => {
                ref.setState({products: response.data});
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
                            {/* <th>Owername</th> */}
                            <th>Product</th>
                            <th>Price</th>
                            <th>Reviews and Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    
                        ref.state.products.map((currentProduct, i) => {
                            if(ref.state.username === currentProduct.username && currentProduct.status === "Dispatched")
                                return (
                                    <tr>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{ref.get_reviews(currentProduct.productname,ref.state.username)}</td>
                                        
                                    </tr>
                                )
                            
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
    get_reviews(productname,vendorname)
    {
        let ret="";
        for(var i=0;i<ref.state.orders.length;i++)
        {
            if(ref.state.orders[i].vendorname === vendorname && ref.state.orders[i].productname === productname)
            {
                let ret1="Customer : ";
                ret1+=ref.state.orders[i].customername;
                ret1+="\nReview: ";
                ret1+=ref.state.orders[i].review;
                ret1+="\nRating: ";
                ret1+=ref.state.orders[i].rating;
                ret1+="\n";
                ret+=ret1;
            }
            
        }
    if(ret === "")
        ret="No Reviews!\n";
    return ret;
    }
}