import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from "axios";
import URL from "./Url";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Link } from "react-router-dom";
import Myslider from "./Myslider";
// import OwlCarousel from "react-owl-carousel";

// import "owl.carousel/dist/assets/owl.carousel.css";

// import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliders: [],
      grettings: [],
      services: [],
      slide: "",
      portfolios: [],
      loding: false,
    };
  }
  fetchsliders = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchslider`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].slider);
        if (data.data[0].slider.length) {
          // console.log(data.data);
          this.setState({
            slide: data.data[0].slider[0],
            sliders: data.data[0].slider,
            loding: false,
          });
        } else {
          this.setState({ sliders: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  fetchgrettings = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchgrettings`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("greeting", data.data);
        if (data.data.length) {
          // console.log(data.data);
          this.setState({ grettings: data.data, loding: false });
        } else {
          this.setState({ grettings: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  fetchservices = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchservices`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].services);
        if (data.data[0].services.length) {
          // console.log(data.data);
          this.setState({ services: data.data[0].services, loding: false });
        } else {
          this.setState({ services: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };

  fetchportfolios = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchportfolios`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].portfolios);
        if (data.data[0].portfolios.length) {
          // console.log(data.data);
          this.setState({ portfolios: data.data[0].portfolios, loding: false });
        } else {
          this.setState({ portfolios: [], loding: false });
        }
      })
      .catch((err) => {
        console.log("ffff", err);

        // this.setState({ loding: false });
      });
  };
  componentDidMount() {
    this.fetchgrettings();
    this.fetchportfolios();
    this.fetchservices();
    this.fetchsliders();
  }
  render() {
    return (
      <div className="wrapper-main">
        <Header />
        {/* <img
          className="img-fluid rounded"
          style={{ width: "100%", height: "400px" }}
          src={`${URL}/${this.state.slide.img}`}
          alt=""
        /> */}
        {/* 
        <div className="container-fluid">
          <OwlCarousel
            items={1}
            className="owl-theme"
            autoplay={true}
            loop
            margin={4}
          >
            {this.state.sliders.map((item, index) => {
              return (
                <>
                  <div class="item">
                    <h4>
                      <img
                        className="img-fluid rounded"
                        style={{ width: "100%", height: "400px" }}
                        src={`${URL}/${item.img}`}
                        alt=""
                      />
                    </h4>
                  </div>
                </>
              );
            })}
          </OwlCarousel>
        </div> */}
        {/* Page Content */}
        <div className="container">
          {/* About Section */}
          <div className="about-main">
            {this.state.grettings.map((item, index) => {
              return (
                <div className="row">
                  <div className="col-lg-6">
                    <h2>{item.greetingtitle}</h2>
                    <p>{ReactHtmlParser(item.greetingqoute)}</p>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="img-fluid rounded"
                      style={{ width: "100%", height: "420px" }}
                      src={`${URL}/${item.greetingimg}`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}

            {/* /.row */}
          </div>
        </div>
        <div className="services-bar">
          <div className="container">
            <h1 className="py-4">Our Best Services </h1>
            {/* Services Section */}
            <div className="row">
              {this.state.services.map((item, index) => {
                return (
                  <div className="col-lg-4 mb-4" key={index}>
                    <div className="card h-100">
                      <div className="card-img">
                        <img
                          className="img-fluid"
                          src={`${URL}/${item.img}`}
                          alt=""
                        />
                      </div>
                      <div className="card-body">
                        <h4 className="card-header"> {item.title} </h4>
                        <p className="card-text">
                          {ReactHtmlParser(item.qoute)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* /.row */}
          </div>
        </div>

        {/* Contact Us
        <div className="touch-line">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Molestias, expedita, saepe, vero rerum deleniti beatae veniam
                  harum neque nemo praesentium cum alias asperiores commodi.
                </p>
              </div>
              <div className="col-md-4">
                <Link
                  className="btn btn-lg btn-secondary btn-block"
                  to="/contact"
                >
                  {" "}
                  Contact Us{" "}
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        {/* <MessengerCustomerChat
    pageId="112437417295403"
    appId="2750775745168996"
  /> */}
        <Footer />
      </div>
    );
  }
}

export default Home;
