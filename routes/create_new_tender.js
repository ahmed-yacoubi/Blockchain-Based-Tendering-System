var express = require('express');
var router = express.Router();
const ipfsClient = require('ipfs-api');
const projectId = '2DKea6bGTgfm0VfFkKLazMPpYuh';
const projectSecret = 'acdfd321e4a45ace8410d7cbda37565a';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

const client = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0/',
  headers: {
    authorization: auth
  }
});
let formidable = require('formidable');
let fs = require('fs');
function uploadImageToIPFS(buffer, callBack) {
  client.add(buffer)
    .then(result => {
      console.log(result);
      try{callBack(result[0].path)}catch(e){}
    });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('create_new_tender')
});
router.post('/upload_img', function (req, res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (error, fields, file) {
    let imgPath = file.fileupload.filepath;
    fs.readFile(imgPath, function (err, data) {
      console.log(data);
      try {
        uploadImageToIPFS(data, function (result) {
          console.log(result);
          res.send(result)

        })
      } catch (e) { }
    });

  });
})
module.exports = router;