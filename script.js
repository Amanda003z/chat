"use strict";

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("sw.js")
		.then(() => {
			console.log("Service Worker activated");
		})
		.catch((err) => {
			console.error("Error: ", err);
		});
}

const createMsg = (type, text) => {
	const div = document.createElement("DIV");
	div.classList.add("message");
	if (type == "sent") {
		div.classList.add("sent");
	} else if (type == "received") {
		div.classList.add("received");
	}

	const p = document.createElement("P");
	p.innerHTML = text;

	div.appendChild(p);
	document.querySelector(".chatting_area").appendChild(div);
};

//Send message
let text;
document.getElementById("button").addEventListener("click", () => {
	const p = document.getElementById("input");
	text = p.value;
	p.value = "";

	if (text.length > 0) {
		createMsg("sent", text);

		navigator.serviceWorker.ready.then((res) => {
			res.active.postMessage(text);
		});
	}
});

//Receive message
navigator.serviceWorker.addEventListener("message", (e) => {
	if (text != e.data) {
		createMsg("received", e.data);
	}
});
