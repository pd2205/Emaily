const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/user");
require("./services/passport");

const welcomeRouth = require("./routes/welcomeRoute");
const authRouth = require("./routes/authRoutes");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

mongoose.connect(keys.mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

welcomeRouth(app);
authRouth(app);
require("./routes/billingRoutes")(app);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist/assets"));
}

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
