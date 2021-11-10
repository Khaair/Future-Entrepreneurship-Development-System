import React, { Component } from 'react';
import Footer from './Footer'
import Header from './Header'
class Blog extends Component {
    render() {
        return (
            <div>
              <Header/>
  {/* full Title */}
  <div className="full-title">
    <div className="container">
      {/* Page Heading/Breadcrumbs */}
      <h1 className="mt-4 mb-3"> Blog </h1>
      <div className="breadcrumb-main">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Home</a>
          </li>
          <li className="breadcrumb-item active">Blog</li>
        </ol>
      </div>
    </div>
  </div>
  <div className="blog-main">
    <div className="container">
      <div className="row">
        {/* Blog Entries Column */}
        <div className="col-md-8 blog-entries">
          {/* Blog Post */}
          <div className="card mb-4">
            <img className="card-img-top" src="images/blog-img-01.jpg" alt="Card image Blog" />
            <div className="card-body">
              <div className="by-post">
                Posted on January 1, 2018 by <a href="#">Zonebiz</a>
              </div>
              <h2 className="card-title">How to run successful business meeting</h2>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
              <a href="#" className="btn btn-primary">Continue →</a>
            </div>
          </div>
          {/* Blog Post */}
          <div className="card mb-4">
            <img className="card-img-top" src="images/blog-img-02.jpg" alt="Card image Blog" />
            <div className="card-body">
              <div className="by-post">
                Posted on January 1, 2018 by <a href="#">Zonebiz</a>
              </div>
              <h2 className="card-title">How to run successful business meeting</h2>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
              <a href="#" className="btn btn-primary">Continue →</a>
            </div>
          </div>
          {/* Blog Post */}
          <div className="card mb-4">
            <img className="card-img-top" src="images/blog-img-03.jpg" alt="Card image Blog" />
            <div className="card-body">
              <div className="by-post">
                Posted on January 1, 2018 by <a href="#">Zonebiz</a>
              </div>
              <h2 className="card-title">How to run successful business meeting</h2>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
              <a href="#" className="btn btn-primary">Continue →</a>
            </div>
          </div>
          <div className="pagination_bar_arrow">
            {/* Pagination */}
            <ul className="pagination justify-content-center mb-4">
              <li className="page-item">
                <a className="page-link" href="#">← Older</a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#">Newer →</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Sidebar Widgets Column */}
        <div className="col-md-4 blog-right-side">
          {/* Search Widget */}
          <div className="card mb-4">
            <h5 className="card-header">Search</h5>
            <div className="card-body">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>
          {/* Side Widget */}
          <div className="card my-4">
            <h5 className="card-header">Side Widget</h5>
            <div className="card-body">
              You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
            </div>
          </div>
          {/* Categories Widget */}
          <div className="card my-4">
            <h5 className="card-header">Categories</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#">Web Design</a>
                    </li>
                    <li>
                      <a href="#">HTML</a>
                    </li>
                    <li>
                      <a href="#">Freebies</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="#">JavaScript</a>
                    </li>
                    <li>
                      <a href="#">CSS</a>
                    </li>
                    <li>
                      <a href="#">Tutorials</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /.row */}
    </div>
    {/* /.container */}
  </div>
  <Footer/>
</div>

        );
    }
}

export default Blog;