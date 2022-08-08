let web3;
let accounts;
let contract;
let hashImage;

function callBack(result) {
    if (result) {
        contract.methods.getUserType().call({ from: accounts[0] })
            .then(function (type, err) {
                if (type == 0) //m
                {
                    window.location.href = "/";


                } else if (type == 1)//c
                {
                    getTenderDeatils();
                    document.getElementById('signup').remove();

                } else ///g
                {
                    window.location.href = "/";

                }


            });
    } else {
        window.location.href = "/signup";

    }

}


function getTenderDeatils() {
    contract.methods.getBindingById(tenderId).call({ from: accounts[0] })
        .then(function (data, err) {

            let details = data[4];
            handelDetailsElements(details);

        });

}
function createAndAddelementToHTML(name, details) {
    let htmlElement = document.createElement(`div`)
    htmlElement.setAttribute('class', 'mb-3 col-md-3');
    htmlElement.innerHTML = `<div>
    <label class="form-label">  &nbsp;&nbsp;  &nbsp;&nbsp; ${name}</label>
    <select class="default-select form-control wide" name="selectDetalis" id="${name}">
        <option selected="">Select. </option>
        
    </select>
</div>`.trim();
    document.getElementById(`rootElementM`).appendChild(htmlElement);
    details.forEach(element => {
        createAndAddSelectElementToHTML(element, `${name}`);
    });
}

function createAndAddSelectElementToHTML(name, id) {
    let htmlElement = document.createElement(`option`)
    htmlElement.innerHTML = `<option>${name}</option>`.trim();
    document.getElementById(id).appendChild(htmlElement);
}
function main() {//companyId, details,

    let price = parseFloat(document.getElementById('price').value);
    let text = document.getElementById('textTender').value;
    let startDate = parseInt(Date.parse(document.getElementById('startDate').value) / 1000);
    let endDate = parseInt(Date.parse(document.getElementById('endDate').value) / 1000);
    let companyId;
    let details = [];
    let detailsElements = document.getElementsByName('selectDetalis');

    detailsElements.forEach(element => {

        details.push(convertStringToBytes(`${element.getAttribute('id')}_${element.value}`, 16));
    });
    contract.methods.getProfile(accounts[0], 1).call({ from: accounts[0] })
        .then(function (data, err) {
            companyId = data[0];
            createRequest(parseInt(companyId), parseInt(price),
                parseInt(tenderId), details, hashImage + text, startDate, endDate);
        });
}
async function createRequest(companyId, price, bindingId, details, text, startDate, endDate) {
    if (document.getElementById('uploadState1').textContent.includes('successfully')) {
        if (companyId != null && price != null && bindingId != null && details != null && text != null && startDate != null && endDate) {
            try {
                await contract.methods.requestToBinding(
                    companyId, price, bindingId, details, text, startDate, endDate
                ).send({ from: accounts[0] });
            } catch (err) {
                alert(err)
                handelError(err.message)
            }
        } else {
            alert('Enter all fields')
        }

    } else if (document.getElementById('uploadState1').textContent.includes('wait')) {

        alert('Uploading image please wait');
    } else {
        alert('Please choose an image to upload')
    }


}
function handelDetailsElements(details) {
    let names = [];
    let oneDetails = [];
    let justFirst = true;
    let key;
    let value;
    let counter = 0;
    details.forEach(detail => {
        detail = web3.utils.hexToUtf8(detail)
        detail = detail.split('_');
        key = detail[0];
        value = detail[1];
        if (names.includes(key) || justFirst) {
            oneDetails.push(value);
            names.push(key);
            justFirst = false;
        } else {
            createAndAddelementToHTML(names[counter - 1], oneDetails);

            oneDetails = [];

            oneDetails.push(value);
            names.push(key);
        }
        counter++;
    });


    createAndAddelementToHTML(key, oneDetails);


}
function convertStringToBytes(string, bytesLength) {

    return web3.utils.fromAscii(string, bytesLength);
}
$('#submet_request').on('click', function () { main() })
function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

var input = document.getElementById('imageFile');



input.onchange = function (e) {
    document.getElementById('uploadState1').textContent = 'Uploading image... Please wait'
    document.getElementById('uploadState1').style.color = 'red'
    var file = input.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {

        uploadFile(file);
    }

};
async function uploadFile(file) {
    let formData = new FormData();
    formData.append("fileupload", file);
    await fetch('/create_request_tender_c/upload_img', {
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
