if (process.env.NODE_ENV !== "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-for

app.use("/", routes);

app.listen(port, () => {
  console.log(`i love u Binar ${port}`);
});
