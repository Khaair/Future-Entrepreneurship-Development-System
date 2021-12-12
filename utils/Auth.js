const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");
const Setting = require("../model/Setting");
const { Error } = require("mongoose");

const send = require("gmail-send");

const userRegister = async (userDets, role, res) => {
  console.log('hoiii ')
  try {
    let usernameNottaken = await validateUsername(userDets.username);

    if (!usernameNottaken) {
      return res.json({
        messege: { msg: "Username already taken", success: false },
      });
    }

    let emailNotRegistered = await validateEmail(userDets.email);

    if (!emailNotRegistered) {
      return res.json({
        messege: { msg: "Email already taken", success: false },
      });
    }
    // let referrence = await User.find({ myref: userDets.myparentref });

    // if (!referrence.length) {
    //   return res.json({
    //     messege: { msg: "We didnt find any reference", success: false },
    //   });
    // }
    const password = await bcrypt.hash(userDets.password, 10);
    let activeToken = jwt.sign(
      {
        email: userDets.email,
      },
      process.env.SECRET,
      {
        expiresIn: "1 day",
      }
    );
    
    const send = require("gmail-send")({
      user: process.env.Mailstore,
      pass: process.env.pass,
      to: userDets.email,
      subject: "Wellcome to Uddoktabdbd",
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
                                  <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome to Uddoktabd!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                         
                          <tr>
                              <!-- <td bgcolor="#ffffff" align="left">
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                              <table border="0" cellspacing="0" cellpadding="0">
                                                  
                                              </table>
                                          </td>
                                      </tr>
                                  </table>
                              </td> -->
                          </tr> <!-- COPY -->
                         
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                              </td>
                          </tr>
                          <tr>
                              <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                  <p style="margin: 0;">Cheers,<br>uddokta team</p>
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
                                  <p style="margin: 0;"><a href="https://www.facebook.com/groups/209982657507630" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                          <tr>
                              <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                  <p style="margin: 0;">If these emails get annoying, please feel free to <a href="https://www.facebook.com/groups/209982657507630" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      
      </html>
    
    `,
    });

    send(
      {
        text: "Thank you for staty with us",
      },
      (error, result, fullResult) => {
        console.log(error,'lllllo');
        if (error) {
         
          return res.json({
            messege: {
              msg: "gmail sent problem",
              success: false,
            },
          });
        } else {
          console.log("kkkk", userDets);
          const newUser = new User({
            ...userDets,
            password,
            role,
            activeToken,
          });

          newUser
            .save()
            .then((data) => {
              console.log("email has sent");
              return res.json({
                messege: {
                  msg: "Hurry registerd",
                  success: true,
                },
              });
            })
            .catch((error) => {
              console.log(error,'error')
              return res.json({
                messege: {
                  msg: "Unable to create your account",
                  success: false,
                },
              });
            });
        }
      }
    );
  } catch {
    return res.json({
      messege: {
        msg: "opps not registerd",
        success: false,
      },
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      messege: {
        msg: "User not found",
        success: false,
      },
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      messege: {
        msg: "Please login right portal",
        success: false,
      },
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(403).json({
      messege: {
        msg: "Incorrect credentials",
        success: false,
      },
    });
  }

  if (user && user.confirmed === false) {
    return res.status(404).json({
      messege: {
        msg: "You didnt confirmed your account yet",
        success: false,
      },
    });
  }

  let token = jwt.sign(
    {
      user_id: user._id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET,
    {
      expiresIn: "1 day",
    }
  );

  let result = {
    username: user.username,
    role: user.role,
    token: `Bearer ${token}`,
    email: user.email,
    expiresIn: "1 day",
  };

  return res.status(200).json({
    ...result,
    msg: "Hurry you logged in",
    success: true,
  });
};
const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};
const userAuth = (req, res, next) => {
  if (req.header("auth")) {
    const mytoken = req.header("auth").split(" ");
  } else {
    return res.status(404).json({
      messege: {
        msg: "you dont have any token",
        success: false,
      },
    });
  }
  const mytoken = req.header("auth").split(" ");
  if (mytoken[1]) {
    return jwt.verify(mytoken[1], process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          messege: {
            msg: "Failed to authenticate",
            success: false,
          },
        });
      }
      req.user = decoded;
      return next();
    });
  }
};

const Useractivate = async (email, res) => {
  User.find({ email: email }, { activeToken: 1, _id: 0, myparentref: 1 }).then(
    async (token) => {
      await User.findOneAndUpdate({ myref: token[0].myparentref }).then(
        async (parent) => {
          if (parent) {
            const commission = await Setting.find({}, { commission: 1 });
            if (commission) {
              parent.earning =
                parseInt(parent.earning) + parseInt(commission[0].commission);
              parent.myrefused = parseInt(parent.myrefused) + 1;

              parent
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
              return res.status(404).json({
                messege: {
                  msg: "Failed to activate",
                  success: false,
                },
              });
            }
          } else {
            return res.status(404).json({
              messege: {
                msg: "Failed to activate",
                success: false,
              },
            });
          }
        }
      );

      const send = require("gmail-send")({
        user: process.env.Mailstore,
        pass: process.env.pass,
        to: email,
        subject: "Activate your account",
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
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${process.env.Call_Back}/active/${token[0].activeToken}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                           
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>Uddoktabd Team</p>
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
                                    <p style="margin: 0;"><a href="https://www.facebook.com/Uddoktabd.bond.5" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
      });

      send(
        {
          text: "Thank you for staty with us",
        },
        (error, result, fullResult) => {
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
            res.send.json({
              messege: {
                msg: "gmail sent ",
                success: true,
              },
            });
          }
        }
      );
    }
  );
};
const Newuseractivate = async (email, res) => {
  User.find({ email: email }, { activeToken: 1 }).then(async (token) => {
    options = {
      user: process.env.Mailstore,
      pass: process.env.pass,
      to: email,
      subject: "Activate your account",
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
                                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                <table border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${process.env.Call_Back}/active/${token[0].activeToken}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr> <!-- COPY -->
                           
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    <p style="margin: 0;">Cheers,<br>uddokta Team</p>
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
                                    <p style="margin: 0;"><a href="https://www.facebook.com/groups/209982657507630" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                            <tr>
                                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                    <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
    };

    const send = require("gmail-send")(options);
    try {
      const { result, full } = await send(options);
      console.log(result);
    } catch (error) {
      console.error("ERROR", error);
      res.send.json({
        messege: {
          msg: "gmail sent ",
          success: true,
        },
      });
    }
  });
};
module.exports = {
  userRegister,
  userLogin,
  checkRole,
  userAuth,
  Useractivate,
  Newuseractivate,
};
