import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class DISPATCHED_PRODUCT extends Component {

    constructor(props) {
        super(props);
        ref=this;
        ref.state={
            username :ref.props.location.user,
            orders:[],
            products:[]  
          }

    }
    componentDidMount() {
        axios.get('http://localhost:4000/a3')
             .then(response => {
                 ref.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
            axios.get('http://localhost:4000/a')
            .then(response => {
                ref.setState({products: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    showProducts=() => {
        if(!this.state.username)
          alert("LOGIN FIRST!!\n");
        else{
        this.props.history.push({
        pathname:'/login/vendor/products',
        user:this.state.username
      });
    }
      }
        createProduct=() => { 
              if(!this.state.username)
                alert("LOGIN FIRST!!\n");
              else{   
              this.props.history.push({
              pathname:'/login/vendor/add-products',
              user:this.state.username
            });
          }
        }
        showReadyProducts=() => {
          if(!this.state.username)
            alert("LOGIN FIRST!!\n");
          else{
          this.props.history.push({
          pathname:'/login/vendor/ready_products',
          user:this.state.username
        });
      }
      }
    
      showDispatchedProducts=() => {
        if(!this.state.username)
          alert("LOGIN FIRST!!\n");
        else{
        this.props.history.push({
        pathname:'/login/vendor/dispatched_products',
        user:this.state.username
      });
    }
    }
    
    render() {
        return (
            <div>
                <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item"><button type="button" onClick={this.createProduct}>ADD-PRODUCT</button></li>
                <li className="navbar-item"><button type="button" onClick={this.showProducts}>SHOW-PRODUCTS</button></li>
                <li className="navbar-item"><button type="button" onClick={this.showReadyProducts}>SHOW-READY-TO-DISPATCH-PRODUCTS</button></li>
                <li className="navbar-item"><button type="button" onClick={this.showDispatchedProducts}>SHOW-DISPATCHED-PRODUCTS</button></li>
            </ul>
        </div>
        <div>{this.state.username}</div>
    </nav>
</div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
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