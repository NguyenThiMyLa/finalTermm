import React, { Component } from 'react'
import {variables} from '../Variables';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            Username:"",
            Password:"",
            Account: [],
            TypeRole: '',
            UserId: ''
        }
    }

    changeUsername =(e)=>{
        this.setState({Username:e.target.value});
    }

    changePassword =(e)=>{
        this.setState({Password:e.target.value});
    }

    Submit(){
        fetch(variables.API_URL+'login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                // Username:this.state.Username,
                // Password:this.state.Password 
                Username:"mylaAdmin",
                Password:"12345678" 
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.state.Account = result;
            this.state.Account.map((item) => {
                this.state.TypeRole = item.type;
            });
            if(this.state.TypeRole == 0) {
                alert('abc');
                window.location.href = '/home';
            }
            
        })
    }
  render() {
    const {
        Username,
        Password
    }=this.state;
    return (
        <form>
            <h3>Sign In</h3>

        <div className="mb-3">
            <label>Username</label>
            <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={Username}
                onChange={this.changeUsername}
            />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={Password}
            onChange={this.changePassword}
          />
        </div>

        <div className="mb-3">
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                />
            <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
            </label>
            </div>
        </div>  

        <div className="d-grid">
            <button type="submit" className="btn btn-primary" onClick={()=>this.Submit()}>
                Submit
            </button>
        </div>
        <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
        </p>
        </form>
        )
    }
}
