import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'
import Header from './Header'
class Projectshow extends Component {
   
    render() {
        return (
            <div>
              <Header/>
  <div className="full-title">
    <div className="container">
      {/* Page Heading/Breadcrumbs */}
      <h1 className="mt-4 mb-3"> Portfolio 4 </h1>
      <div className="breadcrumb-main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="index.html">Home</Link>
          </li>
          <li className="breadcrumb-item active">Portfolio 4</li>
        </ol>
      </div>
    </div>
  </div>
  <div className="portfolio-col">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-01.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-02.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>				  
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-03.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-04.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-04.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>					  
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-01.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-02.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>					  
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-6 portfolio-item">
          <div className="card h-100">
            <Link className="hover-box" to="/singleproject">
              <div className="dot-full">
                <i className="fas fa-link" />
              </div>
              <img  className="card-img-top" src="images/portfolio-big-03.jpg" alt="" />
            </Link>
            <div className="card-body">
              <h4><Link to="/singleproject">In viverra nisi vel facilisis dignissim.</Link></h4>
              <p>Business Consulting</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination_bar">
        {/* Pagination */}
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link className="page-link" to="/singleproject" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/singleproject">1</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/singleproject">2</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/singleproject">3</Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="/singleproject" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </Link>
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

export default Projectshow;