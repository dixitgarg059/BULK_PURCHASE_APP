import React, {Component} from 'react';
import axios from 'axios';

export default class Add_Products extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
            username: this.props.location.user,
            productname: '',
            price:0,
            quantity:0, 
            status:"Waiting",
            count:0

        }
        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangePrice= this.onChangePrice.bind(this);
        this.onChangeQuantity=this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onChangeProductname(event) {
        this.setState({ productname: event.target.value });
    }
    onChangePrice(event){
        this.setState({price: event.target.value});
    }
    onChangeQuantity(event){
        this.setState({quantity: event.target.value});
    }
    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            username: this.state.username,
            productname: this.state.productname,
            price :this.state.price,
            quantity:this.state.quantity,
            status:"Waiting",
            count:0
        }
        // console.log("onsubmit clicked");

        axios.post('http://localhost:4000/add_products', newProduct)
             .then(res => console.log(res.data));

        this.setState({
            productname: '',
            price:0,
            quantity:0 
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Productname: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductname}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Quantity of the Bundle: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="ADD PRODUCT " className="btn btn-primary"/>
                    </div>
                </form>
                <div >
                    {this.state.username}
                </div>
            </div>
        )
    }
}
