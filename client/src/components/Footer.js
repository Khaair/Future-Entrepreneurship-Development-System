import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container bottom_border">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 col">
                <h5 className="headin5_amrc col_white_amrc pt2">About Us</h5>
                {/*headin5_amrc*/}
                <p className="mb10">We belive in ourselvs</p>
                <ul className="footer-social">
                  <li>
                    <a
                      className="facebook hb-xs-margin"
                      href="https://www.facebook.com/Uddoktabd.bond.5"
                    >
                      <span className="hb hb-xs spin hb-facebook">
                        <i className="fab fa-facebook-f" />
                      </span>
                    </a>
                  </li>

                  <li>
                    <a className="googleplus hb-xs-margin" href="#">
                      <span className="hb hb-xs spin hb-google-plus">
                        <i className="fab fa-google-plus-g" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
                {/*headin5_amrc*/}
                <ul className="footer_ul_amrc">
                  <li>
                    <a href="#">
                      <i className="fas fa-long-arrow-alt-right" />
                      Our Team{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-long-arrow-alt-right" />
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-long-arrow-alt-right" />
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fas fa-long-arrow-alt-right" />
                      Get In Touch
                    </a>
                  </li>
                </ul>
                {/*footer_ul_amrc ends here*/}
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col">
                <h5 className="headin5_amrc col_white_amrc pt2">Follow us</h5>
                {/*headin5_amrc ends here*/}
                <ul className="footer_ul2_amrc">
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter fleft padding-right" />{" "}
                    </a>
                    <p>
                      Uddokta facebook Page
                      <a href="https://www.facebook.com/groups/209982657507630">
                        Click here
                      </a>
                    </p>
                  </li>
                </ul>
                {/*footer_ul2_amrc ends here*/}
              </div>
            </div>
          </div>
          <div className="container">
            <p className="copyright text-center">
              All Rights Reserved. © 2021 <a href="#">uddoktabd</a> Developed By
              :
              <a href="https://www.facebook.com/groups/trippledev">
                TrippleDev
              </a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
