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
    Cancel=(ownername,productname) =>{
        alert("you are cancelling the product");
        
        const Pr2={
            username:ownername,
            productname:productname,
            status:"Canceled"
        }
        axios.put('http://localhost:4000/update-product2',Pr2)
                    .then(response => console.log(""));

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
                            {/* <th>Owername</th> */}
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity of the Bundle</th>
                            {/* <th>Status</th> */}
                            <th>Total Number of Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    
                        this.state.product.map((currentProduct, i) => {
                            if(this.state.username === currentProduct.username && currentProduct.status =="Waiting")
                                return (
                                    <tr>
                                        {/* <td>{currentProduct.username}</td> */}
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.quantity}</td>
                                        {/* <td>{currentProduct.status}</td> */}
                                        <td>{currentProduct.count}</td>
                                        <li className="navbar-item">
                                        {/* <button type="button" onClick={this.CancelProducts}>
                                                Cancel
                                        </button> */}
                                        <button type="button" onClick={() => this.Cancel(currentProduct.username,currentProduct.productname)}>Cancel</button>

                                        </li>
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
}