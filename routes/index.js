var express = require('express'),
  router = express.Router(),
  //messager
  uploadController = require('../controllers/uploadController'),
  messageModel = require('../models/message'),
  message = messageModel.message,
  xlsxController = require('../controllers/xlsxController'),
  //uploader
  multer = require('multer'),
  myfileurl = './uploads/',
  myfilename = '1.xlsx',
  upload = uploadController.setUpload(myfileurl,myfilename),
  //sms sender
  smsController = require('../controllers/smsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'xlsx2sms',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
});

router.post('/submit',upload.single('file'), function(req, res, next) {
  //validate input
  req.check('id', 'No id').notEmpty();
  req.check('tophone', 'No destination number').notEmpty();
  req.check('fromphone', 'No source number').notEmpty();
  req.check('apiKey', 'No API key').notEmpty();
  req.check('apiSecret', 'No API secret').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;  
    //init message
    message.id = req.body.id;
    message.tophone = req.body.tophone;
    message.fromphone = req.body.fromphone;
    message.apiKey = req.body.apiKey;
    message.apiSecret = req.body.apiSecret;
    if(xlsxController.initMsg(myfileurl+myfilename,message)==false)
      errors += '\nID not found in file!';
    //send sms
    smsController.sender(message);
  }
  res.redirect('/');
});

module.exports = router;