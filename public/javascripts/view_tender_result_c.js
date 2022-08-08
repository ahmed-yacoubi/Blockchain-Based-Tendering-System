let web3;
let accounts;
let contract;

function callBack(result) {
    if (result) {
        contract.methods.getUserType().call({ from: accounts[0] })
            .then(function (type, err) {
                if (type == 0) //m
                {
                    window.location.href = "/";



                } else if (type == 1)//c
                {
                    document.getElementById('signup').remove();



                } else ///g
                {
                    document.getElementById('tenders_c').remove();

                }


            }); getTenderResult();

    }else {
        window.location.href = "/signup";

    }
}

$(document).ready(function () {




    // requestData['points'] = points;
    // requestData['isWinner'] = isWinner;
    datatable = $('#requestTable').DataTable
        ({
            columns: [
                { data: 'num' }
                , { data: 'companyName' }
                , { data: 'price' },

                { data: 'startDate' },
                { data: 'endDate' },
                { data: 'points' },
                {
                    data: function (data) {
                        return `<span ${data.className}>${data.isWinner}</span>`

                    }
                }, {
                    data: function (data) {
                        return `<a ${data.href} class="btn btn-primary shadow btn-xs sharp"><i class="fa fa-eye"></i></a>`

                    }
                }], rowId: 'companyName'
        })




});

function getTenderResult() {

    contract.methods.getBindingById(tenderId).call({ from: accounts[0] })
        .then(function (dataM, err) {
            let detailsM = dataM[4];
            let pointsM = dataM[5];

            let counter = 1;
            contract.methods.getContractsRequest('0x0000000000000000000000000000000000000000', tenderId).call({ from: accounts[0] })
                .then(function (requests, err) {
                    requests.forEach((data) => {
                        let requestData = {};
                        let requestId = data[0];
                        if  (requestId>0){
                            let companyName;
                            let price = data[2];
                            let startDate = data[8];
                            let endDate = data[9];
                            let points = getTenderPoints(detailsM, pointsM, data[4]);
                            let isWinner = data[6];
    
                            contract.methods.getProfile(data[5], 1).call({ from: accounts[0] })
                                .then(function (bindings, err) {
                                    companyName = web3.utils.hexToUtf8(bindings[1]);
                                    requestData['companyName'] = companyName;
                                    requestData['price'] = price;
                                    requestData['startDate'] = new Date(startDate * 1000).toLocaleDateString();
                                    requestData['endDate'] = new Date(endDate * 1000).toLocaleDateString();
                                    requestData['points'] = points;
                                    requestData['href'] = ` href="view_request_tender_c?requestId=${requestId}"`;
                                    if (isWinner) {
                                        requestData['isWinner'] = 'Yes';
                                        requestData['className'] = ` class="badge badge-success" `;
                                    }
                                    else {
                                        requestData['isWinner'] = 'No';
                                        requestData['className'] = ` class="badge badge-danger" `;
    
                                    }
                                    requestData['num'] = counter;
                                    datatable.row.add(requestData).draw();
    
                                    counter++;
    
                                });
                        }
              
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
function handelError(err) {
    const endIndex = err.search(`"}`)
    const startIndex = err.search(`reason`) + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

