import React, { Component } from "react";
import Modal from "react-modal";
import URL from "./Url";
import axios from "axios";
export default class Adddelivaryinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      pid: null,
      sprice: "",
      desdistributor: "",
      dprice: "",
      scost: "",
      pcost: "",
      aprofit: "",
      transporter: "",
      tmedium: "",
      stime: "",
      updatableid: "",
      editmodal: false,
      delivaryreports: [],
      setIsOpen: false,
    };
  }
  Change = (data) => {
    this.setState({ [data.target.name]: data.target.value });
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
  idset = (data) => {
    this.setState({ pid: data.target.value });

    this.state.products.map((item) => {
      if (item.pid === data.target.value) {
        this.setState({
          pname: item.pname,
          psupplier: item.psupplier,
          psource: item.psource,
          pqty: item.pqty,
          sprice: item.sprice,
        });
      }
    });
  };
  fetchproducts = async () => {
    await axios
      .get(`${URL}/getproductsspecific/${localStorage.getItem("username")}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          auth: localStorage.getItem("auth"),
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
        `${URL}/deleteproductdelivaryinfo/${id}`,

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
  componentWillMount() {
    Modal.setAppElement("body");
  }

  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  onSubmit = async (event) => {
    event.preventDefault();
    const {
      pid,
      pname,
      pqty,
      psource,
      psupplier,
      sprice,
      desdistributor,
      dprice,
      scost,
      aprofit,
      pcost,
      transporter,
      tmedium,
      stime,
    } = this.state;

    const variables = {
      pid,
      sprice,
      desdistributor,
      pname,
      pqty,
      psource,
      psupplier,
      dprice,
      scost,
      pcost,
      aprofit,
      transporter,
      tmedium,
      stime,
    };

    await axios.post(`${URL}/savedelivary`, variables).then((response) => {
      if (response.data.success) {
        alert("Delivary  Successfully Uploaded");
        this.fetchproducts();
        this.fetchdelivaryinfo();
        this.setState({
          sprice: "",
          desdistributor: "",
          dprice: "",
          scost: "",
          aprofit: "",
          pcost: "",
          transporter: "",
          tmedium: "",
          stime: "",
        });
      } else {
        alert("Failed to upload Product");
      }
    });
  };
  fetchdelivaryinfo = async () => {
    await axios
      .get(`${URL}/getdelivaryreport`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.length) {
          this.setState({ delivaryreports: data.data });
        } else {
          this.setState({ delivaryreports: [] });
        }
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getreport = async () => {
    await axios
      .get(`${URL}/getreport`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.length) {
          this.setState({ delivaryreports: data.data });
        } else {
          this.setState({ delivaryreports: [] });
        }
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  edit = (id) => {
    this.state.delivaryreports.map((item, index) => {
      if (id == item._id) {
        this.setState({
          updatableid: id,
          desdistributor: item.desdistributor,
          dprice: item.dprice,
          scost: item.scost,
          aprofit: item.aprofit,
          pcost: item.pcost,
          tmedium: item.tmedium,
          stime: item.stime,
          editmodal: true,
        });
      }
    });
  };
  onUpdate = async (e) => {
    const {
      updatableid,
      desdistributor,
      dprice,
      scost,
      aprofit,
      pcost,
      tmedium,
      stime,
    } = this.state;
    e.preventDefault();
    await axios
      .post(
        `${URL}/updatedelivaryinfo`,
        {
          updatableid,
          desdistributor,
          dprice,
          scost,
          aprofit,
          pcost,
          tmedium,
          stime,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        alert("Successfully Updated");
        this.setState({ editmodal: false });
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.fetchproducts();
    // this.fetchdelivaryinfo();
    this.fetchdelivaryinfo();
  }
  render() {
    return (
      <div classNa Subme="container-fluid">
        <Modal
          isOpen={this.state.setIsOpen}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label style={{ paddingRight: "5px" }}>Select Product Id</label>

                <select className="form-control" onChange={this.idset}>
                  <option value="0">Select Product Id</option>
                  {this.state.products.map((item, index) => {
                    return (
                      <option key={index} value={`${item.pid}`}>
                        {item.pid}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Shipping Medium</label>
                <input
                  type="text"
                  name="tmedium"
                  onChange={this.Change}
                  value={this.state.tmedium}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Medium"
                />
              </div>
            </div>
            {this.state.pid && this.state.pid != 0 && (
              <>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="exampleInputEmail1">Product Name</label>
                    <input
                      type="text"
                      name="stime"
                      value={this.state.pname}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="exampleInputEmail1">Product Quantity</label>
                    <input
                      type="text"
                      name="stime"
                      value={this.state.pqty}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="exampleInputEmail1">Product Source</label>
                    <input
                      type="text"
                      name="stime"
                      value={this.state.psource}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1">Supplier</label>
                    <input
                      type="text"
                      name="stime"
                      value={this.state.psupplier}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="exampleInputEmail1">Source Price</label>
                    <input
                      type="text"
                      name="stime"
                      value={this.state.sprice}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>{" "}
              </>
            )}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Shipping Time</label>
                <input
                  type="text"
                  name="stime"
                  onChange={this.Change}
                  value={this.state.stime}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Time"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Destination</label>
                <input
                  type="text"
                  name="desdistributor"
                  onChange={this.Change}
                  value={this.state.desdistributor}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Destination"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Des. Price</label>
                <input
                  type="text"
                  name="dprice"
                  onChange={this.Change}
                  value={this.state.dprice}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Destination Price"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Shipping Cost</label>
                <input
                  type="text"
                  name="scost"
                  onChange={this.Change}
                  value={this.state.scost}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Cost"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Processing Cost</label>
                <input
                  type="text"
                  name="pcost"
                  onChange={this.Change}
                  value={this.state.pcost}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Processing Cost"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Profit</label>
                <input
                  type="text"
                  name="aprofit"
                  onChange={this.Change}
                  value={this.state.aprofit}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Quantity"
                />
              </div>
            </div>
            <div className="row justify-content-around">
              <button type="submit">Add Now</button>
              <button onClick={this.closeModal}>close</button>
            </div>
          </form>
        </Modal>
        <Modal
          isOpen={this.state.editmodal}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
        >
          <form onSubmit={this.onUpdate}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Shipping Medium</label>
                <input
                  type="text"
                  name="tmedium"
                  onChange={this.Change}
                  value={this.state.tmedium}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Medium"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Shipping Time</label>
                <input
                  type="text"
                  name="stime"
                  onChange={this.Change}
                  value={this.state.stime}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Time"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Destination</label>
                <input
                  type="text"
                  name="desdistributor"
                  onChange={this.Change}
                  value={this.state.desdistributor}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Destination"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Des. Price</label>
                <input
                  type="text"
                  name="dprice"
                  onChange={this.Change}
                  value={this.state.dprice}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Destination Price"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Shipping Cost</label>
                <input
                  type="text"
                  name="scost"
                  onChange={this.Change}
                  value={this.state.scost}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Shipping Cost"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Processing Cost</label>
                <input
                  type="text"
                  name="pcost"
                  onChange={this.Change}
                  value={this.state.pcost}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Processing Cost"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="exampleInputEmail1">Profit</label>
                <input
                  type="text"
                  name="aprofit"
                  onChange={this.Change}
                  value={this.state.aprofit}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Quantity"
                />
              </div>
            </div>
            <div className="row justify-content-around">
              <button type="submit">Update Now</button>
              <button onClick={this.closeeditmodal}>close</button>
            </div>
          </form>
        </Modal>
        <div className="row justify-content-center">
          <h1 className="mt-4">Shipping Info</h1>
        </div>
        <hr></hr>

        <div className="row justify-content-end mr-2">
          <div className="d-md-inline-flex">
            <button type="button" onClick={this.openModal}>
              Add delivary info <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <table className="table">
          <thead>
            <th>S No</th>
            <th>P.Name</th>
            <th>P.ID</th>
            <th>Qty</th>
            <th>Source</th>
            <th>Transporter</th>
            <th>S.price</th>
            <th>Dest/Destributor</th>
            <th>Des.Price</th>
            <th>S.Cost</th>
            <th>P.Cost</th>
            <th>A.Profit</th>

            <th>T.Medium</th>
            <th>S.Time</th>
            <th>History</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {this.state.delivaryreports.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td data-label="S.No">{index + 1}</td>
                    <td data-label="P.Name">{item.pname}</td>
                    <td data-label="P.ID">{item.pid}</td>
                    <td data-label="Qty">{item.pqty}</td>
                    <td data-label="Source">{item.psource}</td>
                    <td data-label="Transporter">{item.psupplier}</td>
                    <td data-label="S.price">{item.sprice}</td>
                    <td data-label="Dest/Destributor">{item.desdistributor}</td>
                    <td data-label="Des.Price">{item.dprice}</td>
                    <td data-label="S.Cost">{item.scost}</td>
                    <td data-label="P.Cost">{item.pcost}</td>
                    <td data-label="A.Profit">{item.aprofit}</td>
                    <td data-label="T.Medium">{item.tmedium}</td>
                    <td data-label="S.Time">{item.stime}</td>

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
