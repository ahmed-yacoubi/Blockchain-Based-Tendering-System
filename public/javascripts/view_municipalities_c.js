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
                {                    document.getElementById('tenders_c').remove();


                }


            }); getCompanyRequest();

    }else {
        window.location.href = "/signup";

    }


}


function createAndAddelementToHTML(municipaliti, addressM) {
    let htmlElement = document.createElement(`div`)
    htmlElement.setAttribute(`class`, "col-xl-4 col-xxl-6 col-lg-6 col-sm-6")
    htmlElement.innerHTML =
        ` <div class="widget-stat card bg-info">` +
        `<a href="view_municipaliti_profile_c?address=${addressM}">` +
        `<div class="card-body p-4">` +
        `<div class="media">` +
        `<span class="me-3"><i class="la la-landmark"></i></span>` +
        `<div class="media-body text-white">` +
        `<p class="mb-1">${'Municipaliti'}</p>` +
        `<h3 class="text-white">${municipaliti}<span><i class="la la-clipboard"></i></span></h3>` +
        `<small>${addressM} <span></span></small>` +
        `</div>` +
        `</div>` +
        `</div>` +
        `</a>` +
        `</div>`.trim();
    document.getElementById(`rootElementM`).appendChild(htmlElement);
}
function getCompanyRequest() {
    let addresses = [];
    contract.methods.getBindings(1, `0x0000000000000000000000000000000000000000`).call({ from: accounts[0] })
        .then(function (bindings, err) {
            bindings.forEach(function (data) {
                if (data != null && data[0] > 0) {
                    const address = data[6];
                    if (!addresses.includes(address))
                        addresses.push(address);
                }
            });
            addresses.forEach(address => {
                contract.methods.getProfile(address, 0).call({ from: accounts[0] })
                    .then(function (bindings, err) {
                        // here u can create new element and nothing
                        createAndAddelementToHTML(web3.utils.hexToUtf8(bindings[1]), address);
                    });
            })

        });

}
function handelError(err) {
    const endIndex = err.search(`"}`)
    const startIndex = err.search(`reason`) + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

