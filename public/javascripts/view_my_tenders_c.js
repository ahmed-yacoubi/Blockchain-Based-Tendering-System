let web3;
let accounts;
let contract;


// tenderData['tenderId'] = tenderId;
// tenderData['requestId'] = requestId;
// tenderData['num'] = counter;
// datatable.row.add(tenderData).draw();
function callBack(result) {
    if (result) {
        contract.methods.getUserType().call({ from: accounts[0] })
            .then(function (type, err) {
                if (type == 0) //m
                {
                    window.location.href = "/";


                } else if (type == 1)//c
                {

                    let companyName = document.getElementById('signup');
                    companyName.href = "";
                    companyName.removeAttribute('href');
                    contract.methods.getProfile(accounts[0], 1).call({ from: accounts[0] }).then(function (data, err) {
                        const name = web3.utils.hexToUtf8(data[1]);
                        companyName.textContent = name + ' company';
                    });



                } else ///g
                {
                    window.location.href = "/index_c";

                }


            }); getCompanyRequest();

    } else {
        window.location.href = "/signup";

    }

}


$(document).ready(function () {
    datatable = $('#my_tenders_table').DataTable
        ({
            columns: [
                { data: 'num' }
                , {
                    data: function (data) {
                        return '<a ' + data.hrefM + ' id="' + data.municipalityAddress + '">' + data.municipalityName + ' </a>'

                    }
                },
                {
                    data: function (data) {
                        return '<a ' + data.hrefT + ' id="' + data.tenderId + '">' + data.tenderName + ' </a>'

                    }
                },

                { data: 'startDate' },
                { data: 'endDate' },
                {
                    data: function (data) {
                        return '<span ' + data.class1 + ' id="' + data.tenderId + '">' + data.tenderState + ' </span>'

                    }
                }, {
                    data: function (data) {
                        return '<span ' + data.class + '  id="' + data.requestId + ' ">' + data.companyState + ' </span>'

                    }
                }], rowId: 'requestId'
        })




});

function getCompanyRequest() {
    let counter = 1;
    contract.methods.getContractsRequest(accounts[0], 0).call({ from: accounts[0] }).then
        (function (requestIds) {

            requestIds.forEach(function (data) {
                let tenderData = {};
                if (data != null && data[0] > 0) {
                    let tenderName;
                    let municipalityName;
                    let startDate = new Date(data[8] * 1000).toLocaleDateString();
                    let endDate = new Date(data[9] * 1000).toLocaleDateString();
                    let tenderState;
                    let companyState = data[6];
                    if (companyState) {
                        companyState = 'winner';
                        tenderData['class'] = 'class="badge badge-success"';
                    }
                    else {
                        companyState = 'loser'
                        tenderData['class'] = 'class="badge badge-danger"';
                    }
                    const tenderId = data[3];
                    tenderData['hrefT'] = `href="view_tender_details_c?bindingId=${tenderId}"`
                    const requestId = data[0];
                    contract.methods.getBindingById(tenderId).call({ from: accounts[0] }).then(function (result) {
                        tenderName = result[1];
                        const municipalityAddress = result[6];
                        let isOpened = result[8];
                        let isCanceled = result[7];
                        if (isOpened) {
                            tenderState = 'opened';
                            tenderData['class1'] = 'class="badge badge-success"';

                        } else if (isCanceled) {
                            tenderState = 'canceled';
                            companyState = '-';
                            tenderData['class'] = 'class="badge badge-danger"';
                            tenderData['class1'] = 'class="badge badge-danger"';


                        } else {
                            tenderState = 'active'
                            companyState = 'wait';
                            tenderData['class'] = 'class="badge badge-info light"';
                            tenderData['class1'] = 'class="badge badge-success"';



                        }

                        contract.methods.getProfile(municipalityAddress, 0).call({ from: accounts[0] }).then(function (mData) {
                            // municipalityName = mData[1];

                            municipalityName = web3.utils.hexToUtf8(mData[1]);
                            tenderData['hrefM'] = `href="view_municipaliti_profile_c?address=${municipalityAddress}"`
                            tenderData['tenderName'] = web3.utils.hexToUtf8(tenderName);
                            tenderData['municipalityName'] = municipalityName;
                            tenderData['startDate'] = startDate;
                            tenderData['endDate'] = endDate;
                            tenderData['tenderState'] = tenderState;
                            tenderData['companyState'] = companyState;
                            tenderData['tenderId'] = tenderId;
                            tenderData['requestId'] = requestId;
                            tenderData['num'] = counter;
                            tenderData['municipalityAddress'] = municipalityAddress;
                            datatable.row.add(tenderData).draw();
                            counter++;
                        });
                    });



                }

            });

        });

}
function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

