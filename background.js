function getRandom(arr){
	return arr[Math.floor(Math.random() * arr.length)]
}

chrome.runtime.onInstalled.addListener(function(){
	chrome.storage.sync.set({
		fromWebsites: ["facebook.com", "9gag.com"],
		toWebsites: ["http://github.com"],
		timeout: 1
	}, function(){
		console.log("Storage is set")
	})
})

chrome.tabs.onUpdated.addListener(function(tabId, props) {
	chrome.storage.sync.get(["fromWebsites", "toWebsites", "timeout"], function(result){
		const fromWebsites = result.fromWebsites,
			  toWebsites = result.toWebsites,
			  timeout = result.timeout

		const s = new RegExp("(" + fromWebsites.join("|") + ")")

		if(props.url && props.url.match(s)){
			chrome.tabs.executeScript(tabId, {
				file: "contentScript.js",
				runAt: "document_idle"
			})
			setInterval(function(){
				const url = getRandom(toWebsites)
				chrome.tabs.update(tabId, {
					url: url
				})
			}, timeout * 60000)
		}
	})
})