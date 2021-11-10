const router = require("express").Router();
const Withdraw = require("../model/Withdraw");
const User = require("../model/Users");
const { check, body, validationResult } = require("express-validator");
const {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
} = require("../utils/Auth");

router.post(
  "/withdraw",
  userAuth,
  checkRole(["user", "admin"]),

  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name is required and minimum 3 letter."),
    body("username").isLength({ min: 3 }).withMessage("username is required."),

    body("paymenttype").not().isEmpty().withMessage("paymenttype is required."),
    body("withdrawnumber")
      .not()
      .isEmpty()
      .withMessage("Withdraw information is required."),
    body("amount")
      .not()
      .isEmpty()
      .withMessage("amount information is required."),
    body("contactnumber")
      .not()
      .isEmpty()
      .withMessage("contactnumber is required.")
      .isLength({ min: 11 })
      .withMessage("Mobile Number should be 11 digit")
      .isNumeric()
      .withMessage("Mobile number is invalid."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let singleerror = errors.array();

    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.json({
        messege: { msg: singleerror[0].msg, success: false },
      });
    }
    // console.log(req.body);
    const newWithdraw = new Withdraw({
      ...req.body,
      username: req.user.username,
    });

    newWithdraw
      .save()
      .then(async (data) => {
        if (data) {
          await User.findOneAndUpdate({ username: req.body.username }).then(
            (user) => {
              if (user) {
                user.earning =
                  parseInt(user.earning) - parseInt(req.body.amount);
                user.myrefused = parseInt(user.myrefused) + 1;
                user.save().then((data) => {
                  return res.json({
                    messege: {
                      msg: "Your request has been accepted ",
                      success: true,
                    },
                  });
                });
              }
            }
          );
        }

        // console.log("withdraw");
      })
      .catch((error) => {
        console.log(error);
        return res.json({
          messege: {
            msg: "Something went wrong please try agagin",
            success: false,
          },
        });
      });
  }
);
router.get(
  "/withdraw",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    // console.log(req.query.type);
    if (req.query.type === "user") {
      Withdraw.find({ username: req.user.username })
        .then((withdraw) => {
          //  console.log(withdraw)
          res.send(withdraw);
        })
        .catch((err) => {
          return res.status(404).json({
            messege: {
              msg: "Something went wrong please contact with Chaincomes",
              success: false,
            },
          });
        });
    } else if (req.query.type === "request") {
      Withdraw.find({ status: "processing" })
        .then((withdraw) => {
          //  console.log(withdraw)
          res.send(withdraw);
        })
        .catch((err) => {
          return res.status(404).json({
            messege: {
              msg: "Something went wrong please contact with Chaincomes",
              success: false,
            },
          });
        });
    } else if (req.query.type === "paid") {
      Withdraw.find({ status: "paid" })
        .then((withdraw) => {
          //  console.log(withdraw)
          res.send(withdraw);
        })
        .catch((err) => {
          return res.status(404).json({
            messege: {
              msg: "Something went wrong please contact with Chaincomes",
              success: false,
            },
          });
        });
    }
  }
);

router.get("/deletewithdraw/:id", async (req, res) => {
  // console.log(req.params.id);
  Withdraw.deleteOne({ _id: req.params.id })
    .then((data) => {
      return res.status(200).json({
        messege: {
          msg: "deleted",
          success: true,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        messege: {
          msg: "unable to deleted",
          success: false,
        },
      });
    });
});

router.get("/acceptwithdraw/:id", async (req, res) => {
  Withdraw.findOne({ _id: req.params.id }).then((user) => {
    user.status = "paid";
    user.save().then((data) => {
      res.send(data);
    });
  });
});
module.exports = router;
