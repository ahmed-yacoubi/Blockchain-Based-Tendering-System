let web3;
let accounts;
let contract;
function callBack(result) {
 

}



function editNameM() {

    let name = document.getElementById('newName').value;
    contract.methods.editInfo(1, 0, convertStringToBytes(name, 16)).send({ from: accounts[0] }).then(function () {
        window.location.href = "index_c";



    });

}
function editPhoneM() {

    let phone = document.getElementById('newPhoneNo').value;
    contract.methods.editInfo(1, 1, convertStringToBytes(phone, 16)).send({ from: accounts[0] }).then(function () {
        window.location.href = "index_c";

    });

}

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

let changeName = document.getElementById('changeName');
$('#changeName').on('click', function () {
    editNameM();
})
let changePhoneNo = document.getElementById('changePhoneNo');

 $('#changePhoneNo').on('click', function () {
    editPhoneM();
})