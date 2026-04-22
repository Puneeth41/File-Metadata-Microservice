const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.static("public"));

// Multer setup (store in memory, no files saved)
const upload = multer({ dest: "uploads/" });

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// POST route
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});