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

                    let companyName = document.getElementById('signup');
                    companyName.href = "";
                    companyName.removeAttribute('href');
                    contract.methods.getProfile(accounts[0], 1).call({ from: accounts[0] }).then(function (data, err) {
                        const name = web3.utils.hexToUtf8(data[1]);
                        companyName.textContent = name + ' company';
                    });


                } else ///gs
                {
                    document.getElementById('tenders_c').remove();


                }


            }); getTenderDeatils();

    } else {
        window.location.href = "/signup";

    }
}


function createAndAddelementToHTML(text) {
    let htmlElement = document.createElement(`a`)
    htmlElement.setAttribute(`class`, "col-xl-4 col-xxl-6 col-lg-6 col-sm-6")
    htmlElement.innerHTML = `<a href="javascript:void(0);" class="btn btn-primary light btn-xs mb-1">${text}</a>`.trim();
    document.getElementById(`rootElementM`).appendChild(htmlElement);
}
function getTenderDeatils() {


    contract.methods.getBindingById(tenderId).call({ from: accounts[0] })
        .then(function (data, err) {
            let text = data[10];
            let hash = text.substring(0, 46);
            document.getElementById('myImage').setAttribute('src', `https://ahmed-ali.infura-ipfs.io/ipfs/${hash}`);
            let tenderText = text.substring(46, text.length);
            document.getElementById('textTender').textContent = tenderText;
            let details = data[4];
            details.forEach((detail) => {
                createAndAddelementToHTML(web3.utils.hexToUtf8(detail));
            }); let isOpend = data[8];
            let isCanceled = data[7];
            if (isCanceled || isOpend) {
                document.getElementById('submet_tender').remove();
            }
            else { document.getElementById('submet_tender').setAttribute('href', `create_request_tender_c?tenderId=` + tenderId); }
        });

}
function handelError(err) {
    const endIndex = err.search(`"}`)
    const startIndex = err.search(`reason`) + 9
    if (endIndex >= 0) {
        alert("Error! : " + err.substring(startIndex, endIndex))
    }
}

