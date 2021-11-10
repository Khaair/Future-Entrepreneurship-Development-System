import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import URL from "./Url";
import axios from "axios";
import Moment from "react-moment";
import Dropdown from "react-bootstrap/Dropdown";
class Allusers extends Component {
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
          // console.log(data.data);
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
  remove = async (id) => {
    await axios
      .get(
        `${URL}/deleteuser/${id}`,

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
  componentDidMount() {
    this.fetchuser();
  }
  render() {
    return (
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            {" "}
            <a href="/">Chaincome</a>{" "}
          </div>
          <br />
          <br />
          <div className="list-group list-group-flush">
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action bg-light"
            >
              Dashboard
            </Link>
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "0px", width: "0px", height: "0px" }}
                id="dropdown-basic"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">
                  <Link to="/alluser" className="dropdown-item">
                    All User
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/userrequest" className="dropdown-item">
                    User Requests
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "0px", width: "0px", height: "0px" }}
                id="dropdown-basic"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">
                  <Link to="/allwithdraw" className="dropdown-item">
                    All Withdraws
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/withdrawrequest" className="dropdown-item">
                    Withdraw Requests
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle
                style={{ fontSize: "0px", width: "0px", height: "0px" }}
                id="dropdown-basic"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">
                  <Link to="/manageslider" className="dropdown-item">
                    Manage Slider
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/managegreeting" className="dropdown-item">
                    Manage Gretting
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/manageservices" className="dropdown-item">
                    Manage Services
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="manageportfolio" className="dropdown-item">
                    Manage Portfolio
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/managebussiness" className="dropdown-item">
                    Manage Business
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/managemission" className="dropdown-item">
                    Manage Mission
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/managevission" className="dropdown-item">
                    Manage Vission
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/manageteam" className="dropdown-item">
                    Manage Team
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/managefaq" className="dropdown-item">
                    Manage Faq
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link to="/manageothers" className="dropdown-item">
                    Others
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* /#sidebar-wrapper */}
        {/* Page Content */}
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></Link>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/">
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container-fluid">
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
                        <button
                          type="button"
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
        </div>
      </div>
    );
  }
}

export default Allusers;
