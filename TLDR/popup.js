var terms = ""
var pageName = "";
var buttonSimplify = document.getElementById("simplifyButton");
var resourceButton = document.getElementById("resourceButton");
var urlButton = document.getElementById("urlLink");
var globalwebsiteNameHeader = document.getElementById("websiteName");


buttonSimplify.addEventListener('click', displayTerms);
resourceButton.addEventListener('click', displayResources);


function getCurrentName(){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log("TITLE: " + tabs[0].title);
    if(tabs[0].title.includes("Amazon Business")){
      console.log("HEY");
      pageName = "Amazon";
    }
    else{
      pageName = tabs[0].title;
      
    }
  });
}

async function loadData() {
    const response = await fetch('./terms_agreement.json');
    const data = await response.json();
    return data;
  }

function getTermsAgreement(){

    var data = loadData();
    console.log("pageName1: " + pageName);
  
    var paragraph_TermAg = document.getElementById("terms_agreement");
    var websiteNameHeader = document.getElementById("websiteName");
    var websiteUrl = document.getElementById("urlLink");

    data.then(function(result) {
        // console.log(result["Website"][0].termsAgreement)
        for (let i = 0; i < 5; i++) {
            // checkPage = pageName.includes(result["Website"][i].websiteName.toLowerCase())
            // console.log("IS this in json" + checkPage);

            if (pageName.toLowerCase() == result["Website"][i].websiteName.toLowerCase()){
                for (let j = 0 ; j < result["Website"][i].termsAgreement.length; j++) {
                terms += `<li> ${result["Website"][i].termsAgreement[j]} </li>`;
                }
                websiteNameHeader.innerHTML =  result["Website"][i].websiteName;
                console.log("websiteNameHeader: "+websiteNameHeader);
                paragraph_TermAg.innerHTML = terms;
                urlButton.classList.remove('disabled');
                websiteUrl.href = result["Website"][i].url;
            }
            else{
              if(globalwebsiteNameHeader.innerHTML == "TL-DR"){
                urlButton.classList.add('disabled');
              }
                continue;
            }
          }
          console.log("TEST:" + paragraph_TermAg.innerHTML.length )
          
    });


}
getCurrentName();
getTermsAgreement();

function displayTerms(){
  getTermsAgreement();
  var paragraph_TermAg = document.getElementById("terms_agreement");
  console.log("OVERFLOW: "+ paragraph_TermAg.style.overflow );

  if (paragraph_TermAg.classList.contains("close_terms") ){
    console.log("OPEN");
    paragraph_TermAg.classList.add('open_terms');
    paragraph_TermAg.classList.remove('close_terms');
    paragraph_TermAg.classList.add('noDataMessage');

    // paragraph_TermAg.classList.add('scroll-text');
    if(paragraph_TermAg.innerHTML.length >= 0 && paragraph_TermAg.innerHTML.length <= 20 ){
      // paragraph_TermAg.style.backgroundColor = "white";
      paragraph_TermAg.classList.add('noDataMessage');
      paragraph_TermAg.innerHTML = "At this moment, we do no have enough data on this website. Come back soon!"
      urlButton.classList.add('disabled');
    }


  }
   else if (paragraph_TermAg.classList.contains("open_terms")  ){
    console.log("CLOSE");
    // paragraph_TermAg.classList.remove('scroll-text');
    paragraph_TermAg.classList.add('close_terms');
    paragraph_TermAg.classList.remove('open_terms');
    paragraph_TermAg.classList.remove('noDataMessage');

  }
}

function displayResources(){
  var paragraph_TermAg = document.getElementById("terms_agreement");

  // displayTerms();
  if (paragraph_TermAg.classList.contains("close_terms") ){
    paragraph_TermAg.classList.add('open_terms');
    paragraph_TermAg.classList.remove('close_terms');
    paragraph_TermAg.classList.add('noDataMessage');

    paragraph_TermAg.innerHTML = `<li><a href='https://tech.co/news/understand-online-terms-of-service-2018-05' target='_blank'>How to Understand Online Terms of Service</a></li>
    <li><a href='https://www.europeanbusinessreview.com/why-should-you-always-read-the-terms-and-conditions-carefully/'>Why Should You Always Read The Terms And Conditions Carefully?</a></li>
    <li><a href='https://www.ted.com/talks/veronica_barassi_what_tech_companies_know_about_your_kids?language=en'>What tech companies know about your kids
    </a></li>
    <li><a href='https://www.ted.com/talks/finn_lutzow_holm_myrstad_how_tech_companies_deceive_you_into_giving_up_your_data_and_privacy/transcript?language=en'>How tech companies deceive you into giving up your data and privacy
    </a></li>`;


  }
  else if (paragraph_TermAg.classList.contains("open_terms")  ){
    paragraph_TermAg.classList.add('close_terms');
    paragraph_TermAg.classList.remove('open_terms');
    paragraph_TermAg.innerHTML = "";
    paragraph_TermAg.classList.remove('noDataMessage');


  }

  // paragraph_TermAg.style.color = "black";

}

