const { Schema, model, Mongoose } = require("mongoose");

const Product_info_Schema = new Schema(
  {
    Images: {
      type: Array,
      default: [],
    },
    pname: String,
    pid: String,
    dist: String,
    thana: String,
    sprice: String,
    pqty: String,
    psource: String,
    psupplier: String,
    pstock: String,
    pseasion: String,
    pdetails: String,
  },
  { timestamps: true }
);
module.exports = model("products_info", Product_info_Schema);
