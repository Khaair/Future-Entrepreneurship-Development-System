import React, { Component } from 'react';
import Footer from './Footer'
import Header from './Header'
class Pricing extends Component {
    render() {
        return (
            <div>
              
            <div className="full-title">
              <div className="container">
                {/* Page Heading/Breadcrumbs */}
                <h1 className="mt-4 mb-3">Pricing</h1>
                <div className="breadcrumb-main">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Pricing</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* Page Content */}
            <div className="container">
              <div className="pricing-box">
                {/* Content Row */}
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <div className="card h-100 bg-01">
                      <div className="card-header">
                        <h3 className>Basic</h3>
                        <div className="display-4">$19.99</div>
                        <div className="font-italic">per month</div>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Limitless Concepts</li>
                        <li className="list-group-item">Annual Reports</li>
                        <li className="list-group-item">Free Support</li>
                        <li className="list-group-item">Expert Reviews</li>
                        <li className="list-group-item">Community Access</li>
                        <li className="list-group-item">
                          <a href="#" className="btn btn-primary">Purchase</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="card card-outline-primary bg-02 h-100">
                      <div className="card-header">
                        <h3 className="text-white">
                          Plus
                          <span className="most_popular">Most Popular</span>
                        </h3>
                        <div className="display-4">$39.99</div>
                        <div className="font-italic">per month</div>
                      </div>						
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Limitless Concepts</li>
                        <li className="list-group-item">Annual Reports</li>
                        <li className="list-group-item">Free Support</li>
                        <li className="list-group-item">Expert Reviews</li>
                        <li className="list-group-item">Community Access</li>
                        <li className="list-group-item">
                          <a href="#" className="btn btn-primary">Purchase</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="card h-100 bg-03">
                      <div className="card-header">
                        <h3 className>Ultra</h3>
                        <div className="display-4">$159.99</div>
                        <div className="font-italic">per month</div>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Limitless Concepts</li>
                        <li className="list-group-item">Annual Reports</li>
                        <li className="list-group-item">Free Support</li>
                        <li className="list-group-item">Expert Reviews</li>
                        <li className="list-group-item">Community Access</li>
                        <li className="list-group-item">
                          <a href="#" className="btn btn-primary">Purchase</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /.row */}
              </div>
            </div>
           
          </div>
          
        );
    }
}

export default Pricing;