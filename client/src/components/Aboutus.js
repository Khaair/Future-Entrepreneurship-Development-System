import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import URL from "./Url";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Aboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bussiness: [],
      mission: [],
      vission: [],
      teams: [],
      loding: false,
    };
  }
  fetchbussiness = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchbussiness`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("greeting", data.data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ bussiness: data.data, loding: false });
        } else {
          this.setState({ bussiness: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  fetchmission = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchmission`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("greeting", data.data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ mission: data.data, loding: false });
        } else {
          this.setState({ mission: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
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
        console.log("greeting", data.data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ vission: data.data, loding: false });
        } else {
          this.setState({ vission: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
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
  componentDidMount() {
    this.fetchbussiness();
    this.fetchmission();
    this.fetchvission();
    this.fetchteams();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="full-title">
          <div className="container">
            {/* Page Heading/Breadcrumbs */}
            <h1 className="mt-4 mb-3"> About Us</h1>
            <div className="breadcrumb-main">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active"> About Us </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container">
          {/* About Content */}
          <div className="about-main">
            {this.state.bussiness.map((item, index) => {
              return (
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      className="img-fluid rounded mb-4"
                      src={`${URL}/${item.bussinessimg}`}
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <h2>{item.bussinesstitle}</h2>
                    <p>{ReactHtmlParser(item.bussinessqoute)}</p>
                  </div>
                </div>
              );
            })}

            {/* /.row */}
          </div>
        </div>
        <div className="about-inner">
          <div className="container">
            {this.state.mission.map((item, index) => {
              return (
                <div className="row mb-4" key={index}>
                  <div className="col-lg-6">
                    <div className="left-ab">
                      <h3>{item.missiontitle}</h3>
                      <p>{ReactHtmlParser(item.missionqoute)}</p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="right-ab">
                      <img
                        className="img-fluid rounded mb-4"
                        src={`${URL}/${item.missionimg}`}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {this.state.vission.map((item, index) => {
              return (
                <div className="row">
                  <div className="col-lg-6">
                    <div className="right-ab">
                      <img
                        className="img-fluid rounded mb-4"
                        src={`${URL}/${item.vissionimg}`}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="left-ab">
                      <h3>{item.vissiontitle}</h3>
                      <p>{ReactHtmlParser(item.vissionqoute)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          {/* Team Members */}
          <div className="team-members-box">
            <h2>Our Team</h2>
            <div className="row">
              {this.state.teams.map((item, index) => {
                return (
                  <div className="col-lg-4 mb-4" key={index}>
                    <div className="card h-100 text-center">
                      <div className="our-team">
                        <img
                          className="img-fluid"
                          src={`${URL}/${item.img}`}
                          alt=""
                        />
                        <div className="team-content">
                          <h3 className="title">{item.name}</h3>
                          <span className="post">{item.designation}</span>
                          <ul className="social">
                            <li>
                              <a href={`item.fblink`}>
                                <i className="fab fa-facebook" />
                              </a>
                            </li>
                            <li>
                              <a href={`item.googlelink`}>
                                <i className="fab fa-google-plus" />
                              </a>
                            </li>
                            <li>
                              <a href={`item.twitterlink`}>
                                <i className="fab fa-twitter" />
                              </a>
                            </li>
                            <li>
                              <a href={`item.linkdin`}>
                                <i className="fab fa-linkedin" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* /.row */}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Aboutus;
