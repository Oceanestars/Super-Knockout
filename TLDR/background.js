
var path = window.location.pathname;
var page = path.split("/").pop();
console.log( "Page" + page );

function getData(){
    fetch('terms_agreement.json')
    .then(response => response.json())
    .then(data => console.log(data));
}

async function loadData() {
    const response = await fetch('./terms_agreement.json');
    const data = await response.json();
    console.log(data); 
  }
  loadData();
function getTermsAgreement(){

    var data = getData();
    console.log(data);

    // var terms = ""
    // var paragraph_TermAg = document.getElementById("terms_agreement");
    // data.map((item) => ( terms.append("<li>" +item[1].termsAgreement + "</li>")))
    // var websiteName = document.getElementById("websiteName");

    // websiteName = "Facebook";
    // paragraph_TermAg.innerHTML = terms

}
getTermsAgreement()

