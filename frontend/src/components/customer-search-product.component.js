import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class SEARCH_PRODUCT extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            productname: '',
            username:this.props.location.username
        };
        this.onChangeProductname = this.onChangeProductname.bind(this);
        ref=this;

    }
    
    onChangeProductname(event) {
        // alert(this);
        this.setState({ productname: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        // alert("searching!!");    
        // alert(ref.state.username);
         ref.props.history.push({
             pathname: '/login/customer/search-products/products',
             product_name: ref.state.productname,
             username:ref.state.username
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
                        <label>Productname: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductname}
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