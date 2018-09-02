const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.route("/api/venues/").get((req, res) => {
  const options = {
    url:
      "https://api.foursquare.com/v2/venues/explore/?ll=58.3780,26.7290&venuePhotos=1&query=burger&client_id=4JMKQOVUD3DSM4LDVGSUARF1AJ3Z54IICIOBVNCP5RPSFSKI&client_secret=WLANG3TOL0BFHLTZO5EBR4E5KDLG0AIM0AL5PERSYA03IHWX&v=20131124&v=20180901"
  };
  request(options, function(error, response, body) {
    res.send(body);
  });
});

app.route("/api/venues-around-busstation/").get((req, res) => {
  const options = {
    url:
      "https://api.foursquare.com/v2/venues/explore/?ll=58.3780,26.7321&radius=1000&venuePhotos=1&query=burger&client_id=4JMKQOVUD3DSM4LDVGSUARF1AJ3Z54IICIOBVNCP5RPSFSKI&client_secret=WLANG3TOL0BFHLTZO5EBR4E5KDLG0AIM0AL5PERSYA03IHWX&v=20131124"
  };
  request(options, function(error, response, body) {
    res.send(body);
  });
});

app.route("/api/venue-details/*").get((req, res) => {
  const options = {
    url:
      "https://api.foursquare.com/v2/venues/" +
      String(req.params[0]) +
      "?client_id=4JMKQOVUD3DSM4LDVGSUARF1AJ3Z54IICIOBVNCP5RPSFSKI&client_secret=WLANG3TOL0BFHLTZO5EBR4E5KDLG0AIM0AL5PERSYA03IHWX&v=20180901"
  };
  request(options, function(error, response, body) {
    res.send(body);
  });
});

app.use(express.static(__dirname + "/dist/BurgerBlocks"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/BurgerBlocks/index.html"));
});
app.listen(process.env.PORT || 8080);
