const router = require("express").Router();
const Product = require("../model/Products_info");
const User = require("../model/Users");
const multer = require("multer");
const {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
  Useractivate,
  Newuseractivate,
} = require("../utils/Auth");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", (req, res) => {
  console.log(req.body);

  //save all the data we got from the client into the DB
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/getproducts", async (req, res) => {
  await Product.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get(
  "/getproductsspecific/:username",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    // console.log(req.params.username, req.user.role);
    if (req.user.role === "admin") {
      await Product.find({})
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      const specificproduct = [];
      await User.findOne({ username: req.params.username }).then(
        async (info) => {
          // console.log(info.selectedproduct);
          info.selectedproduct.map(async (item, index) => {
            await Product.find({ pid: item.name })
              .then((data) => {
                specificproduct.push(data[0]);

                console.log(info.selectedproduct.length, index + 1);
                if (info.selectedproduct.length === index + 1) {
                  res.send(specificproduct);
                }
              })
              .catch((err) => {
                res.send(err);
              });
          });
        }
      );
      // res.send(specificproduct);
    }
  }
);

router.get("/getreport", async (req, res) => {
  await Product.aggregate([
    {
      $lookup: {
        from: "productdelivary_infos",
        localField: "pid",
        foreignField: "pid",
        as: "inventory_docs",
      },
    },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteproduct/:id", async (req, res) => {
  // console.log(req.params.id);
  Product.deleteOne({ _id: req.params.id })
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

router.post("/updateproduct", async (req, res) => {
  console.log(req.body);
  Product.findOne({ _id: req.body.updatableid }).then((info) => {
    if (info) {
      console.log(info);
      info.Images = req.body.Images;
      info.pseasion = req.body.pseasion;
      info.pname = req.body.pname;
      info.dist = req.body.dist;
      info.thana = req.body.thana;
      info.pdetails = req.body.pdetails;
      info.pid = req.body.pid;
      info.pqty = req.body.pqty;
      info.sprice = req.body.sprice;
      info.psource = req.body.psource;
      info.pstock = req.body.pstock;
      info.psupplier = req.body.psupplier;
      info
        .save()
        .then((data) => {
          console.log("ff", data);
          res.json({
            data: data,
            success: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});
module.exports = router;
