import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Myloader from "./Myloader";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
import URL from "./Url";
class Userlogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",

      password: "",

      redirect: false,
      redirecttocheck: false,
      error: "",
      loding: false,
      isPasswordShown: false,
    };
  }

  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  };

  loginformsubmit = async (data) => {
    data.preventDefault();

    this.setState({ loding: false });
    await axios
      .post(
        `${URL}/login-user`,
        {
          username: this.state.username,
          password: this.state.password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log("uuu", data);
        if (data.data.success) {
          localStorage.setItem("auth", data.data.token);
          localStorage.setItem("userrole", data.data.role);
          localStorage.setItem("username", data.data.username);

          console.log(data.data);
          this.setState({ loding: false, redirect: true });
          this.props.history.push("/");
          window.location.reload(1);
        } else {
          this.setState({ error: data.data.messege.msg, loding: false });
          this.notify();
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        this.setState({ error: err.response.data.messege.msg, loding: false });
        this.notify();
      });
  };

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  render() {
    return (
      <div className="col-md-4 col-md-offset-4" id="login">
        <section id="inner-wrapper" className="login">
          <article>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-user"> </i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.username}
                    onChange={this.savetostate}
                    placeholder="User Name"
                  />
                </div>
              </div>

              <div
                className="form-group"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-key"> </i>
                  </span>
                  <input
                    type={this.state.isPasswordShown ? "text" : "password"}
                    name="password"
                    value={this.state.password}
                    onChange={this.savetostate}
                    className="form-control"
                    placeholder="Password"
                  />
                  <i
                    style={{ marginLeft: "12px", marginTop: "15px" }}
                    className="fa fa-eye password-icon"
                    onClick={this.togglePasswordVisiblity}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={this.loginformsubmit}
                className="btn btn-success btn-block"
              >
                Submit
              </button>
              <div className="d-flex justify-content-center links">
                Dont have a account?<a href="/userregister">Sign Up</a>
              </div>
              <div className="d-flex justify-content-center links">
                <a href="/forgotpassword" className="ml-2">
                  Forgot your password or recover account?
                </a>
                <a href="/">Go Back</a>
              </div>
            </form>
          </article>
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
        </section>
      </div>
    );
  }
}
export default withRouter(Userlogin);
