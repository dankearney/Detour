chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      window.location.href = request.url;
      sendResponse({success : "true"});
  }
);