const button = document.querySelector("button")
const input = document.querySelector("#from")

chrome.storage.sync.get(["fromWebsites"], function(result){
	input.value = result.fromWebsites.join(", ")
})

button.addEventListener("click", function(){
	const from = input.value.split(",").map(val=>val.trim())

	chrome.storage.sync.set({"fromWebsites": from}, function(){})
})