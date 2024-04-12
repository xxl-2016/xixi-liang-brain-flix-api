require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 3000;
// const BrainFlixApi = require("../xixi-liang-brain-flix/src/api/BrainFlixApi.js");
// const apiKey = process.env.API_KEY;
// const brainFlixApi = new BrainFlixApi(apiKey);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
