const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("To Do World!");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
