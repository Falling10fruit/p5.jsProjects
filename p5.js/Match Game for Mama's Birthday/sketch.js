function preload () {
    /*Square = loadImage("Assets/Square.jpg");
    Circle = loadImage("Assets/Circle.jpg");
    Diamond = loadImage("Assets/Diamond.jpg");
    Pentagon = loadImage("Assets/Pentagon.jpg");
    Hexagon = loadImage("Assets/Hexagon.jpg");*/
}

function setup () {
  // put setup code here
  var Canvas = createCanvas(windowWidth, windowHeight-4);
  console.log(width + " " + height);
}

function draw () {
    rectMode(CENTER);
    textAlign(CENTER);
    noStroke();
    var Scene = "Start";
    var Level = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]
    draw = function () {
        background(100, 255, 255);
        for (var i = 0; i < ceil(width/100); i ++) {
            fill(50, 255, 100);
            ellipse(i*100 + width/100, height, 150, 100);
        }
        if (Scene == "Start") {
            fill(50, 50, 50);
            textAlign(CENTER);
            textStyle(BOLD);
            textSize(100);
            text("Matching Game!", width/2, height/2 - 100);
            if (abs(mouseX-width/2) > 75 || abs(mouseY+15-height/2) > 25) {
                textSize(50);
            } else {
                if (mouseIsPressed === true) {
                    Scene = "Play!";
                }
            }
            text("Play!", width/2, height/2);
        } else if (Scene == "Play!") {
            textStyle(NORMAL);
            fill(255, 255, 255);
            for (var y = 0; y < Level.length; y++){
                for (var x = 0; x < Level[y].length; x++) {
                    textSize(25);
                    fill(255, 255, 255);
                    rect(x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 100, 100);
                    fill(0, 0, 0);
                    text(Level[y][x], x*100-(Level[y].length-1)*50 + width/2, y*100-(Level.length-1)*50 + height/2);
                    text(2*100-(Level[y].length-1)*50, 100, 100);
                }
            }
        }
        
        ellipse(width/2, height/2, 10, 10);
    }
}