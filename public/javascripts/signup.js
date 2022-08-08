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
                    window.location.href = "/index_c";


                } else ///g
                {

                }


            });
    }
}
$('#signup').on('click', function () {
    let type = document.getElementById('inputState').value;
    let name = document.getElementById('name').value;
    let phoneNo = document.getElementById('phoneNo').value;

    if (phoneNo.length > 0 && name.length > 0) {
        if (type === 'company') {
            signUp(name, phoneNo, 1, success => {
                
                window.location.replace("/index_c");

            });
        } else if (type === 'municipality') {
            signUp(name, phoneNo, 0, success => {
                if (success)
                    window.location.replace("/");

            });

        }

    }
});


async function signUp(name, phoneNo, type, success) {

    try {
        await contract.methods.signUp(
            convertStringToBytes(name, 16),
            convertStringToBytes(phoneNo, 16),
            type
        ).send({ from: accounts[0] }).then((result) => {
            success(true)
        });
    } catch (err) {
        handelError(err.message)
        success(false)

    }
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
