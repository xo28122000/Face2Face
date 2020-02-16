const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 5001;
// { id: 1, lat: 37.787729, long: -127.396699 },
//   { id: 2, lat: 37.788659, long: -127.397612 }
users = [{ id: 0, lat: 37.787659, long: -127.396612, issearchable: false }];
function between(x, min, max) {
  return x >= min && x <= max;
}
function isNear(id) {
  console.log(users[id].issearchable);
  if (users[id].issearchable) {
    uLat = users[id].lat;
    uLong = users[id].long;
    for (var i = 0; i < users.length; i++) {
      if (i !== id && users[i].issearchable) {
        if (
          between(users[i].lat, uLat - 0.0001, uLat + 0.0001) &&
          between(users[i].long, uLong - 0.0001, uLong + 0.0001)
        ) {
          console.log(users[i]);
          return true;
        } else {
        }
      }
    }
  }

  return false;
}

app.get("/", (req, res) => {
  res.send("hey!");
});
app.get("/api/users", (req, res) => {
  res.send(users);
});
app.post("/api/newuser", (req, res) => {
  var newuser = {
    id: users.length,
    lat: req.body.lat,
    long: req.body.long,
    issearchable: false
  };
  users.push(newuser);
  res.send({ id: users.length - 1 });
});
app.post("/api/startsearch", (req, res) => {
  users[req.body.id].issearchable = true;
  res.send({ isnear: isNear(req.body.id) });
});
app.post("/api/stopsearch", (req, res) => {
  users[req.body.id].issearchable = false;
  res.send("done");
});
app.post("/api/changeloc", (req, res) => {
  users[req.body.id].lat = req.body.lat;
  users[req.body.id].long = req.body.long;
  res.send({ isnear: isNear(req.body.id) });
});
// app.post("/api/isnear", (req, res) => {
//   res.send({ isnear: isNear(req.body.id) });
// });
app.listen(port, () => console.log(`app listening on port ${port}!`));
