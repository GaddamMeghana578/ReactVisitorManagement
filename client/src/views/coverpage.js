import React, { Component } from "react";
import sound from "../audio/Instructions.m4a";
import officeImage from "../images/office2.jpg";
import { Link } from "react-router-dom";
import "../css/print.css";
import SimpleReactValidator from "simple-react-validator";

export default class coverpage extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      visitor: {},
      show: false,
      firstname: "",
      lastname: "",
      company: "",
      jobtitle: "",
      email: "",
      mobile: "",
      person: "",
      visit: "",
      date: "",
      image: "",
      uuid: "",
      imgUpload: ""
    };
  }

  handleInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handlerefresh = e => {
    e.preventDefault();
    this.setState({
      visitor: {},
      show: false,
      firstname: "",
      lastname: "",
      company: "",
      jobtitle: "",
      email: "",
      mobile: "",
      person: "",
      visit: "",
      date: "",
      image: "",
      uuid: ""
    });
  };

  handlePrint = e => {
    e.preventDefault();
    console.log("check", e);
    var elem = document.getElementById("printThis");
    console.log("get:", elem);
    var domClone = elem.cloneNode(true);

    var printSection = document.getElementById("printSection");

    if (!printSection) {
      printSection = document.createElement("div");
      printSection.id = "printSection";
      document.body.appendChild(printSection);
    }
    printSection.innerHTML = "";
    printSection.appendChild(domClone);
    window.print();
  };

  handleFileUpload = e => {
    e.preventDefault();
    var file = e.target.files[0];
    if (file === undefined) return;
    console.log("file check:", file);
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("Only PNG and JPEG are accepted.");
      return;
    }

    var extension = "";

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Unsupported file type");
      return;
    } else if (file.type === "image/jpg") {
      extension = ".jpg";
    } else if (file.type === "image/png") {
      extension = ".png";
    }
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("filename", file.name);
    formdata.append("type", file.type);
    formdata.append("extension", extension);

    console.log("formdata:", file);

    this.getBase64(file);

    fetch("http://localhost:5000/uploadImage", {
      method: "POST",
      body: formdata
    })
      .then(
        response => {
          response.json().then(body => {
            console.log("check body:", body.file);
            this.setState({ image: `http://localhost:5000/${body.file}` });
          });
        },
        evt => {
          var progressPercentage = parseInt((100.0 * evt.loaded) / evt.total);
          console.log(
            "progress: " + progressPercentage + "% " + evt.config.body.file
          );
        }
      )
      .catch(error => console.log(error));
  };

  /*fetch("http://localhost:5000/uploadImage", {
      headers: {
        Accept: "application/json, text/plain"
      },
      method: "POST",
      body: formdata
    })
      .then(
        response => {
          response.json().then(body => {
            console.log("check json body:", body);
            this.setState({ image: body });
            console.log(
              "Success " +
                body.filename +
                "uploaded. Response: " +
                response.body
            );
          });
        }
      )
      .catch(error => console.log(error));
  };*/

  getBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({
        imgUpload: reader.result
      });
    };
    reader.onerror = function(error) {
      console.log("Error: ", error);
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.validator.allValid()) {
      let firstname = this.state.firstname;
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      let lastname = this.state.lastname;
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
      let d = new Date();
      let date = d.toLocaleString();

      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
      //   return uuid;
      console.log(uuid);

      var visitorData = {
        firstname: firstname,
        lastname: lastname,
        company: this.state.company,
        jobtitle: this.state.jobtitle,
        email: this.state.email,
        mobile: this.state.mobile,
        person: this.state.person,
        visit: this.state.visit,
        image: this.state.image,
        date: date,
        uuid: uuid
      };

      console.log("check visitor:", visitorData);

      fetch("http://localhost:5000/VisitorRegistration", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(visitorData)
      })
        .then(response => {
          response.json().then(body => {
            console.log("body:", body);
            this.setState({ visitor: body, show: true });
          });
        })
        .catch(error => console.log(error));

      /*$http
        .post("/VisitorRegistration", visitor)
        .then(function(data) {
          //$scope.user = {};
          $scope.VisitorRegistration = data;
          console.log(data);
          var data = data.data;
          $scope.imgloc = data.Image;

          // If the image is undefined it triggers the alert message and on clicking OK it displays the Visitor Registration page.
          if (data.Image == undefined) {
            alert("The Image has not been uploaded. Kindly upload the image");
            angular.element("#mymodal").modal("show");
            angular.element("#yesmodal").modal("hide");
          }
          $scope.VName = data.FirstName;
          $scope.LName = data.LastName;
          $scope.person = data.Person;
          $scope.visit = data.Visit;
          $scope.imgloc = data.Image;

          var d = new Date(data.Date);
          $scope.date = d.toLocaleString();

          // We got the other details. Now get the image.
          $http.get("/VisitorImage/" + $scope.imgloc).then(function(data) {
            $scope.img =
              ("data:image/jpg;base64," || "data:image/png;base64,") +
              data.data;
          });
        })
        .catch(function(data) {
          console.log("Error:" + data);
        });
    };*/
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  render() {
    console.log("image:", this.state.image);
    const {
      firstname,
      lastname,
      company,
      jobtitle,
      email,
      mobile,
      person,
      visit,
      image
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
        {!this.state.show ? (
          <div className="modal fade" id="mymodal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header alert alert-warning">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    onClick={e => this.handlerefresh(e)}
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
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "firstname",
                            this.state.firstname,
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
                          name="lastname"
                          value={lastname}
                          onChange={e => this.handleInputChange(e)}
                          id="lastname"
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "lastname",
                            this.state.lastname,
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
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "email",
                            this.state.email,
                            "required|email"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-xs-push-1 col-md-10">
                        <label htmlFor="MobileNumber">MobileNumber</label>
                        <input
                          type="tel"
                          className="form-control"
                          onChange={e => this.handleInputChange(e)}
                          value={mobile}
                          name="mobile"
                          id="mobilenumber"
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "mobile",
                            this.state.mobile,
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
                          value={person}
                          onChange={e => this.handleInputChange(e)}
                          name="person"
                          id="Person"
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "person",
                            this.state.person,
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
                          value={visit}
                          onChange={e => this.handleInputChange(e)}
                          name="visit"
                          id="Visit"
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "visit",
                            this.state.visit,
                            "required|alpha"
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-push-1 col-sm-10">
                        <span>
                          <strong>Kindly upload an image below</strong>
                        </span>
                        <div>
                          <br />
                          <input
                            type="file"
                            onChange={e => this.handleFileUpload(e)}
                            name="image"
                            accept="image/png, image/jpeg"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Kindly upload the image"
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-push-1 col-sm-10">
                        <img
                          src={this.state.imgUpload}
                          alt=""
                          width="120"
                          height="120"
                          quality="0.9"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      className="btn btn-warning"
                      disabled={
                        !this.state.firstname ||
                        !this.state.lastname ||
                        !this.state.email ||
                        !this.state.visit ||
                        !this.state.person
                      }
                      onClick={e => this.handleSubmit(e)}
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
        ) : (
          <div className="modal fade" id="yesmodal">
            <div className="modal-dialog">
              <div className="modal-content" id="printThis">
                <div className="modal-header bg-success">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={e => this.handlerefresh(e)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h2 className="bg-success text-center">
                    <strong>Visitor</strong>
                  </h2>
                </div>
                <div className="modal-body" style={{ textAlign: "center" }}>
                  <div id="container">
                    <div />
                  </div>
                  <h3>
                    <b>
                      {this.state.visitor.firstname}{" "}
                      {this.state.visitor.lastname}
                    </b>
                  </h3>
                  <h4>
                    Visiting: <b> {this.state.visitor.person}</b>
                  </h4>
                  <h4>
                    Purpose Of Visit: <b> {this.state.visitor.visit}</b>
                  </h4>
                  <h4>{this.state.visitor.date}</h4>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-warning"
                  id="Print"
                  onClick={e => this.handlePrint(e)}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
