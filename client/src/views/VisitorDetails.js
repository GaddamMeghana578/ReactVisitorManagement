import React, { Component } from "react";

export default class VisitorDetails extends Component {
  state = {
    visitor: {},
    viewVisitor: {},
    viewModalShow: false,
    deleteModalShow: false
  };

  componentDidMount() {
    // Get all visitor information and show them.

    fetch("http://localhost:5000/VisitorRegistration")
      .then(response => {
        response.json().then(data => {
          console.log("data:", data);
          this.setState({ visitor: data });
        });
      })
      .catch(error => console.log(error));
  }

  viewVisitor = (uuid, name) => {
    fetch("http://localhost:5000/VisitorRegistration/" + uuid, {
      method: "GET"
    })
      .then(response => {
        response.json().then(data => {
          console.log("viewdata:", data);
          if (name === "view") {
            this.setState({ viewVisitor: data, viewModalShow: true });
          } else {
            this.setState({ viewVisitor: data, deleteModalShow: true });
          }
        });
      })
      .catch(error => console.log(error));
  };

  deleteVisitor = uuid => {
    fetch("http://localhost:5000/VisitorRegistration/" + uuid, {
      method: "DELETE"
    })
      .then(response => {
        response.json().then(data => {
          console.log("deletedata:", data);
          window.location.reload(true);
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    console.log("visitor:", this.state.visitor);
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
                        data-target="#mymodal"
                        data-dismiss="modal"
                        name="delete"
                        onClick={() => this.viewVisitor(visitor.UUID, "delete")}
                      />
                      <td
                        className="fa fa-trash fa-lg"
                        data-toggle="modal"
                        data-target="#deletemodal"
                        data-dismiss="modal"
                        //onClick={() => this.submitForm(visitor.uuid)}
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
                      MobileNumber: &nbsp;
                      <b>{this.state.viewVisitor.MobileNumber}</b>
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

          {this.state.deleteModalShow ? (
            <div className="modal fade" id="deletemodal">
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
