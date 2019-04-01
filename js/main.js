(() => {

// const index = [0, 1, 2, 3]
let images = document.querySelectorAll('.image'),
	dropZones = document.querySelectorAll('.dropZone'),
	audio = document.querySelectorAll('.audio'),
	pauseButton = document.querySelector('#pauseButton'),
	rewindButton = document.querySelector('#rewindButton'),
	enviroOverlay = document.querySelector('.enviroOverlay'),
	enviro = document.querySelector('#enviro'),
	song = document.querySelector('.songs'),
	songButtons = document.querySelectorAll('.songBtn'),
	instructionsOverlay = document.querySelector('.instructionsOverlay'),
	instructionsBtn = document.querySelector('.instructions'),
	title = document.querySelector('.titleOverlayText'),
	titleOverlay = document.querySelector('.titleOverlay'),
	activeAnimal = [],
	dropped = [],
	activeSong = [],
	animalCon = document.querySelector('#animals');


// to be fix the pasue/play bug
	sound1 = document.querySelector('#sound1');
	sound2 = document.querySelector('#sound2');
	sound3 = document.querySelector('#sound3');
	sound4 = document.querySelector('#sound4');	
// could make this more efficient by using a string with an index?
	// btn1 = document.querySelector('#btn1');
	// btn2 = document.querySelector('#btn2');
	// btn3 = document.querySelector('#btn3');
	// btn4 = document.querySelector('#btn4');
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
						let droppedImg = document.querySelector(`#${img}`);
						dropped.push(droppedImg);

						//play audio
						let track = document.querySelector(`audio[data-audioref="${img}"]`);
						activeAnimal.push(track);
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

	if (sound1.paused && sound2.paused && sound3.paused && sound4.paused && song.paused) {
		pauseButton.innerHTML = '&#xf04c;';
		activeAnimal.forEach(sound=>{sound.play();});
		activeSong[0].play();
	}

	else {
		pauseButton.innerHTML = '&#xf04b;';
		activeAnimal.forEach(sound=>{sound.pause();});
		activeSong[0].pause();
	}
	
 }

function rewind() {
	dropZones.forEach(zone => {
		window.location.reload();
	});
}

function removeIcon() {
		let unwanted = this.firstChild;
		animalCon.appendChild(unwanted);
		let unwantedID = unwanted.id;
		let unwantedAud = document.querySelector(`audio[data-audioref="${unwantedID}"]`);
		unwantedAud.pause();
		activeAnimal.splice(unwantedAud);
}

function swapSong() {
	//debugger;
	let currentSong = this.dataset.currentsong;
	song.src = `audio/${currentSong}`;
	song.load();
	audio.forEach(sound=>{sound.currentTime=0;});
	activeSong.push(song);
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

function swapBG() {
	//debugger;
	if (this.id == 'btn1') {
		enviro.style.backgroundImage = 'url(images/enviro1.svg)';
	}

	else if (this.id == 'btn2') {
		enviro.style.backgroundImage = 'url(images/enviro2.svg)';
	}

	else if (this.id == 'btn3') {
		enviro.style.backgroundImage = 'url(images/enviro3.svg)';
	}

	else {
		enviro.style.backgroundImage = 'url(images/enviro4.svg)';
	}
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
songButtons.forEach(button => {
	button.addEventListener('click', swapBG);
})
instructionsBtn.addEventListener('click', instructionsToggle);
instructionsOverlay.addEventListener('click', instructionsRemove);
instructionsOverlay.addEventListener('click', instructionsFade);
instructionsBtn.addEventListener('click', instructionsFade);

})();
