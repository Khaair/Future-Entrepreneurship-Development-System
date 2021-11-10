const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    postcode: String,
    education: {
      type: String,
    },
    preaddress: {
      type: String,
    },
    permanentaddress: {
      type: String,
    },
    selectedproduct: {
      type: Array,
      default: [],
    },
    dist: String,
    thana: String,
    website: String,
    fblink: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    activeToken: String,
    earning: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("users", UserSchema);
