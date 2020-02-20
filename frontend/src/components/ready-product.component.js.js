import React, {Component} from 'react';
import axios from 'axios';

export default class READY_PRODUCT extends Component {

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
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    Dispatch=(ownername,productname) =>{
        alert("you are dispatching the product");
        const Pr2={
            username:ownername,
            productname:productname,
            status:"Dispatched"
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
                            <th>Username</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity of Bundle</th>
                            {/* <th>Status</th> */}
                            {/* <th>Count</th> */}
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    
                        this.state.product.map((currentProduct, i) => {
                            if(this.state.username === currentProduct.username && currentProduct.status ==="Ready")
                                return (
                                    <tr>
                                        <td>{currentProduct.username}</td>
                                        <td>{currentProduct.productname}</td>
                                        <td>{currentProduct.price}</td>
                                        <td>{currentProduct.quantity}</td>
                                        {/* <td>{currentProduct.status}</td> */}
                                        {/* <td>{currentProduct.count}</td> */}
                                        <button type="button" onClick={() => this.Dispatch(currentProduct.username,currentProduct.productname)}>Dispatch</button>
                                        {/* <button type="button" onClick={() => this.Cancel(currentProduct.username,currentProduct.productname)}>Cancel</button> */}
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