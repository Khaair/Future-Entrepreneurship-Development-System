const router = require("express").Router();
const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, body, validationResult } = require("express-validator");
const {
  userRegister,
  userLogin,
  userAuth,
  checkRole,
  Useractivate,
  Newuseractivate,
} = require("../utils/Auth");
router.post(
  "/register",
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),
  [
    body("fullname").isLength({ min: 3 }).withMessage("Name is required."),
    body("username").isLength({ min: 3 }).withMessage("username is required."),

    body("mobile")
      .isLength({ min: 11 })
      .withMessage("Mobile number is required.")
      .matches(/\d/)
      .withMessage("must contain a number"),

    body("email")
      .isLength({ min: 1 })
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address"),

    body("dateofbirth").not().isEmpty().withMessage("Dateofbirth is required."),

    body("gender").not().isEmpty().withMessage("Gender is required."),
    body("postcode").not().isEmpty().withMessage("Postcode is required."),
    body("education").not().isEmpty().withMessage("Education is required."),
    body("preaddress").not().isEmpty().withMessage("Preaddress is required."),
    body("permanentaddress")
      .not()
      .isEmpty()
      .withMessage("Permanentaddress is required."),
    // body("selectedproduct")
    //   .not()
    //   .isEmpty()
    //   .withMessage("Selectedproduct is required."),
    // body("thana").not().isEmpty().withMessage("thana is required."),
    // body("dist").not().isEmpty().withMessage("dist is required."),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
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

    await userRegister(req.body, "user", res);
  }
);

router.get("/active/:activeToken", (req, res, next) => {
  User.findOne(
    {
      activeToken: req.params.activeToken,
    },
    (err, user) => {
      console.log(user);
      if (err) return next(err);
      if (!user) {
        return res.render("messege", {
          title: "Fail to activate",
          content:
            'Your activation link is invalid ,Please <a href="/register">Register</a> here',
        });
      } else {
        user.confirmed = true;
        user.save().then((ok) => {
          res.statusCode = 302;
          res.setHeader("Location", "/userlogin");
          return res.end();
        });
      }
    }
  );
});
router.post(
  "/login-user",
  [
    body("username").isLength({ min: 3 }).withMessage("username is required."),

    check("password").not().isEmpty().withMessage("password is required."),
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
    await userLogin(req.body, "user", res);
  }
);

router.get(
  "/user-protected",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    return res.json("hello user");
  }
);

router.get("/pro/:username", async (req, res) => {
  console.log(req.params.username);
  await User.find({ username: req.params.username }).then((user) => {
    res.send(user);
  });
});
router.get("/downlines/:myref", userAuth, async (req, res) => {
  console.log(req.params.myref);

  const user = await User.find({ myparentref: req.params.myref });

  res.send(user);
});

router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
router.get("/fetchusers", async (req, res) => {
  const data = await User.find({ confirmed: true }).sort({ postcode: 1 });
  res.send(data);
});
router.get("/fetchuserrequest", async (req, res) => {
  const data = await User.find({ confirmed: false }).sort({ createdAt: 1 });
  res.send(data);
});

router.get("/deleteuser/:id", async (req, res) => {
  // console.log(req.params.id);
  User.deleteOne({ _id: req.params.id })
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

// router.get("/sendactivationlink/:email", async (req, res) => {
//   await Useractivate(req.params.email, res);
//   // console.log(req.params.email)
// });
router.get("/sendactivationlink/:email", async (req, res) => {
  await Newuseractivate(req.params.email, res);
  // console.log(req.params.email)
});

router.post("/forgotpassordorusername", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (!emailExist) {
    return res.status(404).json({
      messege: "Email not found..",
      success: false,
    });
  }

  let forgetpasswordToken = jwt.sign(
    {
      email: req.body.email,
    },
    process.env.SECRET,
    { expiresIn: "1 days" }
  );
  // user: "chaincome2020@gmail.com",
  // pass: "eheypsrlkrhyjbio",
  try {
    const send = require("gmail-send")({
      user: process.env.Mailstore,
      pass: process.env.pass,
      to: req.body.email,
      subject: "Recover your account & Change Your Password",
      html: `<!DOCTYPE html>
        <html>
        
        <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <style type="text/css">
                @media screen {
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 400;
                        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                    }
        
                    @font-face {
                        font-family: 'Lato';
                        font-style: italic;
                        font-weight: 700;
                        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                    }
                }
        
                /* CLIENT-SPECIFIC STYLES */
                body,
                table,
                td,
                a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
        
                /* RESET STYLES */
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }
        
                table {
                    border-collapse: collapse !important;
                }
        
                body {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
        
                /* iOS BLUE LINKS */
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                }
        
                /* MOBILE STYLES */
                @media screen and (max-width:600px) {
                    h1 {
                        font-size: 32px !important;
                        line-height: 32px !important;
                    }
                }
        
                /* ANDROID CENTER FIX */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }
            </style>
        </head>
        
        <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
            <!-- HIDDEN PREHEADER TEXT -->
            <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- LOGO -->
                <tr>
                    <td bgcolor="#FFA73B" align="center">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${process.env.Call_Back}/forgotpasswordform/${forgetpasswordToken}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Click here</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                           
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;"><a href="https://www.facebook.com/chaincome.bond.5" target="_blank" style="color: #FFA73B;">https://bit.li.utlddssdstueincx</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>Chaincome Team</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                    <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
    });

    send(
      {
        text: "Thank you for stay with us",
      },
      async (error, result, fullResult) => {
        if (error) {
          console.log(error);
          return res.json({
            messege: {
              msg: "gmail sent problem",
              success: false,
            },
          });
        } else {
          console.log(result);
          await emailExist.updateOne({ activeToken: forgetpasswordToken });

          if (result) {
            res.json({ success: true });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post(
  "/subforgotpasswordforms/:forgotpasswordtoken",
  body("password_confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  [
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password should not be empty")
      .isLength({ min: 8 })
      .withMessage("Password minimum eight characters, at least one letter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var errorResponse = errors.array({ onlyFirstError: true });
      res.status(422).json({ message: errorResponse[0] });
    }
    console.log(req.params.forgotpasswordtoken);
    await User.findOne({ activeToken: req.params.forgotpasswordtoken })
      .then(async (user) => {
        console.log("user", user, req.body);
        if (user) {
          const password = await bcrypt.hash(req.body.password, 12);
          if (password) {
            user.password = password;
            user.confirmed = true;
            await user
              .save()
              .then((data) => {
                res.json({ success: true });
              })
              .catch((err) => {
                res.status(400).json({
                  message: { msg: `Somthing error happend again` },
                  success: false,
                });
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: { msg: `Somthing error happend try again` },
          success: false,
        });
      });
  }
);

router.post(
  "/contactmessege",
  [
    body("email")
      .isLength({ min: 1 })
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address"),
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

    const send = require("gmail-send")({
      user: process.env.Mailstore,
      pass: process.env.pass,
      to: "trippledevbd@gmail.com",
      subject: req.body.fullname,
    });

    send(
      {
        text: req.body.message,
      },
      async (error, result, fullResult) => {
        if (error) {
          console.log(error);
          return res.json({
            messege: {
              msg: "gmail sent problem",
              success: false,
            },
          });
        } else {
          console.log("email send");
          return res.json({
            messege: {
              msg: "Messege send succesfully",
              success: true,
            },
          });
        }
      }
    );
  }
);

module.exports = router;
