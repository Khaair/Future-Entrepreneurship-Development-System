import React, { Component } from 'react';
import Footer from './Footer'
import Header from './Header'
class Portfolioshow3 extends Component {
    render() {
        return (
            <div>
              <Header/>
            <div className="full-title">
              <div className="container">
                {/* Page Heading/Breadcrumbs */}
                <h1 className="mt-4 mb-3"> Portfolio 3 </h1>
                <div className="breadcrumb-main">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Portfolio 3</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="portfolio-col">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-01.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-02.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-03.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-04.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-05.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 portfolio-item">
                    <div className="card h-100">
                      <a className="hover-box" href="#">
                        <div className="dot-full">
                          <i className="fas fa-link" />
                        </div>
                        <img className="card-img-top" src="images/portfolio-big-01.jpg" alt="" />
                      </a>
                      <div className="card-body">
                        <h4><a href="#">In viverra nisi vel facilisis dignissim.</a></h4>
                        <p>Business Consulting</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pagination_bar">
                  {/* Pagination */}
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">2</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.container */}
            </div>
            <Footer/>
          </div>
          
        );
    }
}

export default Portfolioshow3;