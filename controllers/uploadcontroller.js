var multer = require('multer');

module.exports.setUpload = function(dest,filename) {
	var storage = multer.diskStorage( {
  		destination: function (req, file, cb) {
    		cb(null,dest)
  		},
  		filename: function (req, file, cb) {
			cb(null,filename);
  		}
	});
	var upload = multer({ storage: storage });
	return upload;
}