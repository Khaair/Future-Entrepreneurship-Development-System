import React, { Component } from "react";
import Footer from "./Footer";
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
class four extends Component {
  render() {
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
            <div className="error-img">
              {/* <img className="img-fluid" src="images/upcoming.png" alt="" /> */}
              <h2> Share Chaincome with your friend</h2>
              <div className="col-md-6">
                <p>
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
                </p>
              </div>
            </div>
            <h3>
              “Business opportunities are like buses, there's always another one
              coming.” – Richard Branson.
            </h3>
            <p>
              “Success is not final; failure is not fatal: it is the courage to
              continue that counts.” – Winston Churchill. ...{" "}
              <a href="/home">Homepage</a>
            </p>
            <a className="btn btn-primary" href="/home">
              {" "}
              Back To Homepage{" "}
            </a>
          </div>
          {/* /.jumbotron */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default four;
