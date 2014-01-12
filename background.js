chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
  if (blacklisted(tab.url)) {
    detour(tab.url);
  }       
});

chrome.tabs.onCreated.addListener(function(tab) {
  if (blacklisted(tab.url)) {
    detour(tab.url);
  }       
});

function contains(string, substring) {
  return string.indexOf(substring) != -1;
}

function blacklisted(url) {
  return !(getDetour(url) == null);
}

function getDetour(url) {
  blackListItems = getBlackList();
  for (i=0; i<blackListItems.length; i++) {
    blackListItem = blackListItems[i];
    if (contains(url, blackListItem.site)) {
      return blackListItem.detour;
    }
  }
  return null;
}

function detour(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: getDetour(url)});
  });
}

function getBlackList() {
  return JSON.parse(localStorage['blacklisted'])
}

function addToStorage(site, detour) {
  bl = getBlackList();
  newItem = {site : site, detour : detour};
  bl.push(newItem);
  localStorage['blacklisted'] = JSON.stringify(bl);
}

function removeItemFromBlackList(index) {
  bl = getBlackList();
  bl.splice(index, 1)
  localStorage['blacklisted'] = JSON.stringify(bl);
}
