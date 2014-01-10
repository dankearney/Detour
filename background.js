chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if (blacklisted(tab.url)) {
    redirect(tab.url);
  }       
});

function contains(string, substring) {
  return string.indexOf(substring) != -1;
}

function blacklisted(url) {
  return !(getRedirect(url) == null);
}

function getRedirect(url) {
  urls = JSON.parse(localStorage['blacklisted']);
  for (blacklistedUrl in urls) {
    if (contains(url, blacklistedUrl)) {
      return urls[blacklistedUrl];
    }
  }
  return null;
}

function redirect(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {url: getRedirect(url)}, function(response) {
      console.log(response.success);
    });
  });
}