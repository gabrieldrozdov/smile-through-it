let info = document.querySelector("#info");
let smiley = document.querySelector("#smiley");

let faceapi;
let detections = [];

let video;

function setup() {
	// Create video
	video = createCapture(VIDEO);
	video.hide;
	video.id("video");
	video.size(windowWidth, windowHeight);

	const faceOptions = {
		withLandmarks: true,
		withDescriptors: true,
		minConfidence: 0.5
	};

	//Initialize the model
	faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady() {
	info.innerText = "yay!";
	faceapi.detect(gotFaces); // Start detecting faces
}

// Got faces
function gotFaces(error, result) {
	if (error) {
		console.log(error);
		return;
	}

	detections = result; // All the data

	clear();
	detectSmile(detections, 20, 250, 14); // Draw face expression

	faceapi.detect(gotFaces); // Call the function again at here
}

function detectSmile(detections, x, y, textYSpace) {
	if (detections.length > 0) { // If at least 1 face is detected
		let smile = 0;
		let normal = 0;
		for (i=0; i<detections.length; i++) {
			let { neutral, happy, angry, sad, disgusted, surprised, fearful } = detections[i].expressions;
			smiley.style.transform = "rotateX(" + (180*(1-happy)) + "deg)";
		}

	} else { // If no faces are detected
	}
}