import React, { Component } from "react";
import Axios from "axios";
import URL from "./Url";
import Avatar from "react-avatar";

import axios from "axios";
import Header from "./Header";

import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
} from "react-share";
import Copy from "./Copy";
import Footer from "./Footer";

export default class Downlines extends Component {
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
        console.log("pp", data);
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
      <div>
        <Header />
        <div className="container emp-profile">
          <form method="post">
            {this.state.users.map((item, index) => {
              if (item.role !== "admin")
                return (
                  <div key={index}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="profile-img">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                            alt=""
                          />
                          {/* <div className="file btn btn-lg btn-primary">
                          Change Photo
                          <input type="file" name="file" />
                        </div> */}
                        </div>
                        {/* <Avatar size="200" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" /><br/>
        <button>Update</button> */}
                      </div>

                      <div className="col-md-6">
                        <div className="profile-head">
                          <h5>{item.username}</h5>
                          <h6>{item.address}</h6>

                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                {item.dist}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                {item.thana}
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                              >
                                {item.mobile}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="profile-work">
                          <p>Supplies</p>
                          {item.selectedproduct.map((it, index) => {
                            return (
                              <>
                                <a href>{it.name}</a>
                                <br />
                              </>
                            );
                          })}
                          <p>Links</p>

                          <a href={item.fblink}>Facebook Profile</a>
                          <br />
                          <a href={item.website}>Website</a>
                          <br />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div
                          className="tab-content profile-tab"
                          id="myTabContent"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <label>Name</label>
                              </div>
                              <div className="col-md-6">
                                <p>{item.fullname}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Email</label>
                              </div>
                              <div className="col-md-6">
                                <p>{item.email}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Education</label>
                              </div>
                              <div className="col-md-6">
                                <p>{item.education}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Present Address</label>
                              </div>
                              <div className="col-md-6">
                                <p>{item.preaddress}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Permanent Address</label>
                              </div>
                              <div className="col-md-6">
                                <p>{item.permanentaddress}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
            })}
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}
