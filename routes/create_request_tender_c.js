var express = require('express');
var router = express.Router();
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
let formidable = require('formidable');
let fs = require('fs');
function uploadImageToIPFS(buffer, callBack) {

    ipfs.add(buffer, async (error, resutls) => {
        // console.log('ipfs results' + resutls);
        console.log(resutls);
        callBack(resutls[0].path)

    });

}


/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('create_request_tender_c',{tender_id:req.query.tenderId})
});
router.post('/upload_img', function (req, res) {
    let form = new formidable.IncomingForm();

    form.parse(req, function (error, fields, file) {
        let imgPath = file.fileupload.filepath;
        fs.readFile(imgPath, function (err, data) {
            console.log(data);
            uploadImageToIPFS(data, function (result) {
                console.log(result);
                res.send(result)

            })
        });

    });
})
module.exports = router;
