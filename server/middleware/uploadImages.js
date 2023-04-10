const multer = require('multer');
const path = require('path');
const fs = require("fs");

// CONFIGURATION FOR MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "../upload");
    cb(null,path.join(__dirname,'../upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
