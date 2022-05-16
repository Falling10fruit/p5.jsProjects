var Shape1, Shape2, Shape3, Shape4, Shape5;


function preload () {
    Shape1 = loadImage("Assets/Square.png");
    Shape2 = loadImage("Assets/Circle.png");
    Shape3 = loadImage("Assets/Diamond.png");
    Shape4 = loadImage("Assets/Pentagon.png");
    Shape5 = loadImage("Assets/Hexagon.png");
}

function setup () {
  // put setup code here
  var Canvas = createCanvas(windowWidth, windowHeight-4);
  console.log(width + " " + height);
}

function draw () {
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER);
    noStroke();
    var Tick = 0;
    var Scene = "Start";
    var Level = [
        [0, 0, 0, 4, 0],
        [0, 3, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 2, 0, 0],
        [0, 0, 0, 5, 0]
    ]

    var processGrid = function  () {
        for (var y = Level.length-1; y > 0; y--) {
            for (var x = 0; x < Level[y].length; x++) {
                if (Level[y][x] > 0) {
                    //Falling
                    if (y < Level.length - 1) {
                        if (Level[y+1][x] == 0) {
                            Level[y+1][x] == Level[y][x];
                            Level[y][x] == 0;
                        }
                    }
                }
            }
        }
    }


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
                    fill(255, 255, 255, 100);
                    rect(x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 95, 95, 20);

                    if (Level[y][x] > 0) {
                        if (Level[y][x] == 1) {
                            image(Shape1, x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 65, 65);
                        } else if (Level[y][x] == 2) {
                            image(Shape2, x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 65, 65);
                        } else if (Level[y][x] == 3) {
                            image(Shape3, x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 65, 65);
                        } else if (Level[y][x] == 4) {
                            image(Shape4, x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 65, 65);
                        } else if (Level[y][x] == 5) {
                            image(Shape5, x*100-(Level[y].length-1)*50 + width/2, y*100-Level.length*50 + height/2, 65, 65);
                        }
                    }
                }
            }
            processGrid();
        }
        //ellipse(width/2, height/2, 10, 10);
        Tick++;
    }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight-4);
}