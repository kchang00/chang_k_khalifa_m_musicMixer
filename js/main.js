(() => {

let images = document.querySelectorAll('.image');
	dropZones = document.querySelectorAll('.dropZone');
	audio = document.querySelector('.audio');
	pauseButton = document.querySelector('#pauseButton');
	rewindButton = document.querySelector('#rewindButton');
	enviroOverlay = document.querySelector('.enviroOverlay');
	enviro = document.querySelector('#enviro');
	song = document.querySelector('.songs');
	songButtons = document.querySelectorAll('.songBtn');
	instructionsOverlay = document.querySelector('.instructionsOverlay');
	instructionsBtn = document.querySelector('.instructions');
	title = document.querySelector('.titleOverlayText');
	titleOverlay = document.querySelector('.titleOverlay');

// could make this more efficient by using a string with an index?
	btn1 = document.querySelector('#btn1');
	btn2 = document.querySelector('#btn2');
	btn3 = document.querySelector('#btn3');
	btn4 = document.querySelector('#btn4');
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
						// let track = document.querySelector(`#${img}`);
						// let currentTrack = track.dataset.currenttrack;
						// audio.src = `audio/${currentTrack}`;
						// audio.play();
						// song.currentTime = 0;

						//play audio
						let track = document.querySelector(`audio[data-audioref="${img}"]`);
						
						song.currentTime = 0;
						track.play();

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

function instructionsToggle() {
	instructionsOverlay.classList.toggle('hidden');
}

function instructionsRemove() {
	instructionsOverlay.classList.add('hidden');
}

function instructionsFade() {
	instructionsOverlay.classList.remove('oneFade');
	title.classList.remove('pulsing');
	title.classList.add('oneZoom');
	titleOverlay.classList.add('fadeOut');
}

function swapBg1() {
	enviro.style.backgroundImage = 'url(images/enviro10.svg)';
}
function swapBg2() {
	enviro.style.backgroundImage = 'url(images/enviro2.svg)';
}
function swapBg3() {
	enviro.style.backgroundImage = 'url(images/enviro3.svg)';
}
function swapBg4() {
	enviro.style.backgroundImage = 'url(images/enviro4.svg)';
}

//events
pauseButton.addEventListener('click', pause);
rewindButton.addEventListener('click', rewind);
dropZones.forEach(zone=> {
	zone.addEventListener('click', removeIcon);
});
songButtons.forEach(button => {
	button.addEventListener('click', swapSong);
})
pauseButton.addEventListener('click', pauseSong);

instructionsBtn.addEventListener('click', instructionsToggle);
instructionsOverlay.addEventListener('click', instructionsRemove);
instructionsOverlay.addEventListener('click', instructionsFade);
instructionsBtn.addEventListener('click', instructionsFade);

btn1.addEventListener('click', swapBg1);
btn2.addEventListener('click', swapBg2);
btn3.addEventListener('click', swapBg3);
btn4.addEventListener('click', swapBg4);


})();
