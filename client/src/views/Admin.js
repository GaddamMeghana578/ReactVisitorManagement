import React, { Component } from "react";
import workImage from "../images/work.jpg";
import SimpleReactValidator from "simple-react-validator";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("check:", this.state.username, this.state.password);
    if (this.validator.allValid()) {
      if (this.state.username === "admin" && this.state.password === "12345") {
        // Get all visitor information and show them.
        window.location = "/VisitorDetails";
      } else {
        alert("Incorrect username and password");
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div className="container">
        <ul className="nav nav-pills">
          <li>
            <a href="/#/Coverpage">
              <span className="fa fa-home fa-2x" />
            </a>
          </li>
          <form name="loginForm">
            <div className="row">
              <div className="col-md-push-5 col-md-3">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-user" />
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.username}
                      name="username"
                      placeholder="UserName"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <span style={{ color: "red" }}>
                    {this.validator.message(
                      "username",
                      this.state.username,
                      "required"
                    )}
                  </span>
                </div>
              </div>
              <div className="col-md-push-5 col-md-3">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-lock" />
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      placeholder="Password"
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <span style={{ color: "red" }}>
                    {this.validator.message(
                      "password",
                      this.state.password,
                      "required"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 col-md-push-11">
                <div className="form-group">
                  <button
                    className="btn btn-primary"
                    value="Submit"
                    onClick={e => this.handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <h2>
              <strong>Admin Portal</strong>
            </h2>
            <h5>Believe in making a difference.</h5>
            <img
              style={{ width: "1500px", height: "700px" }}
              src={workImage}
              className="img-responsive"
              alt="Responsive"
            />
          </form>
        </ul>
        <footer>
          <p className="text-center">&copy; Company 2016</p>
        </footer>
      </div>
    );
  }
}
