function onError(error) {
  console.error(`Error: ${error}`);
}
function sendMessageToTabs(tabs) {
  chrome.tabs.sendMessage(
    tabs.id,
    {greeting: "Hi from background script"}
  ).then(response => {
    console.log("Message from the content script:" + tabs.title);
    console.log(response.response);
  }).catch(onError);
}
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

  console.log(getCurrentTab());