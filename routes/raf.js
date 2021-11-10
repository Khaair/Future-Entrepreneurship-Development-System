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
