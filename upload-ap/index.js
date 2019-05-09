const express = require("express");
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const app = express();
const path = require('path');
const MAX_SIZE = 10000000;
const upload = multer({
    dest: './uploads/'
});
app.use("/static", express.static(path.join(__dirname, "static")));
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});
app.post('/multiple', upload.array('files'), (req, res) => {
    res.json({ files: req.files });
});
app.post('/dropzone', upload.single('file'), async(req, res) => {
    try {
        await sharp(req.file.path)
            .resize(200, 100)

        .toFile(`./static/${req.file.originalname}`);

        fs.unlink(req.file.path, () => {
            res.json({ file: `/static/${req.file.originalname}` });
        });
    } catch (err) {
        res.status(422).json({ err });
    }

});
app.listen(3344, () => console.log("Running on localhost:3344"));