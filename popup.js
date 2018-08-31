const button = document.querySelector("button")
const fromInput = document.querySelector("#from")
const toInput = document.querySelector("#to")

chrome.storage.sync.get(["fromWebsites", "toWebsites"], function(result){
	fromInput.value = result.fromWebsites.join(", ")
	toInput.value = result.toWebsites.join(", ")
})

button.addEventListener("click", function(){
	const from = fromInput.value.split(",").map(val=>val.trim())
	const to = toInput.value.split(",").map(val=>val.trim())

	chrome.storage.sync.set({"fromWebsites": from, "toWebsites": to}, function(){})
})