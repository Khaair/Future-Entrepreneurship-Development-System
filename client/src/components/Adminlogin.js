import React, { Component } from 'react';
import axios from 'axios';
import logo200Image from '../assets/logo/1.png';
import { ToastContainer, toast } from 'react-toastify';
import Myloader from './Myloader'
import 'react-toastify/dist/ReactToastify.css';
import {withRouter} from 'react-router-dom'
import URL from './Url';
class Adminlogin extends Component {
  constructor() {
    super();
    this.state = {
     
      username: "",
     
      password: "",
    
      redirect: false,
      redirecttocheck: false,
      error: "",
      loding: false,
      isPasswordShown: false
    }

  }


  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  }

 
  loginformsubmit = async (data) => {
    data.preventDefault();
  
    this.setState({ loding: false })
    await axios.post(`${URL}/login-admin`, {
      "username": this.state.username,
      "password": this.state.password,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
     console.log('uuu',data)
     if(data.data.success){
      localStorage.setItem('auth', data.data.token);
      localStorage.setItem('userrole', data.data.role);
      localStorage.setItem('username', data.data.username);
     
      console.log(data.data);
      this.setState({ loding: false, redirect: true });
      this.props.history.push('/');
      window.location.reload(1);
    }
    else{
      this.setState({ error: data.data.messege.msg, loding: false })
      this.notify();
    }
    }).catch(err => {
      console.log('ffff',err)
   
      this.setState({ error: err.response.data.messege.msg, loding: false })
      this.notify();
      
    })
  }

 
 
 
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
    render() {
        return (
          <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center">
                <div className="brand_logo_container">
                  <img  src={logo200Image} className="brand_logo" style={{"width": "100px"}}alt="Logo" />
                </div>
              </div>
              <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.loginformsubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-user" /></span>
                    </div>
                    <input type="text" name="username" onChange={this.savetostate} className="form-control input_user" autocomplete="off" placeholder="Your Username" />
                  </div>
                  <div className="input-group mb-2" style={{ display: "flex", flexDirection: "row" }}>
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fas fa-key" /></span>
                    </div>
                    <input type={this.state.isPasswordShown ? "text" : "password"} name="password" value={this.state.password} onChange={this.savetostate} autocomplete="off" className="form-control input_pass" placeholder="Your password" />
                    <i
                style={{ marginLeft: "12px", marginTop: "15px" }}
                className="fa fa-eye password-icon"
                onClick={this.togglePasswordVisiblity}
              />
                  </div>
                 
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button type="submit" name="button" className="btn login_btn">Login</button>
                  </div>
                  <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
                </form>
              </div>
              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                 <a href="#" className="ml-2">Forgot your password?</a>
                </div>
                <div className="d-flex justify-content-center links">
                  <a href="/">Go Back</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        );
    }
}

export default withRouter(Adminlogin);