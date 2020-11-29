"use strict";

import socket from "../socket";
import store from "../store";

socket.on("dnbradio", function (data) {
	console.log(data);

	let streams = [
		"https://dnbradio.hardcoding.nl/.mp3",
		"https://darkstep.hardcoding.nl/dnbradio_darkstep",
		"https://chat.jungletrain.net/streamtest/;",
	];

	function insertPlayer(stream) {
		document.querySelector(".logo-container").innerHTML +=
			'<audio controls id="dnbradio-tuner" src="' +
			stream +
			'" style="width:100%;padding: 0 8px;"></audio>';
		return document.querySelector("#dnbradio-tuner");
	}

	function getPlayer() {
		return document.querySelector("#dnbradio-tuner") || insertPlayer();
	}

	if (data.command == "tune") {
		let stream = streams[-1 + data.args[0]] || streams[0];
		let e = document.querySelector("#dnbradio-tuner");
		if (e) e.remove();
		insertPlayer(stream).play();
		return;
	}
	if (data.command == "play") {
		getPlayer().play();
		return;
	}
	if (data.command == "stop") {
		getPlayer().pause();
		return;
	}
});
