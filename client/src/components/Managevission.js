import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import URL from "./Url";
class Managevission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vissiontitle: "",
      vissionqoute: "",
      image: "",
      vission: [],
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
            image: response.data.image,
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
  Changesgreetingqoute = (e, data) => {
    this.setState({ vissionqoute: data.getData() });
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const { vissiontitle, vissionqoute, image } = this.state;

    // if (!grettingtitle) {
    //   return alert("Give a grettingtitle of the product!");
    // }

    if (!image) {
      return alert("Give a vission image!");
    }
    if (!vissiontitle) {
      return alert("Give a vission title!");
    }
    if (!vissionqoute) {
      return alert("Give vission qoute!");
    }

    const variables = {
      vissiontitle,
      vissionqoute,
      image,
    };

    await axios.post(`${URL}/vissionsetting`, variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        this.componentDidMount();
        this.setState({ vissiontitle: "", vissionqoute: "", image: "" });
        alert("vission Succesfully added");
      } else {
        alert("Failed to addvission");
      }
    });
  };
  fetchvission = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchvission`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].vission);
        if (data.data[0].vission.length) {
          // console.log(data.data);
          this.setState({ vission: data.data[0].vission, loding: false });
        } else {
          this.setState({ vission: [], loding: false });
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
        `${URL}/deletevission/${id}`,

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
  hiden = (e) => {
    this.setState({ hiden: true });
  };
  componentDidMount() {
    this.fetchvission();
  }
  render() {
    return (
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            {" "}
            <a href="/">Uddoktabd</a>{" "}
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
            <form onSubmit={this.onSubmit}>
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
                        src={`${URL}/${this.state.image}`}
                        alt={`sliderImg`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">vission title</label>
                <input
                  type="text"
                  name="vissiontitle"
                  onChange={this.Change}
                  value={this.state.vissiontitle}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter vission title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">vission Qoute</label>

                <CKEditor
                  editor={ClassicEditor}
                  value={this.state.vissionqoute}
                  onChange={this.Changesgreetingqoute}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Managevission;
