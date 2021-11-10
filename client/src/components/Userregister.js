import React, { Component } from "react";
import nogodlogo from "../assets/logo/nogodlogo.png";
import bikashlogo from "../assets/logo/bikashlogo.jfif";
import roketlogo from "../assets/logo/roketlogo.png";
import logo200Image from "../assets/logo/1.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Myloader from "./Myloader";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from "multiselect-react-dropdown";
import URL from "./Url";
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";

class Userregister extends Component {
  constructor(props) {
    super();
    this.state = {
      fullname: "",
      username: "",
      mobile: "",
      email: "",
      dateofbirth: "",
      gender: "",
      postcode: "",
      education: "",
      preaddress: "",
      permanentaddress: "",
      selectedproduct: [],
      password: "",
      password_confirmation: "",
      redirect: false,
      redirecttocheck: false,
      area: [],
      thanas: [],
      website: "",
      fblink: "",
      dist: "",
      thana: "",
      error: "",
      loding: false,
      available: [],
      isPasswordShown: false,
    };
  }
  fetchproducts = async () => {
    await axios
      .get(`${URL}/getproducts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.length) {
          data.data.map((item) => {
            this.state.available.push({ name: item.pid });
          });
        } else {
          this.setState({ products: [] });
        }
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  };
  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedproduct: selectedList });
  };
  formsubmit = async (e) => {
    e.preventDefault();
    this.setState({ loding: true });
    await axios
      .post(
        `${URL}/register`,
        {
          fullname: this.state.fullname,
          username: this.state.username,
          mobile: this.state.mobile,
          email: this.state.email,
          dateofbirth: this.state.dateofbirth,
          gender: this.state.gender,
          postcode: this.state.postcode,
          education: this.state.education,
          dist: this.state.dist,
          thana: this.state.thana,
          website: this.state.website,
          fblink: this.state.fblink,
          preaddress: this.state.preaddress,
          permanentaddress: this.state.permanentaddress,
          selectedproduct: this.state.selectedproduct,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((re) => {
        if (re.data.messege.success) {
          this.setState({ loding: false, redirect: true });
          this.setState({ error: "Please check Your Gmail To activate" });
          this.notify();
          this.props.history.push("/userregistermesege");
        }

        if (!re.data.messege.success) {
          this.setState({ loding: false, error: re.data.messege.msg });
          this.notify();
        }
      })
      .catch((err) => {
        // // console.log(err.response.data.message.msg)
        this.setState({ loding: false });
        //  this.notify();

        // // console.log(err)

        console.log("eee", err);
      });
  };
  fetcharea = async () => {
    await axios
      .get(`${URL}/areas`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((area) => {
        console.log(area.data[0].area);
        this.setState({ area: area.data[0].area });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchproducts();
    this.fetcharea();
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  distset = (data) => {
    this.setState({ dist: data.target.value });

    this.state.area.map((item) => {
      if (item.dist === data.target.value) {
        this.setState({
          thanas: item.thana,
        });
      }
    });
    this.setState({ thana: "" });
  };
  thanaset = (data) => {
    this.setState({ thana: data.target.value });
  };
  render() {
    return (
      <div className="container register">
        {this.state.loding ? (
          <Myloader />
        ) : (
          <div className="row">
            <div className="text-center pb-4">
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 60, height: 60, cursor: "pointer" }}
                alt="logo"
              />
            </div>
            <form className="col-md-12 register-right">
              <div className="col-md-12 register-right">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <h3 className="register-heading">Apply as a Partner</h3>

                    <div className="row register-form">
                      <div className="col-md-10">
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name="fullname"
                              value={this.fullname}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Full Name *"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name="username"
                              value={this.state.username}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Username *"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name="mobile"
                              value={this.state.mobile}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Mobile Number"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="email"
                              name="email"
                              value={this.state.email}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your email*"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>
                              Write Your Education:
                              <div>
                                <TextareaAutosize
                                  name="education"
                                  value={this.state.education}
                                  onChange={this.savetostate}
                                  style={{ width: "300px", height: "300px" }}
                                />
                              </div>
                            </label>
                          </div>

                          <div className="form-group col-md-6">
                            <label>Please select your Date of birth</label>
                            <DatePicker
                              selected={this.state.dateofbirth}
                              onChange={(date) =>
                                this.setState({ dateofbirth: date })
                              }
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label>
                              Present Address:
                              <div>
                                <TextareaAutosize
                                  name="preaddress"
                                  value={this.state.preaddress}
                                  onChange={this.savetostate}
                                  style={{ width: "300px", height: "300px" }}
                                />
                              </div>
                            </label>
                          </div>

                          <div className="form-group col-md-6">
                            <label>
                              Permanent Address:
                              <div>
                                <TextareaAutosize
                                  name="permanentaddress"
                                  value={this.state.permanentaddress}
                                  onChange={this.savetostate}
                                  style={{ width: "300px", height: "300px" }}
                                />
                              </div>
                            </label>
                          </div>
                        </div>{" "}
                        <div className="form-group form-row d-inline-flex">
                          <div style={{ marginRight: "40px" }}>
                            <label>Select Gender:</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios1"
                              value="male"
                              name="gender"
                              onChange={this.savetostate}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios2"
                              value="female"
                              name="gender"
                              onChange={this.savetostate}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios2"
                            >
                              Female
                            </label>
                          </div>
                          <div className="form-check disabled">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="exampleRadios"
                              id="exampleRadios3"
                              value="others"
                              name="gender"
                              onChange={this.savetostate}
                            />
                            <label
                              className="form-check-label"
                              for="exampleRadios3"
                            >
                              Others
                            </label>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Select Post Code
                            </label>
                            <input
                              type="text"
                              name="postcode"
                              value={this.state.postcode}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Postcode*"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">
                              Select availabel Product
                            </label>
                            <Multiselect
                              options={this.state.available} // Options to display in the dropdown
                              selectedValues={this.state.selectedproduct} // Preselected value to persist in dropdown
                              onSelect={this.onSelect} // Function will trigger on select event
                              onRemove={this.onRemove} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label style={{ paddingRight: "5px" }}>
                              Select District
                            </label>

                            <select
                              className="form-control"
                              onChange={this.distset}
                            >
                              <option value="0">Select District</option>
                              {this.state.area.map((item, index) => {
                                return (
                                  <option key={index} value={`${item.dist}`}>
                                    {item.dist}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label style={{ paddingRight: "5px" }}>
                              Select Thana
                            </label>

                            <select
                              className="form-control"
                              onChange={this.thanaset}
                            >
                              <option value={this.state.thana}>
                                Select Thana
                              </option>
                              {this.state.thanas.map((item, index) => {
                                return (
                                  <option key={index} value={`${item}`}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name="fblink"
                              value={this.state.fblink}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Facebook Link *"
                            />
                          </div>
                          <div className="form-group col-md-6">
                            <input
                              type="text"
                              name="website"
                              value={this.state.website}
                              onChange={this.savetostate}
                              className="form-control"
                              placeholder="Your Username Website*"
                            />
                          </div>
                        </div>
                        <div
                          className="form-group"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <input
                            type={
                              this.state.isPasswordShown ? "text" : "password"
                            }
                            name="password"
                            value={this.state.password}
                            onChange={this.savetostate}
                            className="form-control"
                            placeholder="Password *"
                          />{" "}
                          <i
                            style={{ marginLeft: "12px", marginTop: "15px" }}
                            className="fa fa-eye password-icon"
                            onClick={this.togglePasswordVisiblity}
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <input
                            type={
                              this.state.isPasswordShown ? "text" : "password"
                            }
                            name="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.savetostate}
                            className="form-control"
                            placeholder="Confirm Password *"
                          />
                          <i
                            style={{ marginLeft: "12px", marginTop: "15px" }}
                            className="fa fa-eye password-icon"
                            onClick={this.togglePasswordVisiblity}
                          />
                        </div>
                      </div>

                      <input
                        type="submit"
                        onClick={this.formsubmit}
                        className="btnRegister"
                        defaultValue="Register"
                      />
                    </div>
                    <div className="d-flex justify-content-center links">
                      <a href="/userlogin">Already have account?</a>
                    </div>
                    <div className="d-flex justify-content-center links">
                      <a href="/">Go Back</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Userregister);
