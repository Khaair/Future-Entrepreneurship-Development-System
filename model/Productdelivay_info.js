const { Schema, model, Mongoose } = require("mongoose");

const Productdelivary_info_Schema = new Schema(
  {
    pid: String,
    pname: String,
    sprice: String,
    pqty: String,
    psource: String,
    psupplier: String,
    sprice: String,
    desdistributor: String,
    dprice: String,
    scost: String,
    pcost: String,
    aprofit: String,
    transporter: String,
    tmedium: String,
    stime: String,
  },
  { timestamps: true }
);
module.exports = model("productdelivary_info", Productdelivary_info_Schema);
