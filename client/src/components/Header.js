import React, { Component } from "react";

import Avatar from "react-avatar";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
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
                      <Link to="https://www.facebook.com/groups/209982657507630">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.facebook.com/groups/209982657507630">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.facebook.com/groups/209982657507630">
                        <i className="fab fa-google-plus-g" />
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.facebook.com/groups/209982657507630">
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
                      <i className="fas fa-phone fa-rotate-90" /> +01720588884
                    </li>
                    <li>
                      <i className="fas fa-map-marker-alt" /> Banani, Dhaka
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            {" "}
            <img src="images/udokta.png" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ justifyContent: "flex-end" }}
          >
            <Nav className="mr-0">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/publicpro">
                Our Products
              </NavLink>
              <NavLink className="nav-link" to="/downlines">
                Members
              </NavLink>
              <NavLink className="nav-link" to="/publicdelivaryinfo">
                Delivary Routes
              </NavLink>
              <NavLink className="nav-link" to="/about">
                About us
              </NavLink>
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
              <NavLink className="nav-link" to="/faq">
                Notifications
              </NavLink>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
              <NavDropdown
                id="basic-nav-dropdown"
                style={{ marginRight: "120px" }}
              >
                {this.state.auth ? (
                  <>
                    <NavDropdown.Item href="#action/3.1">
                      <NavLink
                        className="nav-link"
                        to={`/profile/${this.state.username}`}
                      >
                        Profile
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      <NavLink className="nav-link" to="/invite">
                        Invite Others
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      <NavLink className="nav-link" to="/earning">
                        Walet
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      <NavLink className="nav-link" to="/logout">
                        Logout
                      </NavLink>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item href="#action/3.1">
                      <NavLink className="nav-link" to="/userregister">
                        Register
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      <NavLink className="nav-link" to="/userlogin">
                        Login
                      </NavLink>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
              {this.state.admin && (
                <NavLink className="nav-link" to="/dashboard">
                  <Avatar
                    name={this.state.username}
                    round
                    size="30"
                    textSizeRatio={1.75}
                  />
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
