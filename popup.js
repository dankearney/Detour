$(document).ready(function() {

	populateList();

	$("#addDetour").click(function() {

		var site = $("#newBlackListedSite").val();
		var detour = 'http://' + $("#newDetourSite").val();
			
		if (contains(detour, site)) {
			showErr();
		} else {
			hideErr();
				chrome.extension.getBackgroundPage().addToStorage(
					site,
					detour
				);
			populateList();
		}
	});

})

function showErr() {
	$("#err").show(200);
}

function hideErr() {
	$("#err").hide(200);
}

function contains(string, substring) {
  return string.indexOf(substring) != -1;
}

function addDetourItem(blackListItem, index) {
	$("<div class='detourItem'><button  class='btn btn-xs btn-danger' id='" + 
		index + 
		"'>remove</button><span class='blacklistedSite'>" +
		blackListItem.site +
		"</span><span class='right-arrow'/><span class='detour'> " +
		blackListItem.detour +
		"</span></div>"
	).appendTo(".detourItems");
	
	$('#' + index).click(function() {
		removeBlackListed($(this).attr('id'));
		populateList();
	});
}

function removeBlackListed(index) {
	chrome.extension.getBackgroundPage().removeItemFromBlackList(index);
}

function showMyDetours(blacklist) {
	blacklist.length == 0 ? $("#myDetours").show() : $("#myDetours").hide();
}

function populateList() {
	$(".detourItems").html("");
	blacklist = chrome.extension.getBackgroundPage().getBlackList();
	showMyDetours(blacklist);
	for (i=0; i<blacklist.length; i++) {
		addDetourItem(blacklist[i], i);
	}
}