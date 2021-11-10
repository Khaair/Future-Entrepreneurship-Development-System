import React, { Component } from "react";
import URL from "./Url";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Myloader from "./Myloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import Header from "./Header";
class Forgotpassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false,
      mesg: "",
    };
  }
  notify = () => toast.error(this.state.mesg);
  onchange = (e) => {
    this.setState({ email: e.target.value });
  };
  sub = async (e) => {
    e.preventDefault();
    if (!this.state.email) {
      return alert("Please give a email");
    }
    this.setState({ loading: true });
    await axios
      .post(
        `${URL}/forgotpassordorusername`,
        { email: this.state.email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data.success) {
          this.props.history.push("/showmessege");
          this.setState({ loading: false });
        }
      })
      .catch(async (err) => {
        console.log(err.response);

        this.setState({ mesg: err.response.data.messege, loding: false });
        return alert(err.response.data.messege);
        const not = await this.notify();
        if (not) this.props.history.push("/userlogin");

        console.log(this.state.loding);
      });
  };
  render() {
    return (
      <div>
        <Header />
        <div className="full-title">
          <div className="container">
            {/* Page Heading/Breadcrumbs */}
            {/* <h1 className="mt-4 mb-3"> 404 </h1> */}
            <div className="breadcrumb-main">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                {/* <li className="breadcrumb-item active">404</li> */}
              </ol>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <div className="container">
          <div className="error-contents">
            {/* <div className="error-img">
                <img className="img-fluid" src="images/upcoming.png" alt="" />
              </div>
              <h3>“Business opportunities are like buses, there's always another one coming.” – Richard Branson.</h3>
              <p>“Success is not final; failure is not fatal: it is the courage to continue that counts.” – Winston Churchill. ... <a href="/home">Homepage</a></p>
              <a className="btn btn-primary" href="/home"> Back To Homepage </a> */}
            <form onSubmit={this.sub}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {" "}
                  Enter Your Email address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={this.onchange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
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
          {/* /.jumbotron */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Forgotpassword);
