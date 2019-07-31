const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(
  express.json({
    limit: "16mb"
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: "16mb"
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index",  {user: null});
});

app.post("/upload", (req, res) => {
  const username = req.body.username;
  const dataUrl = req.body.imageUrl;
  var matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/);
  var buffer = new Buffer(matches[2], "base64");

  try {
    fs.mkdirSync(__dirname + "/image/" + username);
    fs.writeFileSync(__dirname + "/image/" + username + "/" + username +".txt", 0);
  } catch (err) {
    if (err.code == "EEXIST") {
      console.log("directory already existed");
    } else {
      console.log(err);
    }
  }
  data = fs.readFileSync(__dirname + "/image/" + username + "/" + username +".txt", 'utf-8')
  var savePath = path.resolve(
    __dirname + "/image/" + username + "/pic" + parseInt(data) + ".jpg"
  );
  fs.writeFileSync(__dirname + "/image/" + username + "/" + username +".txt", parseInt(data) + 1);
  fs.writeFileSync(savePath, buffer);
  res.render('index',  {
    user: {
      index: parseInt(data),
      username: username
    }
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
