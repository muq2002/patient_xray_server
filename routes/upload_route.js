const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../config/config_db.js");

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded files
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    cb(null, `${timestamp}${fileExtension}`);
  },
});

const upload = multer({ storage });

router.post("/upload/:id", upload.single("image"), (req, res) => {
  const patientId = req.params.id;
  const filePath = req.file.path;

  const query = "INSERT INTO images_table (PatientID, ImagePath) VALUES (?, ?)";

  pool.query(query, [patientId, filePath], (error, results) => {
    if (error) {
      console.error("Error inserting data into the database:", error);
      return res
        .status(500)
        .json({ error: "Failed to save file data to the database" });
    }

    // Return a success response with the filename
    res.json({
      message: "File uploaded and data saved successfully",
      fileName: req.file.filename,
    });
  });
});
// Endpoint to query image using patientId
router.get("/upload/:id", (req, res) => {
  // Get the patientId from the URL parameter
  const patientId = req.params.id;

  // Query the database for the entry with the given patientId
  const query = "SELECT ImagePath FROM images_table WHERE PatientID = ?";

  pool.query(query, [patientId], (error, results) => {
    if (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Failed to query the database" });
    }

    // Check if any results were found
    if (results.length > 0) {
      const imagePath = results[0].ImagePath;

      // Use path.join to construct the full file path
      const fullImagePath = path.join(__dirname, "..", imagePath);

      // Return the full path to the image file
      res.sendFile(fullImagePath);
    } else {
      // No matching entry found
      res
        .status(404)
        .json({ error: "No matching entry found for the given patientId" });
    }
  });
});

module.exports = router;
