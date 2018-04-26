const keys = require("../config/keys");
const request = require("request");
const Venue = require("../models/Venue");

module.exports = app => {
  // == LOCATION SEARCH == //
  app.get("/venue/:location", (req, res) => {
    // const location = req.body.location;
    const location = req.params.location;
    console.log("Body", req.body);
    console.log("PARAMS: ", req.params);
    const listSize = 10;
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
        const yelp_res = await JSON.parse(body).businesses;
        const savedVenues = await getSavedVenues();
        // Add usersAttending property to yelp response
        const updatedYelp = await yelp_res.map((biz, i) => {
          const newObj = Object.assign({}, biz);
          newObj.usersAttending = [];
          return newObj;
        });

        // Add usersAttending to yelp_response
        const finalRes = updatedYelp.map(biz => {
          savedVenues.forEach(venue => {
            if (biz.id === venue.yelp_id) {
              biz.usersAttending.push(...venue.usersAttending);
            }
          });
          return biz;
        });
        res.send(JSON.stringify(finalRes));
      } catch (err) {
        console.log(err);
      }
    });
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
        return res.send(savedVenue);
      } else {
        //True - Add user
        console.log("Found the venue:", venue);
        await venue.usersAttending.push(_user);
        const savedVenue = await venue.save();
        return res.send(savedVenue);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // == REMOVE ATTENDEE == //
  app.put("/venue/user", (req, res) => {
    const { yelp_id, _user } = req.body;
    console.log("======= REMOVE ATTENDEE ========");
    console.log("Yelp_id: ", yelp_id);
    console.log("User_id: ", _user, typeof _user);

    Venue.findOne({ yelp_id }, (err, venue) => {
      if (err) {
        return console.log(err);
      }
      // if only one user left, then remove whole document
      if (venue.usersAttending.length <= 1) {
        venue.remove();
        const remVen = venue.save();
        return res.sendStatus(200);
      }
      // Remove user
      venue.update({ $pull: { usersAttending: _user } }).exec();
      return res.sendStatus(200);
    });
  });
};

function getSavedVenues() {
  // This returns venues with attendees and 
  // returns the "refs" for User
  return Venue.find({})
    .populate("usersAttending")
    .then(venues => {
      return venues;
    })
    .catch(err => console.log(err));
  // return Venue.find({}, (err, venues) => {
  //   console.log("VENUE LIST: ", venues);
  //   console.log("------------------------");
  //   return venues;
  // });
}

// Save for now

// return new Promise((resolve, reject) => {
//   const newYelp = yelp_res.map((biz, i) => {
//     const newObj = Object.assign({}, biz);
//     newObj.usersAttending = [];
//     console.log(`BIZ ${i}:`, biz);

//     savedVenues.map(venue => {
//       console.log("VENUE YELP_ID: ", venue.yelp_id);
//       console.log("VENUE USERSATTENDING: ", venue.usersAttending);
//       console.log("BIZ_ID: ", biz.id);
//       console.log("=======================");
//       if (biz.id === venue.yelp_id) {
//         return newObj.usersAttending.concat(...venue.usersAttending);
//       }
//     });
//     return newObj;
//   });
//   resolve(newYelp);
// });
// };
