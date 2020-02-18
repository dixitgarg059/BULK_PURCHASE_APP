import React, {Component} from 'react';
import axios from 'axios';
let ref;
export default class RATE_VENDOR extends Component {
    
    constructor(props) {
        super(props);
        ref=this;
        ref.state = {
            vendorname:ref.props.location.vendorname,
            rating:1
        };
        ref.onChangeRating=ref.onChangeRating.bind(ref);
    }
    onChangeRating(event){
        ref.setState({rating:event.target.value});
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
                            consoleuserRoutes.route('/update_order_in_order').put(function(req, res) {
                                // console.log("pddf");
                                // let product = new Product(req.body);
                                let customername=req.body.customername;
                                let vendorname=req.body.vendorname;
                                let productname=req.body.productname;
                                let quantity=req.body.quantity;
                                
                                // console.log(username);
                                // console.log(productname);
                                // let count=req.body.count;
                                // console.log(count);
                                // let status=req.body.status;
                                // console.log(status);
                                Order.updateOne({customername:`${customername}`,vendorname:`${vendorname}`,productname:`${productname}`},{quantity:`${quantity}`},function(err,order){
                                    if(err){
                                     console.log("not updated");
                                    }
                                    else{
                                        console.log("updated successfuly");
                                        res.json(order);
                                    }
                                })
                                
                            });
                            .log("update done");
                        });
                }
                // localStorage.setItem("username,newUser.username");
             });

    }
    render() {
        return (
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
        )
    }
}