import React, {Component} from 'react';
import axios from 'axios';

export default class LOGIN extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email
            
        }

        axios.post('http://localhost:4000/check', newUser)
             .then(res => {
                 if(!res.data)
                    alert("INVALID USER!!\nPLEASE CREATE ACCOUNT FIRST");
                else
                {
                    if(res.data.type === "Vendor")
                    {
                        this.props.history.push({
                            pathname:'/login/vendor',
                            username:newUser.username});
                    }
                    else if(res.data.type === "Customer")
                    {
                        this.props.history.push('/login/customer');
                    }
                }
             });

        this.setState({ 
            username: '',
            email: ''
            
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
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="LOGIN" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}