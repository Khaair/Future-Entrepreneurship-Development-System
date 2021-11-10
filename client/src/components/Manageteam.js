import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import URL from "./Url";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import Dropdown from "react-bootstrap/Dropdown";
class Manageteam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Image: "",
      name: "",
      designation: "",
      fblink: "",
      googlelink: "",
      twitterlink: "",
      linkdin: "",
      link: "",
      teams: [],
      loding: false,
    };
  }

  Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onDrop = async (files) => {
    console.log(files[0]);

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    await axios
      .post(`${URL}/uploadImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            Image: response.data.image,
          });
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log("hi");
        console.log(err);
      });
  };
  // onDelete = (image) => {
  //   const currentIndex = this.state.Images.indexOf(image);

  //   let newImages = [...this.state.Images];
  //   newImages.splice(currentIndex, 1);

  //   this.setState({ Images: newImages });
  // };
  Changesdesignation = (e, data) => {
    this.setState({ designation: data.getData() });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const {
      Image,
      name,
      designation,
      fblink,
      googlelink,
      twitterlink,
      linkdin,
      link,
    } = this.state;

    // if (!name) {
    //   return alert("Give a name of the product!");
    // }

    if (!Image) {
      return alert("Give a member image!");
    }
    if (!name) {
      return alert("Give a member name!");
    }
    if (!designation) {
      return alert("Give a member designation!");
    }

    const variables = {
      Image,
      name,
      designation,
      fblink,
      googlelink,
      twitterlink,
      linkdin,
      link,
    };

    await axios.post(`${URL}/teamssetting`, variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.componentDidMount();
        this.setState({
          name: "",
          designation: "",
          Image: "",
          fblink: "",
          googlelink: "",
          twitterlink: "",
          linkdin: "",
          link,
        });
        alert("Member Succesfully added");
      } else {
        alert("Failed to add Member");
      }
    });
  };
  fetchteams = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchteams`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].teams);
        if (data.data[0].teams.length) {
          // console.log(data.data);
          this.setState({ teams: data.data[0].teams, loding: false });
        } else {
          this.setState({ teams: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  remove = async (id) => {
    await axios
      .get(
        `${URL}/deleteteams/${id}`,

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
    this.fetchteams();
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
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Super Admin ?
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
                  >
                    <i className="fa fa-caret-down"></i>
                  </Link>
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
            <div className="container">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Dropzone
                  onDrop={this.onDrop}
                  multiple={false}
                  maxSize={800000000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: "300px",
                        height: "240px",
                        border: "1px solid lightgray",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      {...getRootProps()}
                    >
                      {/* {console.log("getRootProps", { ...getRootProps() })}
                      {console.log("getInputProps", { ...getInputProps() })} */}
                      <input {...getInputProps()} />
                      <i
                        className="fa fa-plus"
                        style={{ fontSize: "3rem" }}
                      ></i>
                      {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                    </div>
                  )}
                </Dropzone>

                <div
                  style={{
                    display: "flex",
                    width: "350px",
                    height: "240px",
                    overflowX: "scroll",
                  }}
                >
                  <div>
                    <img
                      style={{
                        minWidth: "300px",
                        width: "300px",
                        height: "240px",
                      }}
                      src={`${URL}/${this.state.Image}`}
                      alt={`teamsImg`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">name</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.Change}
                  value={this.state.name}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Designation</label>
                <input
                  type="text"
                  name="designation"
                  onChange={this.Change}
                  value={this.state.designation}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter designation"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Facebook Link</label>
                <input
                  type="text"
                  name="fblink"
                  onChange={this.Change}
                  value={this.state.fblink}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Google Link</label>
                <input
                  type="text"
                  name="googlelink"
                  onChange={this.Change}
                  value={this.state.googlelink}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Twitter Link</label>
                <input
                  type="text"
                  name="twitterlink"
                  onChange={this.Change}
                  value={this.state.twitterlink}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Linkdin</label>
                <input
                  type="text"
                  name="linkdin"
                  onChange={this.Change}
                  value={this.state.linkdin}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Personal Website</label>
                <input
                  type="text"
                  name="link"
                  onChange={this.Change}
                  value={this.state.link}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="exampleInputEmail1">teams designation</label>

                <CKEditor
                  editor={ClassicEditor}
                  value={this.state.designation}
                  onChange={this.Changesdesignation}
                />
              </div> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="container-fluid">
            <h1 className="mt-4">Your teams</h1>

            <table className="table">
              <thead>
                <th>S No</th>
                <th>name</th>
                <th>designation</th>
                <th>fblink</th>
                <th>googlelink</th>
                <th>twitterlink</th>
                <th>Linkdin</th>
                <th>Website</th>
                <th>Image</th>
                <th>Action</th>
              </thead>
              <tbody>
                {this.state.teams.map((teams, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="S.No">{index + 1}</td>
                      <td data-label="name">{teams.name}</td>
                      <td data-label="designation">{teams.designation}</td>
                      <td data-label="fblink">{teams.fblink}</td>
                      <td data-label="googlelink">{teams.googlelink}</td>
                      <td data-label="twitterlink">{teams.twitterlink}</td>
                      <td data-label="linkdin">{teams.linkdin}</td>
                      <td data-label="Website">{teams.link}</td>
                      <td data-label="Image">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={`${URL}/${teams.img}`}
                          alt={`teamsImg`}
                        />
                      </td>

                      <td data-label="Action">
                        <button
                          type="button"
                          onClick={() => this.remove(teams._id)}
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

export default Manageteam;
