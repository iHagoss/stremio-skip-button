const express = require("express");
const dotenv = require("dotenv");
const manifestRouter = require("./routes/manifest");
const metaRouter = require("./routes/meta");
const streamRouter = require("./routes/stream");

dotenv.config();

const app = express();

// Serve manifest at /manifest.json
app.use("/manifest.json", manifestRouter);

// Meta route for series metadata
app.use("/meta", metaRouter);

// Streams route for episode streams
app.use("/stream", streamRouter);

// Redirect root to manifest.json
app.get("/", (req, res) => {
  res.redirect("/manifest.json");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Stremio addon listening on port ${port}`);
});
