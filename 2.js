function button2() {
    window.location = "1.html";
}


modelstatus = "";
resultsarray = [];


function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    cocomodel = ml5.objectDetecter("cocossd", modelloaded);
}

function modelloaded() {
    console.log("Model loaded");
    modelstatus = true;
    cocomodel.detect(camera, getresults);
}

function getresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    resultsarray = results;
}

function draw() {
    image(0, 0, 700, 500);
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