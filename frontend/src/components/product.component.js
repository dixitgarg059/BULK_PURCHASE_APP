import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    
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
             .then(res => {this.props.history.push('/login/vendor')});

        this.setState({
            username: '',
            email: ''
            
        });
    }

    render() {
        return (
            <div>
                <h1>
                    HELLO WORLD
                </h1>
            </div>
        )
    }
}