(() => {

let images = document.querySelectorAll('.image');
	dropZones = document.querySelectorAll('.dropZone');
	audio = document.querySelectorAll('.audio');
console.log(audio);

initDrag();

function initDrag() {
			images.forEach(image => {
				image.addEventListener('dragstart', function(e) {
					console.log('draggin...');
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

						let img = e.dataTransfer.getData('text/plain');
						//debugger;
						e.target.appendChild(document.querySelector(`#${img}`));
						
					}
					else {return;}
				});
			
	});




})();
 


