const multer = require('multer');
const path = require('path');

const upload = multer({
    dest: path.resolve(__dirname, "../media/")
});

module.exports = upload;

