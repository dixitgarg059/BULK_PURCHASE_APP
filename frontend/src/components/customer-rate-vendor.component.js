import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class RATE_VENDOR extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            vendorname:ref.props.location.vendorname,
            username:ref.props.location.username,
            rating:1
        };
        ref.onChangeRating=ref.onChangeRating.bind(ref);
    }
    onChangeRating(event){
        ref.setState({rating:event.target.value});
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
        const newUser={
            username:ref.state.vendorname,
            type:"Vendor"
        }
        axios.post('http://localhost:4000/check', newUser)
             .then(res => {
                 if(!res.data)
                    alert("INVALID USER!!\nPLEASE CREATE ACCOUNT FIRST");
                else
                {
                    let cnt=parseInt(res.data.count);
                    let sum=parseInt(res.data.sum);
                    let new_cnt=cnt+1;
                    let new_sum=sum+parseInt(ref.state.rating);
                    const updated_user={
                        username:ref.state.vendorname,
                        type:"Vendor",
                        count:new_cnt,
                        sum:new_sum
                    }
                    axios.put('http://localhost:4000/update_user',updated_user)
                        .then(res => {
                            console.log("update done");
                            alert("rating done");
                        });
                }
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
                        <label>RATING: </label>
                        <select type="text" 
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangeRating}
                               >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Rate" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}