import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class PRODUCT_REVIEW extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            customername:ref.props.location.customername,
            username:ref.props.location.customername,
            vendorname:ref.props.location.vendorname,
            productname:ref.props.location.productname,
            review:"",
            rating:"1"
        };
        ref.onChangeReview = ref.onChangeReview.bind(ref);
        ref.onChangeRating=ref.onChangeRating.bind(ref);

    }
    
    onChangeReview(event) {
        ref.setState({ review: event.target.value });
    }
    onChangeRating(event){
        ref.setState({rating:event.target.value});
    }
    onSubmit(e) {
        e.preventDefault();
        const Review={
            customername:ref.state.customername,
            vendorname:ref.state.vendorname,
            productname:ref.state.productname,
            review:ref.state.review,
            rating:ref.state.rating
        }
        axios.post('http://localhost:4000/add_review',Review)
            .then(res => console.log(res.data));
        alert("Thanks for you feedback!!");
        
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
                        <label>REVIEW: </label>
                        <input type="text" 
                               className="form-control" 
                               value={ref   .state.review}
                               onChange={ref.onChangeReview}
                               />
                    </div>
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