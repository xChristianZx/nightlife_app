const keys = require("../config/keys");
const request = require("request");
const Venue = require("../models/Venue");

module.exports = app => {
  // == LOCATION SEARCH == //
  app.post("/venue", (req, res) => {
    const location = req.body.location;
    console.log(req.body);
    // console.log("location: ", req.body.location);
    const listSize = 4;
    const YELP_URL = "https://api.yelp.com/v3/businesses/search?";
    const uriOptions = `term=bars&location=${location}&limit=${listSize}`;
    const baseURL = YELP_URL + uriOptions;
    const reqOptions = {
      auth: {
        bearer: keys.yelpAPIKEY
      }
    };
    // Request to Yelp
    request.get(baseURL, reqOptions, async (err, resp, body) => {
      try {
        // console.log(body.businesses);
        const yelp_res = await JSON.parse(body).businesses;
        const savedVenues = await getSavedVenues();
        const updatedYelp = await yelp_res.map((biz, i) => {
          const newObj = Object.assign({}, biz);
          newObj.usersAttending = [];
          return newObj;
        });
        const finalRes = updatedYelp.map(biz => {
          savedVenues.forEach(venue => {
            if (biz.id === venue.yelp_id) {
              biz.usersAttending.push(...venue.usersAttending);
            }
          });
          return biz;
        });
        res.send(JSON.stringify(finalRes));
        // const work = await updatedYelp();
        console.log("***************");
        console.log("PLEASE: ", updatedYelp);
        console.log("PLEASE 2: ", JSON.stringify(finalRes));
        // console.log(savedVenues);
      } catch (err) {
        console.log(err);
      }
      // res.send(finalRes);
    });
  });

  app.get("/venue", (req, res) => {
    Venue.findOne({ yelp_id: "56DA3F3GkqOrMrLozTJvkQ" }, (err, venue) => {
      if (err) {
        return console.log(err);
      }
      console.log(venue.createdBy);
    });
    // .populate("usersAttending")
    // .exec((err, users) => {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("USERS!", users);
    // });
  });

  // == ADD ATTENDEE == //
  app.post("/venue/user", async (req, res) => {
    const { yelp_id, _user } = req.body;
    console.log("Yelp_id: ", yelp_id);
    console.log("User_id: ", _user);
    try {
      //Search for venue to see if it exists
      const venue = await Venue.findOne({ yelp_id });
      // False - Create Venue and Add user
      if (venue === null) {
        const newVenue = await Venue.create({ yelp_id, createdBy: _user });
        await newVenue.usersAttending.push(_user);
        const savedVenue = await newVenue.save();
        console.log("NewVenue and Attendee: ", savedVenue);
        res.redirect("/");
      } else {
        //True - Add user
        console.log("Found the venue!:", venue);
        await venue.usersAttending.push(_user);
        await venue.save();
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  });
};

function getSavedVenues() {
  return Venue.find({}, (err, venues) => {
    console.log("VENUE LIST: ", venues);
    console.log("------------------------");
    return venues;
  });
}

// Save for now

// return new Promise((resolve, reject) => {
//   const newYelp = yelp_res.map((biz, i) => {
//     const newObj = Object.assign({}, biz);
//     newObj.usersAttending = [];
//     // console.log(`BIZ ${i}:`, biz);

//     // savedVenues.map(venue => {
//     //   console.log("VENUE YELP_ID: ", venue.yelp_id);
//     //   console.log("VENUE USERSATTENDING: ", venue.usersAttending);
//     //   console.log("BIZ_ID: ", biz.id);
//     //   console.log("=======================");
//     //   if (biz.id === venue.yelp_id) {
//     //     return newObj.usersAttending.concat(...venue.usersAttending);
//     //   }
//     // });
//     return newObj;
//   });
//   resolve(newYelp);
// });
// };
