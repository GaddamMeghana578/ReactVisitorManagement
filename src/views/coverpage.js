import React, { Component } from "react";
import sound from "../audio/Instructions.m4a";
import officeImage from "../images/office2.jpg";
import { Link } from "react-router-dom";

export default class coverpage extends Component {
  state = {
    visitor: {},
    firstname: "",
    lastname: "",
    company: "",
    jobtitle: "",
    email: "",
    mobile: "",
    person: "",
    visit: ""
  };

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handlerefresh = e => {
    e.preventDefault();
    window.location.reload();
  };

  render() {
    const {
      firstname,
      lastname,
      company,
      jobtitle,
      email,
      mobile,
      person,
      visit
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-xs-push-3 col-sm-9">
              <p />
            </div>
            <div className="form-group col-md-push-9 col-md-10">
              <audio controls>
                <source src={sound} type="audio/mp4" />
              </audio>
            </div>
            <div className="col-sm-12">
              <h3 className="alert alert-warning">
                <strong>Visitor Portal</strong>
              </h3>
            </div>
            <div className="form-group col-md-push-10 col-md-12">
              <button
                className="btn btn-warning"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#mymodal"
                data-placement="left"
                title="If you are a visitor kindly enroll"
              >
                Enroll
              </button>
              &nbsp;
              <Link to="/Admin">
                <button
                  className="btn btn-default"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="If you are an administrator kindly login"
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="col-sm-12">
              <img
                style={{ width: "2500px", height: "750px" }}
                src={officeImage}
                className="img-responsive"
                alt="Responsive"
              />
            </div>
          </div>
        </div>

        <div className="modal fade" id="mymodal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header alert alert-warning">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="text-center">VisitorDetails</h4>
              </div>
              <div className="modal-body">
                <form data-toggle="validator" name="registerForm">
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="firstname">FirstName</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={firstname}
                        id="firstname"
                        onChange={e => this.handleInputChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className=" form-group col-xs-push-1 col-md-10">
                      <label htmlFor="lastname">LastName</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={lastname}
                        onChange={e => this.handleInputChange(e)}
                        id="lastname"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="Company">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value={company}
                        onChange={e => this.handleInputChange(e)}
                        name="company"
                        id="Company"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="Jobtitle">JobTitle</label>
                      <input
                        type="text"
                        className="form-control"
                        value={jobtitle}
                        onChange={e => this.handleInputChange(e)}
                        name="jobtitle"
                        id="jobtitle"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="email">Email</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={e => this.handleInputChange(e)}
                        name="email"
                        id="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="MobileNumber">MobileNumber</label>
                      <input
                        type="tel"
                        className="form-control"
                        pattern="^\d{10}$"
                        onChange={e => this.handleInputChange(e)}
                        value={mobile}
                        name="mobile"
                        id="mobilenumber"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="Person">Visiting?</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control"
                        value={person}
                        onChange={e => this.handleInputChange(e)}
                        name="person"
                        id="Person"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-xs-push-1 col-md-10">
                      <label htmlFor="Visit">Purpose of Visit</label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        className="form-control"
                        value={visit}
                        onChange={e => this.handleInputChange(e)}
                        name="visit"
                        id="Visit"
                        required
                      />
                    </div>
                  </div>
                </form>
                <div className="modal-footer">
                  <button
                    className="btn btn-warning"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#yesmodal"
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-default"
                    onClick={e => this.handlerefresh(e)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
