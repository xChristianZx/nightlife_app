const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Attendee = require("./Attendee");

const VenueSchema = new Schema({
  alias: String,
  Date: Date,
  name: { type: String, trim: true },
  usersAttending: [{ type: Schema.Types.ObjectId, ref: "User" }],
  yelp_id: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

// _user will be the first attendee for a venue

module.exports = mongoose.model("Venues", VenueSchema);
