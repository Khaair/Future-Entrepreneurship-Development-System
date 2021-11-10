import React, { Component } from "react";
import axios from "axios";
import URL from "./Url";
import Avatar from "react-avatar";
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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
    };
  }

  fetchprofile = async () => {
    await axios
      .get(`${URL}/pro/${this.props.match.params.username}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((rest) => {
        console.log(rest);
        this.setState({ profile: rest.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchprofile();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container emp-profile">
          <form method="post">
            {this.state.profile.map((item, index) => {
              return (
                <div key={index}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="profile-img">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                          alt=""
                        />
                        <div className="file btn btn-lg btn-primary">
                          Change Photo
                          <input type="file" name="file" />
                        </div>
                      </div>
                      {/* <Avatar size="200" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" /><br/>
        <button>Update</button> */}
                    </div>

                    <div className="col-md-6">
                      <div className="profile-head">
                        <h5>{item.username}</h5>
                        <h6>{item.address}</h6>

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                              About
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <button className="profile-edit-btn">Edit Profile</button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      {/* <div className="profile-work">
                        <p>WORK LINK</p>
                        <a href>Website Link</a>
                        <br />
                        <a href>Bootsnipp Profile</a>
                        <br />
                        <a href>Bootply Profile</a>
                        <p>SKILLS</p>
                        <a href>Web Designer</a>
                        <br />
                        <a href>Web Developer</a>
                        <br />
                        <a href>WordPress</a>
                        <br />
                        <a href>WooCommerce</a>
                        <br />
                        <a href>PHP, .Net</a>
                        <br />
                      </div> */}
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
                              <label>User Role</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.role}</p>
                            </div>
                          </div>
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
                              <label>Phone</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.mobile}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Copy Link</label>
                            </div>
                            <div className="col-md-6">
                              <Copy />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Check Your Downline</label>
                            </div>
                            <div className="col-md-6">
                              You Add {item.myrefused}
                              <a
                                style={{ marginLeft: "2px" }}
                                href={`/downlines/${item.myref}`}
                              >
                                Check them
                              </a>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>My referel Id</label>
                            </div>
                            <div className="col-md-6">
                              <p>{item.myref}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Share Your Link</label>
                            </div>
                            <div className="col-md-6">
                              {" "}
                              <FacebookShareButton
                                url="www.example.com"
                                quote="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                              >
                                <FacebookIcon size={40} round />
                              </FacebookShareButton>
                              <WhatsappShareButton
                                url="www.example.com"
                                title="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                              >
                                <WhatsappIcon size={40} round />
                              </WhatsappShareButton>
                              <TwitterShareButton
                                url="www.example.com"
                                title="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                              >
                                <TwitterIcon size={40} round />
                              </TwitterShareButton>
                              <EmailShareButton
                                url="www.example.com"
                                subject="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                                body="hghfghfgffgdfgd body"
                                separator
                              >
                                <EmailIcon size={40} round />
                              </EmailShareButton>
                              <FacebookMessengerShareButton
                                url="www.example.com"
                                title="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                                appId="2750775745168996"
                              >
                                <FacebookMessengerIcon size={40} round />
                              </FacebookMessengerShareButton>
                              <LinkedinShareButton
                                url="www.example.com"
                                title="linkjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
                                className="Demo__some-network__share-button"
                              >
                                <LinkedinIcon size={40} round />
                              </LinkedinShareButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </div>
    );
  }
}
