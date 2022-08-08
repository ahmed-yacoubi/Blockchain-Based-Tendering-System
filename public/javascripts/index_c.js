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


            });
        getActiveBindingContracts();
        getEndedBindingContracts();
        getOpenedBindingContracts();
        getCanceledBindingContracts();
        getCompanyCount();
        getMunicipalitiesCount();
        getTotalTendersCount();
        getTotalRequestesCount();
    } else {
        window.location.href = "/signup";
    }
}

function getActiveBindingContracts() {

    contract.methods.getBindings(2, '0x0000000000000000000000000000000000000000').call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('active_tenders').textContent = count;
    });

}
function getEndedBindingContracts() {


    contract.methods.getBindings(3, '0x0000000000000000000000000000000000000000').call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('closed_tenders').textContent = count;

    });

}
function getOpenedBindingContracts() {


    contract.methods.getBindings(4, '0x0000000000000000000000000000000000000000').call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('opend_tenders').textContent = count;


    });

}
function getCanceledBindingContracts() {


    contract.methods.getBindings(5, '0x0000000000000000000000000000000000000000').call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('caneled_tenders').textContent = count;


    });

}

function getCompanyCount() {


    contract.methods.getCountOf(1).call({ from: accounts[0] }).then(function (count) {

        document.getElementById('company').textContent = count;


    });

}
function getMunicipalitiesCount() {


    contract.methods.getCountOf(0).call({ from: accounts[0] }).then(function (count) {

        document.getElementById('municipalities').textContent = count;


    });

}
function getTotalTendersCount() {


    contract.methods.getCountOf(2).call({ from: accounts[0] }).then(function (count) {

        document.getElementById('total_tenders').textContent = count;


    });

}
function getTotalRequestesCount() {


    contract.methods.getCountOf(3).call({ from: accounts[0] }).then(function (count) {

        document.getElementById('total_requests').textContent = count;


    });

}
//municipalities
//total_tenders
//company
const activeTenders = 2;
const closedTenders = 3;
const opendTenders = 4;
const caneledTenders = 5;


function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

