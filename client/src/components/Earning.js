import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import nogodlogo from "../assets/logo/nogodlogo.png";
import bikashlogo from "../assets/logo/bikashlogo.jfif";
import roketlogo from "../assets/logo/roketlogo.png";
import Typical from "react-typical";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Myloader from "./Myloader";
import "react-toastify/dist/ReactToastify.css";
import URL from "./Url";
import Moment from "react-moment";
class four extends Component {
  state = {
    name: "",
    paymenttype: "",
    withdrawnumber: "",
    contactnumber: "",
    messege: "",
    amount: "",
    withdraw: [],
    profile: "",
  };
  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  };

  withdrawformsubmit = async (data) => {
    data.preventDefault();

    this.setState({ loding: false });
    if (parseInt(this.state.amount) > parseInt(this.state.profile.earning)) {
      return alert(
        `You have to withdraw less than ${this.state.profile.earning} `
      );
    }

    await axios
      .post(
        `${URL}/withdraw`,
        {
          name: this.state.name,
          paymenttype: this.state.paymenttype,
          withdrawnumber: this.state.withdrawnumber,
          contactnumber: this.state.contactnumber,
          messege: this.state.messege,
          amount: this.state.amount,
          username: localStorage.getItem("username"),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((re) => {
        console.log("ppp", re);
        if (re.data.messege.success) {
          this.setState({ loding: false, redirect: true });
          this.setState({ error: "Please check Your Gmail To activate" });
          this.notify();
          this.props.history.push("/withdrawsuccessmesege");
        }

        if (!re.data.messege.success) {
          this.setState({ error: re.data.messege.msg });
          this.notify();
        }
      })
      .catch((err) => {
        // console.log(err.response.data.message.msg)
        // this.setState({ error: err.response.data.errors[0].msg, loding: false })
        //  this.notify();

        // console.log(err)

        console.log("eee", err);
      });
  };

  withdraw = async (type) => {
    await axios
      .get(
        `${URL}/withdraw?type=${type}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((data) => {
        console.log("uuu", data.data);
        if (data.data.length) {
          this.setState({ withdraw: data.data, loding: false, redirect: true });
        } else {
          this.setState({ withdraw: [], loding: false, redirect: true });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        this.setState({ error: err.response.data.messege.msg, loding: false });
        this.notify();
      });
  };

  remove = async (id) => {
    await axios
      .get(
        `${URL}/deletewithdraw/${id}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          },
        }
      )
      .then((data) => {
        console.log("uuu", data.data);
        this.componentDidMount();
        // if (data.data.length) {
        //   this.setState({ withdraw: data.data, loding: false, redirect: true });
        // }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ error: err.response.data.messege.msg, loding: false })
      });
  };
  fetchammount = async () => {
    await axios
      .get(`${URL}/pro/${localStorage.getItem("username")}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
        },
      })
      .then((res) => {
        this.setState({ profile: res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.withdraw("user");
    this.fetchammount();
  }

  render() {
    console.log(this.state.profile.earning);
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
            <Typical
              steps={["Hello", 1000, "Hello Chaincome member!", 500]}
              loop={Infinity}
              wrapper="p"
            />
            {/* <div className="error-img">
                  <img className="img-fluid" src="images/upcoming.png" alt="" />
                </div> */}
            <h3>Current Ballence:{this.state.profile.earning}</h3>
            <p>
              Do You want to withdraw?<a href="#withdrawform">Lets withdraw</a>
            </p>
            <a className="btn btn-primary" href="/home">
              {" "}
              Back To Homepage{" "}
            </a>
          </div>
          {/* /.jumbotron */}
        </div>
        <div className="container-fluid">
          <h1 className="mt-4">Your Withdraw History</h1>

          <table className="table">
            <thead>
              <th>S No</th>
              <th>Name</th>
              <th>State</th>
              <th>Withdraw Type</th>
              <th>Withdraw Number</th>
              <th>Mobile Number</th>
              <th>Amount </th>
              <th>Date</th>
              <th>Action</th>
            </thead>
            <tbody>
              {this.state.withdraw.map((data, index) => {
                return (
                  <tr key={index}>
                    <td data-label="S.No">{index + 1}</td>
                    <td data-label="Name">{data.name}</td>
                    <td data-label="State">{data.status}</td>
                    <td data-label="Withdraw Type">{data.paymenttype}</td>
                    <td data-label="Withdraw Number">{data.withdrawnumber}</td>
                    <td data-label="Mobile Number">{data.contactnumber}</td>
                    <td data-label="Amount">{data.amount}</td>

                    <td data-label="Date">
                      <Moment>{data.createdAt}</Moment>
                    </td>
                    <td data-label="Action">
                      <button
                        type="button"
                        class="btn btn-light"
                        onClick={() => this.remove(data._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="container contact-form" id="withdrawform">
          <div className="contact-image">
            <img
              src="https://image.ibb.co/kUagtU/rocket_contact.png"
              alt="rocket_contact"
            />
          </div>
          <form onSubmit={this.withdrawformsubmit}>
            <h3>Drop Us a Request</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={this.savetostate}
                    value={this.state.name}
                    placeholder="Your Name *"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <input
                      type="radio"
                      name="emotion"
                      id="sad"
                      className="input-hidden"
                      name="paymenttype"
                      onChange={this.savetostate}
                      value="nogod"
                    />
                    <label for="sad">
                      <img
                        style={{ width: "151px" }}
                        src={nogodlogo}
                        alt="I'm sad"
                      />
                    </label>

                    <input
                      type="radio"
                      name="emotion"
                      id="happy"
                      className="input-hidden"
                      name="paymenttype"
                      onChange={this.savetostate}
                      value="roket"
                    />
                    <label for="happy" style={{ marginLeft: "15px" }}>
                      <img
                        style={{ width: "151px" }}
                        src={roketlogo}
                        alt="I'm happy"
                      />
                    </label>
                    <input
                      type="radio"
                      name="emotion"
                      id="good"
                      className="input-hidden"
                      name="paymenttype"
                      onChange={this.savetostate}
                      value="bikash"
                    />
                    <label for="good" style={{ marginLeft: "15px" }}>
                      <img
                        style={{ width: "151px" }}
                        src={bikashlogo}
                        alt="I'm good"
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="withdrawnumber"
                    onChange={this.savetostate}
                    value={this.state.withdrawnumber}
                    className="form-control"
                    placeholder="Your Withdraw Number "
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.savetostate}
                    className="form-control"
                    placeholder="Amount"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="messege"
                    className="form-control"
                    value={this.state.messege}
                    onChange={this.savetostate}
                    placeholder="Your Message *"
                    style={{ width: "100%", height: "150px" }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="contactnumber"
                    value={this.state.contactnumber}
                    onChange={this.savetostate}
                    className="form-control"
                    placeholder="Your Contact Number"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    name="btnSubmit"
                    className="btnContact"
                  />
                </div>
              </div>
            </div>
          </form>
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
        </div>

        <Footer />
      </div>
    );
  }
}

export default four;
