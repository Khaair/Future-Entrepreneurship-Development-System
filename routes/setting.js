const router = require("express").Router();
const Setting = require("../model/Setting");
const multer = require("multer");
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
router.post("/slidersetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.slider.push({
          slidertitle: req.body.slidertitle,
          sliderqoute: req.body.sliderqoute,
          img: req.body.Image,
        });
        setting
          .save()
          .then((data) => {
            res.json({
              data: data,
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.slider.push({
                  slidertitle: req.body.slidertitle,
                  sliderqoute: req.body.sliderqoute,
                  img: req.body.Image,
                });
                setting
                  .save()
                  .then((data) => {
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchslider", async (req, res) => {
  await Setting.find({}, { slider: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteslider/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await Setting.updateOne(
    {},
    { $pull: { slider: { _id: req.params.id } } }
  );
  if (data) {
    res.json({
      data: data,
      success: true,
    });
  }
});
router.post("/servicessetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.services.push({
          title: req.body.title,
          qoute: req.body.qoute,
          img: req.body.Image,
        });
        setting
          .save()
          .then((data) => {
            res.json({
              data: data,
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.services.push({
                  title: req.body.title,
                  qoute: req.body.qoute,
                  img: req.body.Image,
                });
                setting
                  .save()
                  .then((data) => {
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchservices", async (req, res) => {
  await Setting.find({}, { services: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteservices/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await Setting.updateOne(
    {},
    { $pull: { services: { _id: req.params.id } } }
  );
  if (data) {
    res.json({
      data: data,
      success: true,
    });
  }
});
router.post("/portfoliossetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.portfolios.push({
          title: req.body.title,

          img: req.body.Image,
        });
        setting
          .save()
          .then((data) => {
            res.json({
              data: data,
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.portfolios.push({
                  title: req.body.title,

                  img: req.body.Image,
                });
                setting
                  .save()
                  .then((data) => {
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchportfolios", async (req, res) => {
  await Setting.find({}, { portfolios: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteportfolios/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await Setting.updateOne(
    {},
    { $pull: { portfolios: { _id: req.params.id } } }
  );
  if (data) {
    res.json({
      data: data,
      success: true,
    });
  }
});

router.post("/teamssetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.teams.push({
          name: req.body.name,
          designation: req.body.designation,
          fblink: req.body.fblink,
          googlelink: req.body.googlelink,
          twitterlink: req.body.twitterlink,
          linkdin: req.body.linkdin,
          link: req.body.link,
          img: req.body.Image,
        });
        setting
          .save()
          .then((data) => {
            res.json({
              data: data,
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.teams.push({
                  name: req.body.name,
                  designation: req.body.designation,
                  fblink: req.body.fblink,
                  googlelink: req.body.googlelink,
                  twitterlink: req.body.twitterlink,
                  linkdin: req.body.linkdin,
                  link: req.body.link,
                  img: req.body.Image,
                });
                setting
                  .save()
                  .then((data) => {
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchteams", async (req, res) => {
  await Setting.find({}, { teams: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deleteteams/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await Setting.updateOne(
    {},
    { $pull: { teams: { _id: req.params.id } } }
  );
  if (data) {
    res.json({
      data: data,
      success: true,
    });
  }
});

router.post("/faqssetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.faqs.push({
          title: req.body.title,
          ans: req.body.ans,
          hiden: req.body.hiden,
        });
        setting
          .save()
          .then((data) => {
            res.json({
              data: data,
              success: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.faqs.push({
                  title: req.body.title,
                  ans: req.body.ans,
                  hiden: req.body.hiden,
                });
                setting
                  .save()
                  .then((data) => {
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchfaqs", async (req, res) => {
  await Setting.find({}, { faqs: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/deletefaqs/:id", async (req, res) => {
  // console.log(req.params.id);
  const data = await Setting.updateOne(
    {},
    { $pull: { faqs: { _id: req.params.id } } }
  );
  if (data) {
    res.json({
      data: data,
      success: true,
    });
  }
});

router.post("/grettingssetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.greetingtitle = req.body.greetingtitle;
        setting.greetingqoute = req.body.greetingqoute;
        setting.greetingimg = req.body.image;
        setting
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
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.greetingtitle = req.body.greetingtitle;
                setting.greetingqoute = req.body.greetingqoute;
                setting.greetingimg = req.body.image;
                setting
                  .save()
                  .then((data) => {
                    console.log("fgf", data);
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchgrettings", async (req, res) => {
  await Setting.find({}, { greetingtitle: 1, greetingqoute: 1, greetingimg: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/bussinesssetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.bussinesstitle = req.body.bussinesstitle;
        setting.bussinessqoute = req.body.bussinessqoute;
        setting.bussinessimg = req.body.image;
        setting
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
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.bussinesstitle = req.body.bussinesstitle;
                setting.bussinessqoute = req.body.bussinessqoute;
                setting.bussinessimg = req.body.image;
                setting
                  .save()
                  .then((data) => {
                    console.log("fgf", data);
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchbussiness", async (req, res) => {
  await Setting.find(
    {},
    { bussinesstitle: 1, bussinessqoute: 1, bussinessimg: 1 }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/missionsetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.missiontitle = req.body.missiontitle;
        setting.missionqoute = req.body.missionqoute;
        setting.missionimg = req.body.image;
        setting
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
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.missiontitle = req.body.missiontitle;
                setting.missionqoute = req.body.missionqoute;
                setting.missionimg = req.body.image;
                setting
                  .save()
                  .then((data) => {
                    console.log("fgf", data);
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchmission", async (req, res) => {
  await Setting.find({}, { missiontitle: 1, missionqoute: 1, missionimg: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/vissionsetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.vissiontitle = req.body.vissiontitle;
        setting.vissionqoute = req.body.vissionqoute;
        setting.vissionimg = req.body.image;
        setting
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
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.vissiontitle = req.body.vissiontitle;
                setting.vissionqoute = req.body.vissionqoute;
                setting.vissionimg = req.body.image;
                setting
                  .save()
                  .then((data) => {
                    console.log("fgf", data);
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchvission", async (req, res) => {
  await Setting.find({}, { vissiontitle: 1, vissionqoute: 1, vissionimg: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/commissionsetting", async (req, res) => {
  console.log(req.body);
  await Setting.findOneAndUpdate({})
    .then((setting) => {
      if (setting) {
        setting.commission = req.body.commission;

        setting
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
      } else {
        const setting = new Setting({});
        setting.save(async (err, ok) => {
          if (err) {
            console.log(err);
          } else {
            await Setting.findOneAndUpdate({}).then((setting) => {
              if (setting) {
                setting.commission = req.body.commission;
                setting
                  .save()
                  .then((data) => {
                    console.log("fgf", data);
                    res.json({
                      data: data,
                      success: true,
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                res.json({
                  data: data,
                  success: false,
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/fetchcommission", async (req, res) => {
  await Setting.find({}, { commission: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/areas", async (req, res) => {
  await Setting.find({}, { area: 1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
