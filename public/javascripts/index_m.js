let web3;
let accounts;
let contract;
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


            }); getMunicipalityActiveBindingContracts();
        getMunicipalityEndedBindingContracts();
        getMunicipalityOpenedBindingContracts();
        getMunicipalityCanceledBindingContracts();
    } else {
        window.location.href = "/signup";
    }

}



const activeTenders = 2;
const closedTenders = 3;
const opendTenders = 4;
const caneledTenders = 5;
function getMunicipalityActiveBindingContracts() {

    contract.methods.getBindings(2, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('active_tenders').textContent = count;
    });

}
function getMunicipalityEndedBindingContracts() {


    contract.methods.getBindings(3, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('closed_tenders').textContent = count;

    });

}
function getMunicipalityOpenedBindingContracts() {


    contract.methods.getBindings(4, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('opend_tenders').textContent = count;


    });

}
function getMunicipalityCanceledBindingContracts() {


    contract.methods.getBindings(5, accounts[0]).call({ from: accounts[0] }).then(function (bindings) {
        let count = 0;
        bindings.forEach(tender => {
            if (tender[0] > 0)
                count++;
        })
        document.getElementById('caneled_tenders').textContent = count;


    });

}

function handelError(err) {
    const endIndex = err.search('"}')
    const startIndex = err.search('reason') + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}



