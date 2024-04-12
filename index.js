const express = require("express");
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videos");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/videos", videoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
