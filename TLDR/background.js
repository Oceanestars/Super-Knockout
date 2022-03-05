var terms = ""

function getPageName(){
    var path = window.location.pathname;
    var site = location.hostname,
    title = document.title;

console.log("Site: " + site + " - Title: " + title + "Path" + path);
    var page = path.split("/").pop();
    return site;
}

async function loadData() {
    const response = await fetch('./terms_agreement.json');
    const data = await response.json();
    return data;
  }

function getTermsAgreement(){

    var data = loadData();
    var pageName = getPageName();
    console.log("pageName: " + pageName);
  
    var paragraph_TermAg = document.getElementById("terms_agreement");
    var websiteNameHeader = document.getElementById("websiteName");

    data.then(function(result) {
        console.log(result["Website"][0].termsAgreement)
        for (let i = 0; i < 3; i++) {
            checkPage = pageName.includes(result["Website"][i].websiteName.toLowerCase())
            console.log("IS this in json" + checkPage);
            if (checkPage){
                for (let j = 0 ; j < result["Website"][i].termsAgreement.length; j++) {
                terms += `<li> ${result["Website"][i].termsAgreement[j]} </li>`;
                }
                websiteNameHeader.innerHTML =  result["Website"][i].websiteName;
                console.log(websiteNameHeader);
                paragraph_TermAg.innerHTML = terms

            }
            else{
                continue;
            }
          }

        // websiteNameHeader.innerHTML =  result["Website"][0].websiteName;
        // paragraph_TermAg.innerHTML = terms
    });


}
getTermsAgreement()

