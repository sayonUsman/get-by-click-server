const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GET BY CLICK!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
