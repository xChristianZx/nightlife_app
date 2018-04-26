const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Attendee = require("./Attendee");

const VenueSchema = new Schema({
  // alias: String,
  Date: { type: Date, default: Date.now() },
  // name: { type: String, trim: true },
  usersAttending: [{ type: Schema.Types.ObjectId, ref: "User" }],
  yelp_id: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }
});

// _user will be the first attendee for a venue

module.exports = mongoose.model("Venue", VenueSchema);
