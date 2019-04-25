import React, { Component } from "react";

export default class VisitorDetails extends Component {
  state = {
    visitor: {}
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
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </ul>
      </div>
    );
  }
}
