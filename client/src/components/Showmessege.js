import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header'
class Showmessege extends Component {
    render() {
        return (
            <div>
              <Header/>
            <div className="full-title">
              <div className="container">
                {/* Page Heading/Breadcrumbs */}
                {/* <h1 className="mt-4 mb-3"> 404 </h1> */}
                <div className="breadcrumb-main">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/home">Home</a>
                    </li>
                    {/* <li className="breadcrumb-item active">404</li> */}
                  </ol>
                </div>
              </div>
            </div>
            {/* Page Content */}
            <div className="container">
              <div className="error-contents">
                {/* <div className="error-img">
                  <img className="img-fluid" src="images/upcoming.png" alt="" />
                </div> */}
                <h3>We have send you a recovery email with username</h3>
                {/* <p>“Success is not final; failure is not fatal: it is the courage to continue that counts.” – Winston Churchill. ... <a href="/home">Homepage</a></p> */}
                <a className="btn btn-primary" href="/home"> Back To Homepage </a>
              </div>
              {/* /.jumbotron */}
            </div>
            <Footer/>
          </div>
          
        );
    }
}

export default Showmessege;