const keys = require("../config/keys");
const request = require("request");

module.exports = app => {
  app.post("/", (req, res) => {
    const location = req.body.location;
    console.log(req.body);
    // console.log("location: ", req.body.location);
    const listSize = 10;
    const YELP_URL = "https://api.yelp.com/v3/businesses/search?";
    const uriOptions = `term=bars&location=${location}&limit=${listSize}`;
    const baseURL = YELP_URL + uriOptions;
    const reqOptions = {
      auth: {
        bearer: keys.yelpAPIKEY
      }
    };

    request.get(baseURL, reqOptions, (err, resp, body) => {
      // console.log(err);
      // console.log(resp.statusCode);
      // console.log(body);
      res.send(body);
    });
  });
};
