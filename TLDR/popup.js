var terms = ""

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );



// chrome.runtime.onMessage.addListener(request => {
//   console.log("Message from the background script:");
//   console.log(request.greeting);
//   return Promise.resolve({response: "Hi from content script"});
// });

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log(`Tab ${tab.id} is ${tab.url} and ${tab.title}`);
  // sendMessageToTabs(tab)
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
  //       console.log(response.farewell);
  //     });
  //   });
  return tab;
}


async function loadData() {
    const response = await fetch('./terms_agreement.json');
    const data = await response.json();
    return data;
  }

function getTermsAgreement(){

    var data = loadData();
    var pageName = "facebook.com";
    // console.log("pageName: " + pageName);
  
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

