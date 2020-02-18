import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class PRODUCT_REVIEW extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            customername:ref.props.location.customername,
            vendorname:ref.props.location.vendorname,
            productname:ref.props.location.productname,
            review:"",
            rating:"1"
        };
        ref.onChangeReview = ref.onChangeReview.bind(ref);
        ref.onChangeRating=ref.onChangeRating.bind(ref);

    }
    
    onChangeReview(event) {
        // alert(ref);
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
        alert(Review.vendorname);
        alert(Review.productname);
        // alert("adding to database");
        // alert(ref.state.customername);
        axios.post('http://localhost:4000/add_review',Review)
            .then(res => console.log(res.data));
        //  .catch(function(error) {
            // console.log(error);
        // })
        // // axios.put('http://localhost:4000/updateorder',Product)
        // ref.setState({
        //     quantity:0
        // });
        alert("Thanks for you feedback!!");
        
    }
    render() {
        return (
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
        )
    }
}