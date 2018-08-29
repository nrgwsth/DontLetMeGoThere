chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({fromWebsites: ["facebook.com", "9gag.com"], toWebsites: ["github.com"]}, function(){
		console.log("Storage is set")
	})
})

chrome.tabs.onUpdated.addListener(function(tabId, props) {
	chrome.storage.sync.get(["fromWebsites", "toWebsites"], function(result){
		const fromWebsites = result.fromWebsites,
			  toWebsites = result.toWebsites

		const s = new RegExp("(" + fromWebsites.join("|") + ")")

		if(props.url && props.url.match(s)){
			chrome.tabs.update(tabId, {
				url: "https://github.com"
			}, function(){
			})
		}
	})
})