<Link className="list-group-item list-group-item-action bg-light">
<ul className="list-unstyled">
  <li className="nav-item dropdown">
    <a
      className="nav-link  dropdown-toggle"
      data-toggle="dropdown"
    >
      Manage Users
    </a>
    <ul className="dropdown-menu dropdown-menu-right">
      <li>
        <Link to="/alluser" className="dropdown-item">
          All User
        </Link>
      </li>
      <li>
        <Link to="/userrequest" className="dropdown-item">
          User Requests
        </Link>
      </li>
    </ul>
  </li>
</ul>
</Link>
<Link className="list-group-item list-group-item-action bg-light">
<ul className="list-unstyled">
  <li className="nav-item dropdown">
    <a
      className="nav-link  dropdown-toggle"
      data-toggle="dropdown"
    >
      Withdraw Manage
    </a>
    <ul className="dropdown-menu dropdown-menu-right">
      <li>
        <Link to="/allwithdraw" className="dropdown-item">
          All Withdraws
        </Link>
      </li>
      <li>
        <Link to="/withdrawrequest" className="dropdown-item">
          Withdraw Requests
        </Link>
      </li>
    </ul>
  </li>
</ul>
</Link>
<Link className="list-group-item list-group-item-action bg-light">
<ul className="list-unstyled">
  <li className="nav-item dropdown">
    <a
      className="nav-link  dropdown-toggle"
      data-toggle="dropdown"
    >
      Settings
    </a>
    <ul className="dropdown-menu dropdown-menu-right">
      <li>
        <Link to="/manageslider" className="dropdown-item">
          Manage Slider
        </Link>
      </li>
      <li>
        <Link to="/managegreeting" className="dropdown-item">
          Manage Gretting
        </Link>
      </li>
      <li>
        <Link to="/manageservices" className="dropdown-item">
          Manage Services
        </Link>
      </li>
      <li>
        <Link to="manageportfolio" className="dropdown-item">
          Manage Portfolio
        </Link>
      </li>
      <li>
        <Link to="/managebussiness" className="dropdown-item">
          Manage Business
        </Link>
      </li>
      <li>
        <Link to="/managemission" className="dropdown-item">
          Manage Mission
        </Link>
      </li>
      <li>
        <Link to="/managevission" className="dropdown-item">
          Manage Vission
        </Link>
      </li>
      <li>
        <Link to="/manageteam" className="dropdown-item">
          Manage Team
        </Link>
      </li>
      <li>
        <Link to="/managefaq" className="dropdown-item">
          Manage Faq
        </Link>
      </li>
      <li>
        <Link to="/manageothers" className="dropdown-item">
          Others
        </Link>
      </li>
    </ul>
  </li>
</ul>
</Link>

/////////////////////////////////
import React, { Component } from "react";

import Avatar from "react-avatar";
import { Link, NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      auth: false,
      username: "",
      admin: false,
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  async componentDidMount() {
    const token = localStorage.getItem("auth");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("userrole");

    if (token && role === "admin") {
      this.setState({ admin: true });
    }

    if (token) {
      this.setState({ auth: true, username: username });
    } else {
      this.setState({ auth: false, username: "" });
    }
  }
  render() {
    return (
      <div>
        <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="social-media">
                  <ul>
                    <li>
                      <Link to="https://www.facebook.com/chaincome.bond.5">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.instagram.com/p/CI-vYVKrPCx/?igshid=185toy97k7j7y">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://youtube.com/channel/UCfMIJQuS0Dv-QvcXuQiI9rw">
                        <i className="fab fa-google-plus-g" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://twitter.com/Chaincome1?s=09">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-details">
                  <ul>
                    <li>
                      <i className="fas fa-phone fa-rotate-90" /> +01854563442
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt" /> Mirpur 2, Dhaka
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-light top-nav">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="images/chainlogo.png" alt="logo" />
            </Link>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="fas fa-bars" style={{ color: "black" }} />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    About Chaincome
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/shop">
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/faq">
                    Notifications
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                {this.state.auth ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ fontSize: "0px", width: "0px", height: "0px" }}
                      id="dropdown-basic"
                    >
                      <a
                        className="nav-link  dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <Avatar
                          size="30"
                          round
                          style={{ marginTop: "2px" }}
                          facebook-id="invalidfacebookusername"
                          src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
                        />
                      </a>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-2">
                        <a
                          className="dropdown-item"
                          href={`/profile/${this.state.username}`}
                        >
                          Myself
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <a className="dropdown-item" href="/invite">
                          Invite Others
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <a className="dropdown-item" href="/earning">
                          My Walet
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <a className="dropdown-item" href="/logout">
                          Logout
                        </a>
                      </Dropdown.Item>
                      {
                        this.state.admin && (
                          <Dropdown.Item href="#/action-3">
                            <a className="nav-link" href="/dashboard">
                              <i
                                className="fa fa-home"
                                style={{ fontSize: "28px", color: "blue" }}
                              ></i>
                            </a>
                          </Dropdown.Item>
                        )
                        //  <a className="nav-link" href="/admindashboard" style={{ "marginTop": "-34px",
                        //  "marginLeft": "22px"}}><i className="fa fa-home" style={{"fontSize":"28px","color":"blue"}}></i></a>
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ fontSize: "0px", width: "0px", height: "0px" }}
                      id="dropdown-basic"
                    >
                      <a
                        className="nav-link  dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <Avatar
                          size="30"
                          round
                          style={{ marginTop: "2px" }}
                          facebook-id="invalidfacebookusername"
                          src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
                        />
                      </a>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-2">
                        <a className="dropdown-item" href="/userregister">
                          Register
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <a className="dropdown-item" href="/userlogin">
                          Login
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                {/* {
                  this.state.admin && (
                    <li className="nav-item ">
                      <a className="nav-link" href="/dashboard">
                        <i
                          className="fa fa-home"
                          style={{ fontSize: "28px", color: "blue" }}
                        ></i>
                      </a>
                    </li>
                  )
                  //  <a className="nav-link" href="/admindashboard" style={{ "marginTop": "-34px",
                  //  "marginLeft": "22px"}}><i className="fa fa-home" style={{"fontSize":"28px","color":"blue"}}></i></a>
                } */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
