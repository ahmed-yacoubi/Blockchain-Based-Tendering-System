let web3;
let accounts;
let contract;
let datatable;

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


            });
        $(document).ready(function () {
            document.getElementById('mAddress').textContent = mAddress;
            contract.methods.getProfile(mAddress, 0).call({ from: accounts[0] })
                .then(function (bindings, err) {
                    // 
                    document.getElementById('municipalityName').textContent = web3.utils.hexToUtf8(bindings[1]) + " Municipality"
                });
            datatable = $('#closedTendersTable').DataTable
                ({
                    columns: [
                        { data: 'num' }
                        , {
                            data: function (data) {
                                return '<a id="' + data.id + '"' + data.link + '">' + data.name + ' </a>'
                            }
                        },
                        { data: 'start_date' },

                        { data: 'end_date' },
                        { data: 'tenders_num' }, {
                            data: function (data) {
                                return '<a class="' + data.class_name + '"' + data.link2 + '>' + data.action + ' </a>'

                            }
                        }
                    ], rowId: 'id'
                })


            $('#transaction-tab').on('click', function () {
                datatable.rows().remove().draw();;
                let counter = 1;
                contract.methods.getBindings(2, mAddress).call({ from: accounts[0] }).then(function (bindings) {
                    bindings.forEach(function (data) {
                        let tenderData = {};
                        if (data != null && data[0] > 0) {

                            const bindingId = data[0];
                            const name = web3.utils.hexToUtf8(data[1]);
                            const startDate = new Date(data[2] * 1000).toLocaleDateString();
                            const endDate = new Date(data[3] * 1000).toLocaleDateString();
                            tenderData['id'] = bindingId;
                            tenderData['name'] = name;
                            tenderData['start_date'] = startDate;
                            tenderData['end_date'] = endDate;
                            tenderData['num'] = counter;
                            tenderData['action'] = 'submet request'
                            tenderData['class_name'] = 'badge badge-info light'
                            tenderData['link'] = `href="view_tender_details_c?bindingId=${bindingId}"`
                            tenderData['link2'] = `href="view_tender_details_c?bindingId=${bindingId}"`
                            counter++;
                            tenderData['tenders_num'] = 'unknown know';
                            datatable.row.add(tenderData).draw();
                        }

                    });

                });
            })
            $('#OpenedTenders-tab').on('click', function () {
                datatable.rows().remove().draw();
                let counter = 1;
                contract.methods.getBindings(4, mAddress).call({ from: accounts[0] }).then(function (bindings) {
                    bindings.forEach(function (data) {
                        if (data != null && data[0] > 0) {
                            let tenderData = {};

                            const bindingId = data[0];
                            const name = web3.utils.hexToUtf8(data[1]);
                            const startDate = new Date(data[2] * 1000).toLocaleDateString();
                            const endDate = new Date(data[3] * 1000).toLocaleDateString();
                            tenderData['id'] = bindingId;
                            tenderData['name'] = name;
                            tenderData['start_date'] = startDate;
                            tenderData['end_date'] = endDate;
                            tenderData['num'] = counter;
                            tenderData['link2'] = `href="view_tender_result_c?bindingId=${bindingId}"`
                            tenderData['class_name'] = 'badge badge-info light';
                            tenderData['action'] = 'view result';
                            tenderData['link'] = `href="view_tender_details_c?bindingId=${bindingId}"`
                            counter++;
                            contract.methods.getContractsRequest('0x0000000000000000000000000000000000000000', bindingId).call({ from: accounts[0] }).then(function (requestIds) {

                                tenderData['tenders_num'] = requestIds.length;
                                datatable.row.add(tenderData).draw();

                            });

                        }

                    });

                });
            });
            $('#ClosedTenders-tab').on('click', function () {
                datatable.rows().remove().draw();
                contract.methods.getBindings(3, mAddress).call({ from: accounts[0] }).then(function (bindings) {
                    let counter = 1;
                    bindings.forEach(function (data) {
                        if (data != null && data[0] > 0) {
                            let tenderData = {};
                            const bindingId = data[0];
                            const name = web3.utils.hexToUtf8(data[1]);
                            const startDate = new Date(data[2] * 1000).toLocaleDateString();
                            if ((data[2] * 1000) < new Date().getTime()) {
                                const endDate = new Date(data[3] * 1000).toLocaleDateString();
                                tenderData['id'] = bindingId;
                                tenderData['name'] = name;
                                tenderData['start_date'] = startDate;
                                tenderData['end_date'] = endDate;
                                tenderData['num'] = counter;
                                tenderData['class_name'] = 'badge badge-info light'
                                tenderData['link2'] = `href="view_tender_result_c?bindingId=${bindingId}"`
                                tenderData['class_name'] = 'badge badge-info light';
                                tenderData['action'] = 'view result';
                                tenderData['link'] = `href="view_tender_details_c?bindingId=${bindingId}"`
                                counter++;
                                contract.methods.getContractsRequest('0x0000000000000000000000000000000000000000', bindingId).call({ from: accounts[0] }).then(function (requestIds) {

                                    tenderData['tenders_num'] = requestIds.length;
                                    datatable.row.add(tenderData).draw();

                                });
                            }


                        }

                    });

                });
            });
            $('#ClosedTenders-tab').click();
            $('#CanceledTenders-tab').on('click', function () {
                datatable.rows().remove().draw();
                contract.methods.getBindings(5, mAddress).call({ from: accounts[0] }).then(function (bindings) {
                    let counter = 1;

                    bindings.forEach(function (data) {
                        if (data != null && data[0] > 0) {
                            let tenderData = {};
                            const bindingId = data[0];
                            if (bindingId > 0) {

                                const name = web3.utils.hexToUtf8(data[1]);
                                const startDate = new Date(data[2] * 1000).toLocaleDateString();
                                const endDate = new Date(data[3] * 1000).toLocaleDateString();
                                tenderData['id'] = bindingId;
                                tenderData['name'] = name;
                                tenderData['start_date'] = startDate;
                                tenderData['end_date'] = endDate;
                                tenderData['num'] = counter;
                                tenderData['action'] = 'No Action'
                                tenderData['class_name'] = 'badge badge-info light'
                                tenderData['link'] = ''
                                tenderData['link2'] = ''

                                counter++;

                                contract.methods.getContractsRequest('0x0000000000000000000000000000000000000000', bindingId).call({ from: accounts[0] }).then(function (requestIds) {

                                    tenderData['tenders_num'] = requestIds.length;
                                    datatable.row.add(tenderData).draw();

                                });

                            }

                        }

                    });

                });
            })
        });
    } else {
        window.location.href = "/signup";

    }


}




async function cancelBinding(tenderId) {

    try {//uint64 _bindingId, uint64 _requestId, bytes16  
        await contract.methods.cancelBinding(
            tenderId,
        ).send({ from: accounts[0] }).then((result) => {

            $(`#closedTendersTable tr:eq(${tenderId})`).remove().draw();
        });
    } catch (err) {
        this.handelError(err.message)
    }
}


function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

