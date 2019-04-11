import React, { Component } from 'react';
import sound from '../audio/Instructions.m4a';
import officeImage from '../images/office2.jpg';

export default class coverpage extends Component {
  render() {
    return (
        <div className = "container">
        <div className="row">
            <div className="col-xs-push-3 col-sm-9">
                <p></p>
            </div>
            <div className="form-group col-md-push-9 col-md-10">
            <audio controls>
                    <source src={sound} type = "audio/mp4"></source>
                </audio>
            </div>
            <div className="col-sm-12">
                <h3 className="alert alert-warning"><strong>Visitor Portal</strong></h3>
            </div>
            <div className="form-group col-md-push-10 col-md-12">
                <button className="btn btn-warning" data-dismiss="modal" data-toggle="modal" data-target="#mymodal" data-placement="left" title="If you are a visitor kindly enroll">Enroll</button>&nbsp;
                <button className="btn btn-default" data-toggle="tooltip" data-placement="right" title="If you are an administrator kindly login"><a href="/#!/Login">Login</a></button>
            </div>
            <div className="col-sm-12">
                <img style ={{width: "2500px", height: "750px"}} src={officeImage} className ="img-responsive" alt= "Responsive"/>
            </div>
        </div>
      </div>
    )
  }
}
