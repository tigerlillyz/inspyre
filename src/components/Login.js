import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/Login.css'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          user: null
        }
        this.login = this.login.bind(this); 
        this.logout = this.logout.bind(this); 
    
      }
    
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
    }
    
    logout() {
        auth.signOut()
          .then(() => {
            this.setState({
              user: null
            });
          });
    }
    
    login() {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            this.setState({
              user
            });
          });
    }
    render() {
        return (
            <div className = "Login">
                {
          this.state.user ?
          <div>
            <Typography>{this.state.user.displayName}</Typography>
          </div>
          :
          <div className='wrapper'>
            <center>
              <div className="default">
              </div>
            </center>
          </div>
        }
          <div className="wrapper">
            {this.state.user ?
              <Button className="button-logout" onClick={this.logout}>Logout</Button>                
              :
              <Button className="button-login" onClick={this.login}>Login</Button>              
            }
          </div>
            </div>
        )
    }
}