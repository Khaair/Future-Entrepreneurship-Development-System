import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import URL from "./Url";
import axios from "axios";
import Moment from "react-moment";
import Dropzone from "react-dropzone";
import Modal from "react-modal";

import Dropdown from "react-bootstrap/Dropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "./Header";
import Footer from "./Footer";

export default class Pubproducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
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
          this.setState({ products: data.data });
        } else {
          this.setState({ products: [] });
        }
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchproducts();
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="row mt-2 justify-content-center">
          <h2>Our Products</h2>
        </div>
        <table className="table">
          <thead>
            <th>S No</th>
            <th>P.Name</th>
            <th>P.ID</th>
            <th>Qty</th>
            <th>Source</th>
            <th>Source Price</th>
            <th>Transporter</th>
            <th>SeasionTime</th>
            <th>History</th>
          </thead>
          <tbody>
            {this.state.products.map((item, index) => {
              return (
                <>
                  <tr>
                    <td data-label="S.No">{index + 1}</td>
                    <td data-label="P.Name">{item.pname}</td>
                    <td data-label="P.ID">{item.pid}</td>
                    <td data-label="Qty">{item.pqty}</td>
                    <td data-label="Source">{item.psource}</td>
                    <td data-label="Source Price">{item.sprice}</td>
                    <td data-label="Transporter">{item.psupplier}</td>
                    <td data-label="Seasion Time">{item.pseasion}</td>
                    <td data-label="History">
                      <button>Deliveries</button>
                    </td>
                  </tr>
                  <hr style={{ border: "2px solid" }}></hr>
                </>
              );
            })}
          </tbody>
        </table>
        <Footer />
      </div>
    );
  }
}
