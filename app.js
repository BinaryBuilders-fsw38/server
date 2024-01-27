if (process.env.NODE_ENV !== "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./routes/index.js");

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-for

app.use("/", routes);
app.get("/testing", (req, res) => {
  res.send("testing")
})

app.listen(port, () => {
  console.log(`i love u Binar ${port}`);
});
