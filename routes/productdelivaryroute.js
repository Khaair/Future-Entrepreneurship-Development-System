const router = require("express").Router();
const Productdelivaryinfo = require("../model/Productdelivay_info");
router.post("/savedelivary", (req, res) => {
  console.log(req.body);

  const product = new Productdelivaryinfo(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get("/getdelivaryreport", async (req, res) => {
  await Productdelivaryinfo.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteproductdelivaryinfo/:id", async (req, res) => {
  // console.log(req.params.id);
  Productdelivaryinfo.deleteOne({ _id: req.params.id })
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
router.post("/updatedelivaryinfo", async (req, res) => {
  Productdelivaryinfo.findOne({ _id: req.body.updatableid }).then((info) => {
    if (info) {
      console.log(info);
      info.desdistributor = req.body.desdistributor;
      info.dprice = req.body.dprice;
      info.scost = req.body.scost;
      info.aprofit = req.body.aprofit;
      info.pcost = req.body.pcost;
      info.tmedium = req.body.tmedium;
      info.stime = req.body.stime;
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
