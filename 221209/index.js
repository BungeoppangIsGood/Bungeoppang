const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.use("/img", express.static("img"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.render("shopdetail");
});

app.get("/register", function (req, res) {
  res.render("shopregister");
});

app.listen(port, () => {
  console.log("server open: ", port);
});
