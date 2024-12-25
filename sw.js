self.addEventListener("message", (e) => {
	clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			client.postMessage(e.data);
		});
	});
});
