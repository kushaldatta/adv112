var prediction = "";

Webcam.set({
    height: 350,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function capture_image() {
    Webcam.snap(function(data_uri) {
        document.getElementById("output").innerHTML = '<img id="captured_image" src="' + data_uri + '">';
    });
}

console.log("ml5 version: " + ml5.version);
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wN0TbFxwb/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function identify_image() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function speak() {
    synth = window.speechSynthesis;
    speak_data = "The Prediction Is" + prediction;
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("prediction_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Thumbs Up") {
            document.getElementById("prediction_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Thumbs Down") {
            document.getElementById("prediction_emoji").innerHTML = "&#128078;";
        }
        if (results[0].label == "Victory") {
            document.getElementById("prediction_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("prediction_emoji").innerHTML = "&#9996;";
        }
    }
}