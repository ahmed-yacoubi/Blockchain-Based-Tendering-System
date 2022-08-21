let web3;
let accounts;
let contract;
let datatable;
let tenderName;
let startDate;
let endDate;
let tenderText;
let hashImage;
let details = [];
let points = [];
function callBack(result) {
    if (result) {
        contract.methods.getUserType().call({ from: accounts[0] })
            .then(function (type, err) {
                if (type == 0) //m
                {

                    let companyName = document.getElementById('signup');
                    companyName.href = "";
                    companyName.removeAttribute('href');
                    contract.methods.getProfile(accounts[0], 0).call({ from: accounts[0] }).then(function (data, err) {
                        const name = web3.utils.hexToUtf8(data[1]);
                        companyName.textContent = name + ' municipality';
                    });

                } else if (type == 1)//c
                {
                    window.location.href = "/index_c";


                } else ///g
                {
                    window.location.href = "/index_c";

                }


            });
    } else {
        window.location.href = "/signup";

    }
}


// name = test_x_0
// op1 = test_x_1
// op2 = test_x_3
// op3 = test_x_5
// op4 = test_x_7
// op5 = test_x_9

// p1 = test_x_2
// p2 = test_x_4
// p3 = test_x_6
// p4 = test_x_8
// p5 = test_x_10
function getDeatils() {
    let counter = 0;


    while (true) {
        let object_name = document.getElementById(`test_${counter}_0`);
        let name;
        if (object_name == null) {
            break;
        } else {
            name = object_name.value;
            if (name.length == 0)
                break
        }
        let op1 = document.getElementById(`test_${counter}_1`).value
        let op2 = document.getElementById(`test_${counter}_3`).value
        let op3 = document.getElementById(`test_${counter}_5`).value
        let op4 = document.getElementById(`test_${counter}_7`).value
        let op5 = document.getElementById(`test_${counter}_9`).value

        let p1 = document.getElementById(`test_${counter}_2`).value
        let p2 = document.getElementById(`test_${counter}_4`).value
        let p3 = document.getElementById(`test_${counter}_6`).value
        let p4 = document.getElementById(`test_${counter}_8`).value
        let p5 = document.getElementById(`test_${counter}_10`).value
        if (name.length > 0) {
            if (op1.length > 0 && p1.length > 0) {
                details.push(convertStringToBytes(`${name}_${op1}`, 16));
                points.push(parseInt(`${p1}`));
            }
            if (op2.length > 0 && p2.length > 0) {
                details.push(convertStringToBytes(`${name}_${op2}`, 16));
                points.push(parseInt(`${p2}`));
            }
            if (op3.length > 0 && p3.length > 0) {
                details.push(convertStringToBytes(`${name}_${op3}`, 16));
                points.push(parseInt(`${p3}`));
            }
            if (op4.length > 0 && p4.length > 0) {
                details.push(convertStringToBytes(`${name}_${op4}`, 16));
                points.push(parseInt(`${p4}`));
            }
            if (op5.length > 0 && p5.length > 0) {
                details.push(convertStringToBytes(`${name}_${op5}`, 16));
                points.push(parseInt(`${p5}`));
            }
        }



        counter++;
    }
}
$('#create_tender_btn').on('click', async function () {
    startDate = Date.now() / 1000;
    endDate = Date.parse(document.getElementById('end_date').value) / 1000;
    tenderName = document.getElementById('tender_name').value;
    tenderText = document.getElementById('tender_text').value;
    getDeatils();
    if (document.getElementById('uploadState1').textContent.includes('successfully')) {
        if (startDate != null && endDate != null && tenderName != null && tenderText != null && details != null && points != null && hashImage) {
            try {
                await contract.methods.createBindingContract(
                    convertStringToBytes(tenderName, 32),
                    parseInt(startDate),
                    parseInt(endDate),
                    details,
                    points, hashImage + tenderText
                ).send({ from: accounts[0] }).then((result) => {
                    window.location.href = "view_tenders_m";

                });
            } catch (err) {
                alert(err)
                handelError(err.message)
            }
        } else {
            alert('Enter all fields')
        }

        if (document.getElementById('uploadState1').textContent.includes('wait')) {
            alert('Uploading image please wait');
        }
    } else {
        alert('Please choose an image to upload')
    }




});
function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

function convertStringToBytes(string, bytesLength) {

    return web3.utils.fromAscii(string, bytesLength);
}

var input = document.getElementById('imageFile');



input.onchange = function (e) {
    document.getElementById('uploadState1').textContent = 'Uploading image... Please wait'
    document.getElementById('uploadState1').style.color = 'red'
    var file = input.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        // buffer = Buffer(reader.result);
        uploadFile(file);
    }

};
async function uploadFile(file) {
    let formData = new FormData();
    formData.append("fileupload", file);
    await fetch('/create_new_tender/upload_img', {
        method: "POST",
        body: formData

    }).then(response => {
        response.text().then(result => {
            hashImage = result;
            document.getElementById('uploadState1').textContent = 'The image has been uploaded successfully'
            document.getElementById('uploadState1').style.color = 'green'
        });

    });
}
