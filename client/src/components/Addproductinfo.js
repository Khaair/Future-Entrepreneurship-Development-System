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
import TextareaAutosize from "react-textarea-autosize";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

class Addproductinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Images: [],
      pname: "",
      pid: "",
      pqty: "",
      area: [],
      thanas: [],
      dist: "",
      thana: "",
      psource: "",
      psupplier: "",
      pstock: "",
      pseasion: "",
      pdetails: "",
      sprice: "",
      updatableid: "",
      editmodal: false,
      products: [],
    };
  }
  Changeproductdetails = (e, data) => {
    this.setState({ pdetails: data.getData() });
  };

  Change = (data) => {
    this.setState({ [data.target.name]: data.target.value });
  };

  onRemove = (selectedList, removedItem) => {
    const currentIndex = this.state.selectedsize.indexOf(removedItem);

    let newSizes = [...this.state.selectedsize];
    newSizes.splice(currentIndex, 1);

    this.setState({ selectedsize: newSizes });
  };

  onDrop = (files) => {
    console.log(files[0]);

    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    axios
      .post(`${URL}/uploadImage`, formData, config)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            Images: [...this.state.Images, response.data.image],
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

  onDelete = (image) => {
    const currentIndex = this.state.Images.indexOf(image);

    let newImages = [...this.state.Images];
    newImages.splice(currentIndex, 1);

    this.setState({ Images: newImages });
  };
  async componentDidMount() {
    await axios
      .get(`${URL}/getmenus`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.setState({ data: data.data });
        const category = data.data.map((item) => {
          return { name: item.CategoryName };
        });

        this.setState({ options: category });
      });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      Images,
      pseasion,
      pname,
      dist,
      thana,
      pdetails,
      pid,
      pqty,
      sprice,
      psource,
      pstock,
      psupplier,
    } = this.state;

    if (!Images) {
      return alert("Give a image of the product!");
    }

    const variables = {
      Images,
      pseasion,
      pname,
      dist,
      thana,
      pdetails,
      pid,
      pqty,
      sprice,
      psource,
      pstock,
      psupplier,
    };

    axios.post(`${URL}/uploadProduct`, variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        this.fetchproducts();
        this.setState({
          pname: "",
          pqty: "",
          pid: "",
          splice: "",
          psource: "",
          psupplier: "",
          pseasion: "",
          pdetails: "",
        });
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  openModal = () => {
    this.setState({ setIsOpen: true });
  };
  closeeditmodal = () => {
    this.setState({ editmodal: false });
  };
  closeModal = () => {
    this.setState({ setIsOpen: false });
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
        console.log("kk", area.data[0].area);
        this.setState({ area: area.data[0].area });
      })
      .catch((err) => {
        console.log(err);
      });
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
  remove = async (id) => {
    await axios
      .get(
        `${URL}/deleteproduct/${id}`,

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
  edit = (id) => {
    this.state.products.map((item, index) => {
      if (id == item._id) {
        this.setState({
          updatableid: id,
          Images: item.Images,
          pseasion: item.pseasion,
          pname: item.pname,
          dist: item.dist,
          thana: item.thana,
          pdetails: item.pdetails,
          pid: item.pid,
          pqty: item.pqty,
          sprice: item.sprice,
          psource: item.psource,
          pstock: item.pstock,
          psupplier: item.psupplier,
          setIsOpen: true,
        });
      }
    });
  };

  onUpdate = async (e) => {
    e.preventDefault();
    const {
      updatableid,
      Images,
      pseasion,
      pname,
      dist,
      thana,
      pdetails,
      pid,
      pqty,
      sprice,
      psource,
      pstock,
      psupplier,
    } = this.state;

    await axios
      .post(
        `${URL}/updateproduct`,
        {
          updatableid,
          Images,
          pseasion,
          pname,
          dist,
          thana,
          pdetails,
          pid,
          pqty,
          sprice,
          psource,
          pstock,
          psupplier,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        alert("Successfully Updated");
        this.setState({
          setIsOpen: false,
          pname: "",
          pqty: "",
          pid: "",
          Images: [],
          splice: "",
          psource: "",
          psupplier: "",
          pseasion: "",
          pdetails: "",
        });
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchproducts();
    this.fetcharea();
  }

  render() {
    const { editorState, selected } = this.state;

    return (
      <div className="container-fluid">
        <Modal
          isOpen={this.state.setIsOpen}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
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
                  {console.log("getRootProps", { ...getRootProps() })}
                  {console.log("getInputProps", { ...getInputProps() })}
                  <input {...getInputProps()} />
                  <i className="fa fa-plus" style={{ fontSize: "3rem" }}></i>
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
              {this.state.Images.map((image, index) => (
                <div onClick={() => this.onDelete(image)}>
                  <img
                    style={{
                      minWidth: "300px",
                      width: "300px",
                      height: "240px",
                    }}
                    src={`${URL}/${image}`}
                    alt={`productImg-${index}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={this.onUpdate}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Product Name</label>
                <input
                  type="text"
                  name="pname"
                  onChange={this.Change}
                  value={this.state.pname}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Product Code</label>
                <input
                  type="text"
                  name="pid"
                  onChange={this.Change}
                  value={this.state.pid}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter product code"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Quantity</label>
                <input
                  type="text"
                  name="pqty"
                  onChange={this.Change}
                  value={this.state.pqty}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Quantity/Size"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Product source</label>
                <input
                  type="text"
                  name="psource"
                  onChange={this.Change}
                  value={this.state.psource}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Product Source"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Product supplier</label>
                <input
                  type="text"
                  name="psupplier"
                  onChange={this.Change}
                  value={this.state.psupplier}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Product Supplier"
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="exampleInputEmail1">Our stock</label>
                <input
                  type="text"
                  name="pstock"
                  onChange={this.Change}
                  value={this.state.pstock}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Stock"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label style={{ paddingRight: "5px" }}>Select District</label>

                <select className="form-control" onChange={this.distset}>
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
                <label style={{ paddingRight: "5px" }}>Select Thana</label>

                <select className="form-control" onChange={this.thanaset}>
                  <option value={this.state.thana}>Select Thana</option>
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
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Seasion-duration</label>
                <input
                  type="text"
                  name="pseasion"
                  onChange={this.Change}
                  value={this.state.pseasion}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Product Seasion"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Product Details</label>

                <TextareaAutosize
                  name="pdetails"
                  value={this.state.pdetails}
                  onChange={this.Change}
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Source Price</label>
                <input
                  type="text"
                  name="sprice"
                  onChange={this.Change}
                  value={this.state.sprice}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Source Price"
                />
              </div>
            </div>

            <div className="row justify-content-around">
              <button type="submit">Update Now</button>
              <button type="button" onClick={this.closeModal}>
                close
              </button>
            </div>
          </form>
        </Modal>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
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
                {console.log("getRootProps", { ...getRootProps() })}
                {console.log("getInputProps", { ...getInputProps() })}
                <input {...getInputProps()} />
                <i className="fa fa-plus" style={{ fontSize: "3rem" }}></i>
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
            {this.state.Images.map((image, index) => (
              <div onClick={() => this.onDelete(image)}>
                <img
                  style={{ minWidth: "300px", width: "300px", height: "240px" }}
                  src={`${URL}/${image}`}
                  alt={`productImg-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="exampleInputEmail1">Product Name</label>
              <input
                type="text"
                name="pname"
                onChange={this.Change}
                value={this.state.pname}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Name"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="exampleInputEmail1">Product Code</label>
              <input
                type="text"
                name="pid"
                onChange={this.Change}
                value={this.state.pid}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter product code"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="exampleInputEmail1">Quantity</label>
              <input
                type="text"
                name="pqty"
                onChange={this.Change}
                value={this.state.pqty}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Quantity/Size"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="exampleInputEmail1">Product source</label>
              <input
                type="text"
                name="psource"
                onChange={this.Change}
                value={this.state.psource}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Source"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="exampleInputEmail1">Product supplier</label>
              <input
                type="text"
                name="psupplier"
                onChange={this.Change}
                value={this.state.psupplier}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Supplier"
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="exampleInputEmail1">Our stock</label>
              <input
                type="text"
                name="pstock"
                onChange={this.Change}
                value={this.state.pstock}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Stock"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label style={{ paddingRight: "5px" }}>Select District</label>

              <select className="form-control" onChange={this.distset}>
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
              <label style={{ paddingRight: "5px" }}>Select Thana</label>

              <select className="form-control" onChange={this.thanaset}>
                <option value={this.state.thana}>Select Thana</option>
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
            <div className="form-group col-md-4">
              <label htmlFor="exampleInputEmail1">Seasion-duration</label>
              <input
                type="text"
                name="pseasion"
                onChange={this.Change}
                value={this.state.pseasion}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Seasion"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="exampleInputEmail1">Product Details</label>

              <TextareaAutosize
                name="pdetails"
                value={this.state.pdetails}
                onChange={this.Change}
                style={{ width: "300px", height: "300px" }}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="exampleInputEmail1">Source Price</label>
              <input
                type="text"
                name="sprice"
                onChange={this.Change}
                value={this.state.sprice}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Source Price"
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <button type="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </form>
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
            <th>District</th>
            <th>Thana</th>
            <th>Source Price</th>
            <th>Transporter</th>
            <th>SeasionTime</th>

            <th>History</th>
            <th>Actions</th>
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
                    <td data-label="District">{item.dist}</td>
                    <td data-label="Thana">{item.thana}</td>
                    <td data-label="Source Price">{item.sprice}</td>
                    <td data-label="Transporter">{item.psupplier}</td>
                    <td data-label="Seasion Time">{item.pseasion}</td>
                    <td data-label="History">
                      <button>Deliveries</button>
                    </td>

                    <td data-label="Actions">
                      <button
                        type="button"
                        onClick={() => this.remove(item._id)}
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                      /
                      <button type="button" onClick={() => this.edit(item._id)}>
                        <i class="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                  <hr style={{ border: "2px solid" }}></hr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Addproductinfo;
