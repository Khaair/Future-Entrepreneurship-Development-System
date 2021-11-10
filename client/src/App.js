import React from "react";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Services from "./components/Services";
import Faq from "./components/Faq";
import four from "./components/Four";

import Contact from "./components/Contact";
import Userregister from "./components/Userregister";
import Adminlogin from "./components/Adminlogin";
import Dashboard from "./components/Dashboard";

import Manageservices from "./components/Manageservices";

import Managecontact from "./components/Managecontact";
import Managefaq from "./components/Managefaq";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Earning from "./components/Earning";
import Invite from "./components/Invite";
import Myslider from "./components/Myslider";

import Userlogin from "./components/Userlogin";
import history from "./history";
import Registrationverification from "./components/Registrationverification";
import Allusers from "./components/Allusers";
import Userrequest from "./components/Userrequest";
import Allwithdraw from "./components/Allwithdraw";
import Withdrawrequest from "./components/Withdrawrequest";
import Withdrawsuccessmesege from "./components/Withdrawsuccessmessege";
import Forgotpassword from "./components/Forgotpassword";
import Showmessege from "./components/Showmessege";
import Changepassword from "./components/Changepassword";
import Manageslider from "./components/Manageslider";
import Managegreeting from "./components/Managegreeting";
import Manageportfolio from "./components/Manageportfolio";
import Managebussiness from "./components/Managebussiness";
import Manageteam from "./components/Manageteam";
import Managemission from "./components/Managemission";
import Managevission from "./components/Managevission";
import Manageothers from "./components/Manageothers";
import Downlines from "./components/Downlines";
import Addproductinfo from "./components/Addproductinfo";
import Adddelivaryinfo from "./components/Adddelivaryinfo";
import Pubproducts from "./components/Pubproducts";
import Pubdelivaryinfo from "./components/Pubdelivaryinfo";
import Pubusers from "./components/Pubusers";

function App() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={Aboutus} />
        <Route path="/shop" exact component={four} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/contact" exact component={Contact} />

        <Route exact path="/logout" component={Logout} />
        <Route exact path="/profile/:username" component={Profile} />
        <Route exact path="/earning" component={Earning} />
        <Route exact path="/invite" component={Invite} />
        <Route path="/userregister" exact component={Userregister} />
        <Route path="/admin" exact component={Adminlogin} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/manageslider" exact component={Manageslider} />
        <Route path="/managegreeting" exact component={Managegreeting} />
        <Route path="/manageportfolio" exact component={Manageportfolio} />
        <Route path="/managebussiness" exact component={Managebussiness} />
        <Route path="/managemission" exact component={Managemission} />
        <Route path="/managevission" exact component={Managevission} />
        <Route path="/manageteam" exact component={Manageteam} />
        <Route path="/managefaq" exact component={Managefaq} />
        <Route path="/managecontact" exact component={Managecontact} />
        <Route path="/manageservices" exact component={Manageservices} />
        <Route path="/userlogin" exact component={Userlogin} />
        <Route path="/downlines" exact component={Downlines} />
        <Route
          path="/userregistermesege"
          exact
          component={Registrationverification}
        />
        <Route path="/alluser" exact component={Allusers} />
        <Route path="/userrequest" exact component={Userrequest} />
        <Route path="/allwithdraw" exact component={Allwithdraw} />
        <Route path="/withdrawrequest" exact component={Withdrawrequest} />
        <Route
          path="/withdrawsuccessmesege"
          exact
          component={Withdrawsuccessmesege}
        />
        <Route exact path="/forgotpassword" component={Forgotpassword} />
        <Route exact path="/showmessege" component={Showmessege} />
        <Route exact path="/manageothers" component={Manageothers} />

        <Route
          exact
          path="/forgotpasswordform/:forgotpasswordtoken"
          component={Changepassword}
        />
        <Route path="/services" exact component={Services} />
        <Route path="/addproduct" exact component={Addproductinfo} />
        <Route path="/adddelivaryinfo" exact component={Adddelivaryinfo} />
        <Route path="/publicpro" exact component={Pubproducts} />
        <Route path="/publicdelivaryinfo" exact component={Pubdelivaryinfo} />
        <Route path="/publicuser" exact component={Pubusers} />

        <Route component={four} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
