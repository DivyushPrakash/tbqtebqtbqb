function button1() {
    window.location = "2.html";
}

roomimg = "";
modelstatus = "";
resultsarray = [];

function preload() {
    roomimg = loadImage("Babyroom.jpg");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    cocomodel = ml5.objectDetecter("cocossd", modelloaded);
}

function modelloaded() {
    console.log("Model loaded");
    modelstatus = true;
    cocomodel.detect(roomimg, getresults);
}

function getresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    resultsarray = results;
}

function draw() {
    image(roomimg, 0, 0, 700, 500);
    if (modelstatus != "") {
        for (loopvalue = 0; loopvalue < resultsarray.length; loopvalue = loopvalue + 1) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r, g, b);
            percent = floor(objects[loopvalue].confidence * 100);
            text(resultsarray[loopvalue].label + " " + percent + "%", resultsarray[loopvalue].x + 15, resultsarray[loopvalue].y + 15);
            noFill();
            stroke(r, g, b);
            rect(resultsarray[loopvalue].x, resultsarray[loopvalue].y, resultsarray[loopvalue].width, resultsarray[loopvalue].height);
        }
    }
}