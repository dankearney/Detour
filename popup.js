$(document).ready(function() {

	populateList();

	$("#addDetour").click(function() {
		chrome.extension.getBackgroundPage().addToStorage(
			$("#newBlackListedSite").val(),
			$("#newDetourSite").val()
		);
		populateList();
	});

})

function addDetourItem(blackListItem, index) {
	$(".detourItems").append(
		"<div class='detourItem'><button id='" + 
		index + 
		"'>-</button><span class='blacklistedSite'>" +
		blackListItem.site +
		"</span><span class='detour'> => " +
		blackListItem.detour +
		"</span></div>"
	);
	$('#' + index).click(function() {
		removeBlackListed($(this).attr('id'));
		populateList();
	});
}

function removeBlackListed(index) {
	chrome.extension.getBackgroundPage().removeItemFromBlackList(index);
}

function populateList() {
	$(".detourItems").html("");
	blacklist = chrome.extension.getBackgroundPage().getBlackList();
	for (i=0; i<blacklist.length; i++) {
		addDetourItem(blacklist[i], i);
	}
}