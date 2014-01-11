chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      window.location = request.url;
      sendResponse({success : "true"});
  }
);