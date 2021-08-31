/**
 * Created by Meghana on 4/23/2019.
 */

// Initializing the node module variables...
import Visitor from "../models/visitor"; // Reference to Visitor.js
import path from "path"; // Provides utilities for working with file and directory paths.
import fs from "fs"; //  Provides file system.

// Find and get all the documents from the VisitorRegistration table.
module.exports = function (server) {
  server.get("/VisitorRegistration", function (req, res) {
    // use mongoose to get all user data in the database
    Visitor.find(function (err, VisitorRegistration) {
      // if there is an error retrieving, send the error. Nothing after res.send(err) will execute.
      if (err) return res.status(500).send("Error occured");
      res.json(VisitorRegistration); // return all the data in JSON format
    });
  });

  server.post("/uploadImage", (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv(
      `${__dirname}/../images/upload/${req.body.filename}`,
      function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ file: `images/upload/${req.body.filename}` });
      }
    );
  });

  // Inserts the data in to the VisitorRegistration table.
  server.post("/VisitorRegistration", (req, res, next) => {
    var visitorData = req.body;
    var visitor = new Visitor(visitorData);
    visitor.save(function (err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  });

  // Retrieves the image from the destination path of the server.
  server.get("/VisitorImage/:imgloc", function (req, res) {
    var imagePath = path.join(__dirname, "../images/upload/");
    imagePath = imagePath + req.params.imgloc;
    fs.readFile(imagePath, function (err, img) {
      if (!err) {
        // Convert Uint8Array img to base64 encoded string.
        var b64encoded = Buffer.from(img).toString("base64");
        res.writeHead(200, { "Content-Type": "image/jpeg" || "image/png" });
        res.end(b64encoded);
        console.log("Image retrieved");
      } else {
        console.log("Image retrieval failed");
      }
    });
  });

  // Find and get a specific document from the VisitorRegistration table by property name(UUID).
  server.get("/VisitorRegistration/:objName", function (req, res) {
    Visitor.findOne(
      { UUID: req.params.objName },
      function (err, VisitorRegistration) {
        if (err) return res.status(500).send("Error occured");
        res.json(VisitorRegistration);
      }
    );
  });

  // Find and Update the document from the VisitorRegistration table by property name passed(UUID).
  server.put("/VisitorRegistration/:objName", function (req, res) {
    Visitor.findOneAndUpdate(
      { UUID: req.params.objName },
      req.body,
      function (err, VisitorRegistration) {
        if (err) return res.status(500).send("Error occured");
        res.json(VisitorRegistration);
      }
    );
  });

  // Find and Remove the document from VisitorRegistration table by the property name passed(UUID).
  server.delete("/VisitorRegistration/:objName", function (req, res) {
    Visitor.findOneAndRemove(
      { UUID: req.params.objName },
      req.body,
      function (err, VisitorRegistration) {
        if (err) return res.status(500).send("Error occured");
        res.json(VisitorRegistration);
      }
    );
  });

  // Default route.
  server.get("/", function (req, res) {
    // Load the single view file(angular will handle the page changes on the front-end).
    res.sendFile(path.join(__dirname + "index.html"));
  });
};
