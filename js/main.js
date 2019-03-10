(() => {

let images = document.querySelectorAll('.image');
	dropZones = document.querySelectorAll('.dropZone');
	audio = document.querySelector('.audio');
	pauseButton = document.querySelector('#pauseButton');
	rewindButton = document.querySelector('#rewindButton');
	muteButton = document.querySelector('#muteButton');
	
initDrag();

function initDrag() {
			images.forEach(image => {
				image.addEventListener('dragstart', function(e) {
					console.log('draggin...');
					e.dataTransfer.effectAllowed = "copy";
					e.dataTransfer.setData('text/plain', this.id);
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

					}
					else {return;}
				});
			
	});

//functions
function pause() {
	if (audio.paused) {
		audio.play();
		pauseButton.style.background = 'url(images/pause.svg)';
	}

	else {
		audio.pause();
		pauseButton.style.background = 'url(images/play.svg)';
	}
	
}

function rewind() {
	audio.currentTime = 0;
}

function mute() {
	if (audio.muted == true) {
		audio.muted = false;
		muteButton.style.background = "url(images/mute.svg)";

	}

	else {
		audio.muted = true;
		muteButton.style.background = "url(images/unmute.svg)";
	}
	
}

function removeIcon() {
	dropZones.forEach(zone => {
		zone.innerHTML = null;
		audio.pause();
	});
}



//events
pauseButton.addEventListener('click', pause);
rewindButton.addEventListener('click', rewind);
muteButton.addEventListener('click', mute);
dropZones.forEach(zone=> {
	zone.addEventListener('click', removeIcon);
});


})();
