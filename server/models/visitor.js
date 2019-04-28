/**
 * Created by Meghana on 4/23/2019.
 */

// Setup.
import mongoose from "mongoose"; // Helper for communicating with Mongodb.
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  jobtitle: {
    type: String
  },

  mobilenumber: {
    type: Number
  },

  company: {
    type: String
  },

  person: {
    type: String,
    required: true
  },

  visit: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  uuid: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }
});
export default mongoose.model("visitor", VisitorSchema);
