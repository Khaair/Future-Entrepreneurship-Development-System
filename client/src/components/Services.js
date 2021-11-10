import React, { Component } from 'react';
import Footer from './Footer'
import Header from './Header'
class Services extends Component {
    render() {
        return (
            <div>
              <Header/>
  <div className="full-title">
    <div className="container">
      {/* Page Heading/Breadcrumbs */}
      <h1 className="mt-4 mb-3">Services</h1>
      <div className="breadcrumb-main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Services</li>
        </ol>
      </div>
    </div>
  </div>
  {/* Page Content */}
  <div className="container">
    {/* Image Header */}
    <img className="img-fluid rounded mb-4" src="images/services-big.jpg" alt="" />
  </div>
  <div className="services-bar">
    <div className="container">
      <h1 className="py-4">Our Best Services </h1>
      {/* Services Section */}
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-01.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Analytics </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-02.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Applications </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-03.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Business Process </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-04.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Consulting </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>						
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-05.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Infrastructure </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>						
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-img">
              <img className="img-fluid" src="images/services-img-06.jpg" alt="" />
            </div>
            <div className="card-body">
              <h4 className="card-header"> Product Engineering </h4>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente esse necessitatibus neque.</p>
            </div>
          </div>
        </div>
      </div>
      {/* /.row */}
    </div>
  </div>
  <Footer/>
</div>

        );
    }
}

export default Services;