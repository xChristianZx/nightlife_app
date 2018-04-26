const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  username: { type: String, trim: true },
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  password: { type: String, trim: true }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
