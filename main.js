song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleft = 0;
scoreright = 0;

function preload() {
    song = loadSound("music.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloded);
    posenet.on('pose', gotresult);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    if (scoreleft > 0.2) {



        circle(leftwristX, leftwristY, 20);

        leftwrist = Number(leftwristY);
        roundup = floor(leftwrist);
        volume = roundup / 500;
        document.getElementById("volume").innerHTML = "Volume =" + volume;
        song.setVolume(volume);
    }

    if (scoreright > 0.2) {

        circle(rightwristX, rightwristY, 20);

        if (rightwristY > 0 && rightwristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        } else if (rightwristY > 100 && rightwristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        } else if (rightwristY > 200 && rightwristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        } else if (rightwristY > 300 && rightwristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        } else if (rightwristY > 400 && rightwristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}


function play() {
    song.play();
    song.setVolume(1);
    song.reat(1);
}

function modelloded() {
    console.log("modelloded");

}

function gotresult(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleft = results[0].pose.keypoints[9].score;
        scoreright = results[0].pose.keypoints[10].score;
        console.log("scoreleft =" + scoreleft + "scoreright =" + scoreright);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log(" leftwristX = " + leftwristX + " leftwristY = " + leftwristY + " rigthwristX = " + rightwristX + " rigthwristY = " + rightwristY);
    }


}