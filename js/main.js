(() => {

let images = document.querySelectorAll('.image');
	dropZones = document.querySelectorAll('.dropZone');
	audio = document.querySelector('.audio');
	pauseButton = document.querySelector('#pauseButton');
	rewindButton = document.querySelector('#rewindButton');
	enviroOverlay = document.querySelector('.enviroOverlay');
	song = document.querySelector('.songs');
	songButtons = document.querySelectorAll('.songBtn');
//console.log(songButtons);


initDrag();

function initDrag() {
			images.forEach(image => {
				image.addEventListener('dragstart', function(e) {
					console.log('draggin...');
					e.dataTransfer.effectAllowed = "copy";
					e.dataTransfer.setData('text/plain', this.id);
					enviroOverlay.classList.add("overlay");
				});
				image.addEventListener('dragend', function(e) {
					enviroOverlay.classList.remove("overlay");
				});
			});
		}

	//handle drag over and drop
	dropZones.forEach(zone => {
			zone.addEventListener("dragover", function(e) {
				e.preventDefault();
				console.log("you dragged over me!");
				
			});

				

				zone.addEventListener("drop", function(e) {
					if (zone.firstChild == null) {
						e.preventDefault();
						console.log("you dropped sumpin on me");
						e.dataTransfer.dropEffect = "copy";
						let img = e.dataTransfer.getData('text/plain');

						//debugger;
						e.target.appendChild(document.querySelector(`#${img}`));
						

						//swapSource
						let track = document.querySelector(`#${img}`);
						let currentTrack = track.dataset.currenttrack;
						audio.src = `audio/${currentTrack}`;
						audio.play();
						song.currentTime = 0;

					}
					else {return;}
				});
			
	});

//functions
function pause() {
	// accounts for different icon size
	pauseButton.style.width = '20.58px';
	if (audio.paused) {
		audio.play();
		pauseButton.innerHTML = '&#xf04c;';
	}

	else {
		audio.pause();
		pauseButton.innerHTML = '&#xf04b;';
	}
	
}

function pauseSong() {
	// accounts for different icon size
	pauseButton.style.width = '20.58px';
	if (song.paused) {
		song.play();
		pauseButton.innerHTML = '&#xf04c;';
	}

	// else if (dropZones.forEach(zone => {
	// 	zone.firstChild == null;
	// 	console.log('hi')
	// })) {
	// 	song.pause();
	// 	audio.pause();
	// }

	else {
		song.pause();
		pauseButton.innerHTML = '&#xf04b;';
	}
	
}

function rewind() {
	dropZones.forEach(zone => {
		window.location.reload();
	});
}

function removeIcon() {
	dropZones.forEach(zone => {
		zone.innerHTML = null;
		audio.pause();
	});
}

function swapSong() {
	//debugger;
	let currentSong = this.dataset.currentsong;
	song.src = `audio/${currentSong}`;
	song.load();
	song.play();
}



//events
pauseButton.addEventListener('click', pausePlay);
rewindButton.addEventListener('click', rewind);
dropZones.forEach(zone=> {
	zone.addEventListener('click', removeIcon);
});
songButtons.forEach(button => {
	button.addEventListener('click', swapSong);
})
pauseButton.addEventListener('click', pauseSong);



})();
