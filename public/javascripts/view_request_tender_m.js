let web3;
let accounts;
let contract;
let tenderId;
function callBack(result) {
    if (result) {
        contract.methods.getUserType().call({ from: accounts[0] })
            .then(function (type, err) {
                if (type == 0) //m
                {
                    main();


                } else if (type == 1)//c
                {
                    window.location.href = "/index_c";


                } else ///g
                {
                    window.location.href = "/index_c";

                }


            });
    }
    else {
        window.location.href = "/signup";

    }
}


function createAndAddElementToHTML(name, value) {
    let htmlElement = document.createElement(`div`)
    htmlElement.setAttribute('class', 'mt-2 col-md-3');
    htmlElement.innerHTML = `<div >
    <label class="form-label">${name}</label>
    <select disabled class="default-select form-control wide ">
        <option>${value}</option>
    </select>
</div>`.trim();
    document.getElementById(`rootElementM`).appendChild(htmlElement);

}

function main() {
    contract.methods.getBindingRequestByRequestId(requestId).call({ from: accounts[0] })
        .then(function (request, err) {
            document.getElementById('price').textContent = request[2];
            let text = request[7];
            let hash = text.substring(0, 46);
            document.getElementById('myImage').setAttribute('src', `https://infura-ipfs.io/ipfs/${hash}`);
            let tenderText = text.substring(46, text.length);
            document.getElementById('textTender').textContent = tenderText;
            document.getElementById('startDate').textContent = new Date(request[8] * 1000).toLocaleDateString();
            document.getElementById('endDate').textContent = new Date(request[9] * 1000).toLocaleDateString();

            let requestDetails = request[4];
            tenderId = request[3];
            let companyAddress = request[5];
            requestDetails.forEach((detail) => {
                detail = (web3.utils.hexToUtf8(detail)).split('_');
                createAndAddElementToHTML(detail[0], detail[1]);
            });
            contract.methods.getProfile(companyAddress, 1).call({ from: accounts[0] })
                .then(function (data, err) {
                    document.getElementById('companyPhone').textContent = web3.utils.hexToUtf8(data[2]);
                    document.getElementById('companyAddress').textContent = companyAddress;
                    document.getElementById('companyName').textContent = web3.utils.hexToUtf8(data[1]);
                    contract.methods.getBindingById(tenderId).call({ from: accounts[0] })
                        .then(function (data, err) {
                            let details = data[4];
                            let points = data[5];
                            let isOpend = data[8];
                            let isCanceled = data[7];
                            if (isCanceled || isOpend) {
                                document.getElementById('chooseWinner').remove();
                            }
                            document.getElementById('points').textContent = getTenderPoints(details, points, requestDetails);

                        });
                });

        });

}

function getTenderPoints(details, points, companyDetails) {
    let pointContuer = 0;
    for (let j = 0; j < companyDetails.length; j++) {
        for (let i = 0; i < details.length; i++) {
            if (web3.utils.hexToUtf8(companyDetails[j])
                == web3.utils.hexToUtf8(details[i])) {
                pointContuer += parseFloat(points[i]);
            }
        }
    }
    return pointContuer;
}

function convertStringToBytes(string, bytesLength) {

    return web3.utils.fromAscii(string, bytesLength);
}
function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}


async function openTender(tenderId, requestId) {
    //        uint64 _bindingId,
    // uint64 _requestId,
    // uint8 _type
    try {//uint64 _bindingId, uint64 _requestId, bytes16  
        await contract.methods.openCanceleTender(
            tenderId, requestId, 0
        ).send({ from: accounts[0] }).then((result) => {

        });
    } catch (err) {
        this.handelError(err.message)
    }
}

$('#chooseWinner').on('click', function () {
    openTender(tenderId, requestId);
});