import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            type: "Vendor",
            sum:0,
            count:0
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeType= this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onChangeType(event){
        this.setState({type: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            type :this.state.type,
            count:this.state.count,
            sum:this.state.sum
        }

        axios.post('http://localhost:4000/add', newUser)
             .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '',
            type:''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select type="text" 
                               className="form-control" 
                               value={this.state.type}
                               onChange={this.onChangeType}
                               >
                        <option value="Vendor">Vendor</option>
                        <option value="Customer">Customer</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}