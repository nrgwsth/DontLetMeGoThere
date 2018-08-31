var link = document.createElement("link")
var url = chrome.extension.getURL("content.css")
link.setAttribute("href", url)
link.setAttribute("rel", "stylesheet")
link.setAttribute("type", "text/css")

document.head.appendChild(link)

chrome.storage.sync.get(["timeout"], function(object){
	const timeout = object.timeout
	const root = (function(){
		const root = document.createElement("div")
		root.setAttribute("class", "root")
		const clock = (function(){
			const clock = document.createElement("div")
			clock.setAttribute("class", "wrapper")
			const spinner = document.createElement("div")
			spinner.setAttribute("class", "pie spinner")
			const filler = document.createElement("div")
			filler.setAttribute("class", "pie filler")
			const mask = document.createElement("div")
			mask.setAttribute("class", "mask")
			spinner.style["animation"] = `rota ${timeout*60}s linear infinite`
			filler.style["animation"] = `opa ${timeout*60}s steps(1, end) infinite reverse`
			mask.style["animation"] = `opa ${timeout*60}s steps(1, end) infinite`

			clock.appendChild(spinner)
			clock.appendChild(filler)
			clock.appendChild(mask)
			return clock
		})()
		root.appendChild(clock)
		return root
	})()
	document.body.appendChild(root)
})