const express = require("express");
require("dotenv").config()

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(express.static('dist'))

app.listen(port, () => {
    console.log("Listening to requests on port " + port);
});