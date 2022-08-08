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
                    $(document).ready(function () {
                        datatable = $('#closedTendersTable').DataTable
                            ({
                                columns: [
                                    { data: 'num' }
                                    , { data: 'name' },
                                    { data: 'start_date' },

                                    { data: 'end_date' },
                                    { data: 'tenders_num' },
                                    {
                                        data: function (data) {
                                            return '<a ' + data.href + ' id="' + data.id + '"' + 'class="' + data.class_name + '">' + data.action + ' </a>'

                                        }
                                    }], rowId: 'id'
                            })

                        $('#transaction-tab').on('click', function () {
                            datatable.rows().remove().draw();;
                            let counter = 1;
                            contract.methods.getBindings(2, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
                                bindings.forEach(function (data) {
                                    let tenderData = {};
                                    if (data != null && data[0] > 0) {
                                        console.log(bindings);
                                        const bindingId = data[0];
                                        const name = web3.utils.hexToUtf8(data[1]);
                                        const startDate = new Date(data[2] * 1000).toLocaleDateString();
                                        const endDate = new Date(data[3] * 1000).toLocaleDateString();
                                        tenderData['id'] = bindingId;
                                        tenderData['name'] = name;
                                        tenderData['start_date'] = startDate;
                                        tenderData['end_date'] = endDate;
                                        tenderData['num'] = counter;
                                        tenderData['action'] = 'Cancel Tender'
                                        tenderData['class_name'] = 'badge badge-danger'
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
                            contract.methods.getBindings(4, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
                                bindings.forEach(function (data) {
                                    if (data != null && data[0] > 0) {
                                        let tenderData = {};
                                        const bindingId = data[0];
                                        // alert(bindingId)

                                        const name = web3.utils.hexToUtf8(data[1]);
                                        const startDate = new Date(data[2] * 1000).toLocaleDateString();
                                        const endDate = new Date(data[3] * 1000).toLocaleDateString();
                                        tenderData['id'] = bindingId;
                                        tenderData['name'] = name;
                                        tenderData['start_date'] = startDate;
                                        tenderData['end_date'] = endDate;
                                        tenderData['num'] = counter;
                                        tenderData['action'] = 'View result'
                                        tenderData['class_name'] = 'badge badge-success'
                                        tenderData['href'] = `href= "view_tender_result_m?bindingId=${bindingId}"`

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
                            contract.methods.getBindings(3, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
                                let counter = 1;
                                bindings.forEach(function (data) {
                                    if (data != null && data[0] > 0) {
                                        let tenderData = {};
                                        const bindingId = data[0];
                                        const name = web3.utils.hexToUtf8(data[1]);
                                        // try { name = web3.utils.hexToUtf8(data[1]); } catch (e) { }
                                        const startDate = new Date(data[2] * 1000).toLocaleDateString();
                                        if ((data[2] * 1000) < new Date().getTime()) {
                                            const endDate = new Date(data[3] * 1000).toLocaleDateString();
                                            tenderData['id'] = bindingId;
                                            tenderData['name'] = name;
                                            tenderData['start_date'] = startDate;
                                            tenderData['end_date'] = endDate;
                                            tenderData['num'] = counter;
                                            tenderData['action'] = 'Open Tender'
                                            tenderData['href'] = `href= "view_tender_result_m?bindingId=${bindingId}"`
                                            tenderData['class_name'] = 'badge badge-success'
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
                            contract.methods.getBindings(5, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
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
                                            tenderData['class_name'] = ''
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
$('#closedTendersTable tbody').on('click', 'td', function () {
    var id = datatable.row(this).id();
    if (this.outerHTML.includes('Cancel Tender')) {
        cancelBinding(id);
    }

});



async function cancelBinding(tenderId) {

    try {//uint64 _bindingId, uint64 _requestId, bytes16  
        await contract.methods.openCanceleTender(
            tenderId, 1, 1
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

