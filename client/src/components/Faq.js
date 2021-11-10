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
class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqs: [],
      portfolios: [],
      loding: false,
    };
  }
  fetchfaqs = async () => {
    this.setState({ loding: false });
    await axios
      .get(`${URL}/fetchfaqs`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log("uuu", data.data[0].faqs);
        if (data.data[0].faqs.length) {
          // console.log(data.data);
          this.setState({ faqs: data.data[0].faqs, loding: false });
        } else {
          this.setState({ faqs: [], loding: false });
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
    this.fetchfaqs();
    this.fetchportfolios();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="full-title">
          <div className="container">
            {/* Page Heading/Breadcrumbs */}
            <h1 className="mt-4 mb-3">FAQ</h1>
            <div className="breadcrumb-main">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">FAQ</li>
              </ol>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <div className="faq-main">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion" id="accordionExample">
              {this.state.faqs.map((item, index) => {
                return (
                  <div className="card accordion-single" key={index}>
                    <div className="card-header" id={1}>
                      <h5 className="mb-0">
                        <button
                          className="btn btn-link"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          {item.title}
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        {ReactHtmlParser(item.ans)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="container">
          {/* Portfolio Section */}
          <div className="portfolio-main">
            <h2>Our Portfolio</h2>
            <div className="col-lg-12">
              <div className="project-menu text-center">
                <button className="btn btn-primary active" data-filter="*">
                  All
                </button>
                <button data-filter=".business" className="btn btn-primary">
                  Business
                </button>
                <button data-filter=".travel" className="btn btn-primary">
                  Travel
                </button>
                <button data-filter=".financial" className="btn btn-primary">
                  Financial
                </button>
                <button data-filter=".academic" className="btn btn-primary">
                  Academic
                </button>
              </div>
            </div>
            <div id="projects" className="projects-main row">
              {this.state.portfolios.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-lg-4 col-sm-6 pro-item portfolio-item financial"
                  >
                    <div className="card h-100">
                      <div className="card-img">
                        <a
                          href="images/portfolio-img-01.jpg"
                          data-fancybox="images"
                        >
                          <img
                            className="card-img-top"
                            src={`${URL}/${item.img}`}
                            alt=""
                          />
                          <div className="overlay">
                            <i className="fas fa-arrows-alt" />
                          </div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h4 className="card-title">
                          <a href="#">{item.title}</a>
                        </h4>
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

export default Faq;
