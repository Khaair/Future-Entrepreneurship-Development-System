import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import URL from "./Url";
import axios from "axios";
import Moment from "react-moment";
import Dropdown from "react-bootstrap/Dropdown";
import Header from "./Header";
import Footer from "./Footer";

export default class Pubusers extends Component {
  state = {
    users: [],
    loding: false,
  };

  fetchuser = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchusers`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data);
        if (data.data.length) {
          console.log(data.data);
          this.setState({ users: data.data, loding: false, redirect: true });
        } else {
          this.setState({ users: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        this.setState({ loding: false });
      });
  };
  componentDidMount() {
    this.fetchuser();
  }
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <h1 className="mt-4">All activate User here</h1>

        <table className="table">
          <thead>
            <th>S No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Downlines</th>
            <th>Check</th>
            <th>Member SInce</th>
            <th>Action</th>
          </thead>
          <tbody>
            {this.state.users.map((data, index) => {
              return (
                <tr key={index}>
                  <td data-label="S.No">{index + 1}</td>
                  <td data-label="Name">{data.fullname}</td>
                  <td data-label="Email">{data.email}</td>
                  <td data-label="Gender">{data.gender}</td>
                  <td data-label="Downlines">{data.myrefused}</td>
                  <td data-label="Check">
                    <a
                      className="dropdown-item"
                      href={`/profile/${data.username}`}
                    >
                      Details
                    </a>
                  </td>

                  <td data-label="Member SInce">
                    <Moment>{data.createdAt}</Moment>
                  </td>
                  <td data-label="Action">
                    <button type="button" onClick={() => this.remove(data._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Footer />
      </div>
    );
  }
}
