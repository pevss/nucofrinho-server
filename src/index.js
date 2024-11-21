const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 3333;
const app = express();

const user = require("./routes/user");

app.use(express.json());
app.use(cors());

app.use("/user", user);

app.listen(port, () => console.log(`The server is running on port ${port}`));
