import React from "react";

export default function Withdrawsuccessmesege() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Awesome We got your Request!</h1>
            <h2>Thank you for your staying with Chaincome</h2>
            <div className="error-details">
              Within 2 day you will have your withdraw success
            </div>
            <div className="error-actions">
              <a href="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home" />
                Take Me Home{" "}
              </a>
              <a href="/earning" className="btn btn-default btn-lg">
                <span className="glyphicon glyphicon-envelope" /> Go Back To Your Walet
               
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
