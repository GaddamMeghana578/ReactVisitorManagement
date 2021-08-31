import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import _ from "lodash";

export default class VisitorDetails extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      visitor: {},
      viewVisitor: {},
      viewModalShow: false,
      deleteModalShow: false,
      editModalShow: false,
    };
  }

  componentDidMount() {
    // Get all visitor information and show them.

    fetch("http://localhost:5000/VisitorRegistration")
      .then((response) => {
        response.json().then((data) => {
          this.setState({ visitor: data });
        });
      })
      .catch((error) => console.log(error));
  }

  viewVisitor = (uuid, name) => {
    fetch("http://localhost:5000/VisitorRegistration/" + uuid, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          if (name === "view") {
            this.setState({ viewVisitor: data, viewModalShow: true });
          } else if (name === "delete") {
            this.setState({ viewVisitor: data, deleteModalShow: true });
          } else if (name === "edit") {
            this.setState({ viewVisitor: data, editModalShow: true });
          }
        });
      })
      .catch((error) => console.log(error));
  };

  deleteVisitor = (uuid) => {
    fetch("http://localhost:5000/VisitorRegistration/" + uuid, {
      method: "DELETE",
    })
      .then((response) => {
        response.json().then((data) => {
          window.location.reload(true);
        });
      })
      .catch((error) => console.log(error));
  };

  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    var viewVisitor = _.clone(this.state.viewVisitor);
    if (name === "Mobile") {
      viewVisitor[name] = parseInt(value);
    } else {
      viewVisitor[name] = value;
    }
    this.setState({ viewVisitor: viewVisitor });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { viewVisitor } = this.state;
    if (this.validator.allValid()) {
      let FirstName = viewVisitor.FirstName;
      FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1);
      let LastName = viewVisitor.LastName;
      LastName = LastName.charAt(0).toUpperCase() + LastName.slice(1);

      var visitorData = {
        FirstName: FirstName,
        LastName: LastName,
        Company: viewVisitor.Company,
        JobTitle: viewVisitor.JobTitle,
        Email: viewVisitor.Email,
        Mobile: viewVisitor.Mobile,
        Person: viewVisitor.Person,
        Visit: viewVisitor.Visit,
        Image: viewVisitor.Image,
        Date: viewVisitor.date,
        UUID: viewVisitor.UUID,
      };

      fetch("http://localhost:5000/VisitorRegistration/" + viewVisitor.UUID, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorData),
      })
        .then((response) => {
          response.json().then((body) => {
            this.setState({ viewVisitor: body, show: true });
            window.location.reload(true);
          });
        })
        .catch((error) => console.log(error));
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  handlerefresh = (e) => {
    e.preventDefault();
    this.setState({
      viewVisitor: {},
    });
  };

  render() {
    const { visitor } = this.state;
    return (
      <div>
        <ul className="breadcrumb">
          <ul className="nav nav-pills">
            <li>
              <a href="/#/Coverpage">
                <span className="fa fa-home fa-2x" />
              </a>
            </li>
          </ul>
          <h3 className="text-center text-danger">Visitors</h3>
          <div className="wrapper">
            <span>Showing {visitor.length} Visitors</span>&nbsp;&nbsp;
            <input type="text" ng-model="search.FirstName" />
            <div className="fa fa-search fa-lg" />
          </div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>
                  <b>FirstName</b>
                </th>
                <th>
                  <b>LastName</b>
                </th>
                <th>
                  <b>Visiting</b>
                </th>
                <th>
                  <b>Purpose Of Visit</b>
                </th>
                <th>
                  <b>Date and Time of Visit</b>
                </th>
                <th>
                  <b>View/Edit/Delete</b>
                </th>
              </tr>
            </thead>
            {Object.keys(visitor).length === 0 &&
            visitor.constructor === Object ? null : (
              <tbody>
                {visitor.map((visitor, v) => {
                  return (
                    <tr key={v}>
                      <td>{v}</td>
                      <td>{visitor.FirstName}</td>
                      <td>{visitor.LastName}</td>
                      <td>{visitor.Person}</td>
                      <td>{visitor.Visit}</td>
                      <td>{visitor.Date}</td>
                      <td
                        className="fa fa-eye fa-lg"
                        data-toggle="modal"
                        data-target="#yesmodal"
                        data-dismiss="modal"
                        name="view"
                        onClick={() => this.viewVisitor(visitor.UUID, "view")}
                      />
                      <td
                        className="fa fa-pencil fa-lg"
                        data-toggle="modal"
                        data-target="#editmodal"
                        data-dismiss="modal"
                        name="edit"
                        onClick={() => this.viewVisitor(visitor.UUID, "edit")}
                      />
                      <td
                        className="fa fa-trash fa-lg"
                        data-toggle="modal"
                        data-target="#mymodal"
                        data-dismiss="modal"
                        name="delete"
                        onClick={() => this.viewVisitor(visitor.UUID, "delete")}
                      />
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
          {this.state.viewModalShow ? (
            <div className="modal fade" id="yesmodal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-danger">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 className="bg-danger text-center">
                      <strong>Visitor</strong>
                    </h2>
                  </div>
                  <div className="modal-body">
                    <h4>
                      FirstName: &nbsp;<b>{this.state.viewVisitor.FirstName}</b>
                    </h4>
                    <h4>
                      LastName: &nbsp;<b>{this.state.viewVisitor.LastName}</b>
                    </h4>
                    <h4>
                      Company: &nbsp;<b>{this.state.viewVisitor.Company}</b>
                    </h4>
                    <h4>
                      JobTitle: &nbsp;<b>{this.state.viewVisitor.JobTitle}</b>
                    </h4>
                    <h4>
                      Email: &nbsp; <b>{this.state.viewVisitor.Email}</b>
                    </h4>
                    <h4>
                      Mobile: &nbsp;
                      <b>{this.state.viewVisitor.Mobile}</b>
                    </h4>
                    <h4>
                      Visiting: &nbsp;<b>{this.state.viewVisitor.Person}</b>
                    </h4>
                    <h4>
                      Purpose Of Visit: &nbsp;
                      <b>{this.state.viewVisitor.Visit}</b>
                    </h4>
                    <h4>
                      Date and Time Of Visit: &nbsp;
                      <b>{this.state.viewVisitor.Date}</b>
                    </h4>
                  </div>
                  <footer>
                    <p className="text-center">&copy; Company 2016</p>
                  </footer>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.editModalShow ? (
            <div className="modal fade" id="editmodal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header alert alert-warning">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      onClick={(e) => this.handlerefresh(e)}
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
                            name="FirstName"
                            value={this.state.viewVisitor.FirstName || ""}
                            id="firstname"
                            onChange={(e) => this.handleInputChange(e)}
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "firstname",
                              this.state.viewVisitor.FirstName,
                              "required|min:3|max:20"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className=" form-group col-xs-push-1 col-md-10">
                          <label htmlFor="lastname">LastName</label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            name="LastName"
                            value={this.state.viewVisitor.LastName || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            id="lastname"
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "lastname",
                              this.state.viewVisitor.LastName,
                              "required|min:3|max:20"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-push-1 col-md-10">
                          <label htmlFor="Company">Company</label>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.viewVisitor.Company || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            name="Company"
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
                            value={this.state.viewVisitor.JobTitle || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            name="JobTitle"
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
                            value={this.state.viewVisitor.Email || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            name="Email"
                            id="email"
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "email",
                              this.state.viewVisitor.Email,
                              "required|email"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-push-1 col-md-10">
                          <label htmlFor="Mobile">Mobile</label>
                          <input
                            type="tel"
                            className="form-control"
                            onChange={(e) => this.handleInputChange(e)}
                            value={this.state.viewVisitor.Mobile || ""}
                            name="Mobile"
                            id="mobile"
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "mobile",
                              this.state.viewVisitor.Mobile,
                              "phone"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-push-1 col-md-10">
                          <label htmlFor="Person">Visiting?</label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.viewVisitor.Person || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            name="Person"
                            id="Person"
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "person",
                              this.state.viewVisitor.Person,
                              "required|alpha"
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-push-1 col-md-10">
                          <label htmlFor="Visit">Purpose of Visit</label>
                          <span style={{ color: "red" }}>*</span>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.viewVisitor.Visit || ""}
                            onChange={(e) => this.handleInputChange(e)}
                            name="Visit"
                            id="Visit"
                          />
                          <span style={{ color: "red" }}>
                            {this.validator.message(
                              "visit",
                              this.state.viewVisitor.Visit,
                              "required|alpha"
                            )}
                          </span>
                        </div>
                      </div>
                    </form>
                    <div className="modal-footer">
                      <button
                        className="btn btn-warning"
                        disabled={
                          !this.state.viewVisitor.FirstName ||
                          !this.state.viewVisitor.LastName ||
                          !this.state.viewVisitor.Email ||
                          !this.state.viewVisitor.Visit ||
                          !this.state.viewVisitor.Person
                        }
                        onClick={(e) => this.handleSubmit(e)}
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-default"
                        onClick={(e) => this.handlerefresh(e)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.deleteModalShow ? (
            <div className="modal fade" id="mymodal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h3>Welcome</h3>
                  </div>
                  <div className="modal-body">
                    <p>
                      Do you want to delete the user '
                      {this.state.viewVisitor.FirstName}' ?{" "}
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-success"
                      data-dismiss="modal"
                      onClick={() =>
                        this.deleteVisitor(this.state.viewVisitor.UUID)
                      }
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </ul>
      </div>
    );
  }
}
