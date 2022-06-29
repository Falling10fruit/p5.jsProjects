/*
      __     __   ______    ________
    /  /   /  / /  ___  / /__     __/
   /  /___/  / / /   / /     /  /
  /   ___   / / /   / /     /  /
 /  /   /  / / /___/ /  ___/  /___
/__/   /__/ /_______/ /__________/

*/
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
    var Score = 0;
    var Level = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ];
    var Matches = [
        [[2, 4], [2, 3], [1, 3]]
    ];
    var Particles = [{
        X: 0,
        Y: 0,
        Size: 25
    }];

    var processGrid = function () {
        for (var y = Level.length-1; y > -1; y--) {
            for (var x = 0; x < Level[y].length; x++) {

                //Object stuff
                if (Level[y][x] > 0) {
                    //Falling
                    if (y < Level.length - 1) {
                        if (Level[y+1][x] == 0) {
                            Level[y+1][x] = Level[y][x];
                            Level[y][x] = 0;
                        }
                    }

                    //Matching
                    let Continue = true;
                    for (var i = 0; i < Matches.length; i++) { //Fore every group
                        for (var index = 0; index < Matches[i].length; index++) { //For every Item
                            if (Matches[i][index] == [y, x]) {
                                i = Matches.length;
                                index = Matches[i].length;
                                Continue = false;
                            }
                        }
                    }

                    if (Continue) { // If selected item is already in a group or not
                        let Y = y;
                        let X = x;
                        Matches.push([]);
                        while (Level[Y][X] == Level[y][x]) {
                            for (var Group = 0; Group < Matches.length; Group++) { // For every match group
                                for (var Item = 0; Item < Matches[Group].length; Item++) { //For every item in group
                                    if (Matches[i].includes([Y, X])) { //If The selected object is already in a group
                                        Matches.push(Matches[i].concat(Matches[Matches.length-1])); // Merges Matches[i] with the latest Match group
                                        Matches.splice(i, 1); //Remove the... Wait what is i. What is 
                                        Matches.splice(Matches.length-2, 1); // This is pointless and breaks things- NEVERMIND, turns out that the code blow is the one that makes things
                                    } else {
                                        Matches[Matches.length-1][Matches[Matches.length-1].length-1].push([Y, X]); // Huh, this is weird, why add a array to an existing set of objects
                                    }
                                }
                            }
                            X++;
                        } //Right
                        Y = y+1;
                        X = x;
                        while (Level[Y][X] == Level[y][x]) {
                            for (var Group = 0; Group < Matches.length; Group++) { // For every match group
                                for (var Item = 0; Item < Matches[Group].length; Item++) { //For every item in group
                                    if (Matches[i].includes([Y, X])) {
                                        Matches.push(Matches[i].concat(Matches[Matches.length-1]));
                                        Matches.splice(i, 1);
                                        Matches.splice(Matches.length-2, 1);
                                    } else {
                                        Matches[Matches.length-1][Matches[Matches.length-1].length-1].push([Y, X]);
                                    }
                                }
                            }
                            Y++;
                        } //Down
                        Y = y;
                        X = x-1;
                        while (Level[Y][X] == Level[y][x]) {
                            for (var Group = 0; Group < Matches.length; Group++) { // For every match group
                                for (var Item = 0; Item < Matches[Group].length; Item++) { //For every item in group
                                    if (Matches[i].includes([Y, X])) {
                                        Matches.push(Matches[i].concat(Matches[Matches.length-1]));
                                        Matches.splice(i, 1);
                                        Matches.splice(Matches.length-2, 1);
                                    } else {
                                        Matches[Matches.length-1][Matches[Matches.length-1].length-1].push([Y, X]);
                                    }
                                }
                            }
                            X--;
                        } //Left
                        Y = y-1;
                        X = x;
                        while (Level[Y][X] == Level[y][x]) {
                            for (var Group = 0; Group < Matches.length; Group++) { // For every match group
                                for (var Item = 0; Item < Matches[Group].length; Item++) { //For every item in group
                                    if (Matches[i].includes([Y, X])) {
                                        Matches.push(Matches[i].concat(Matches[Matches.length-1]));
                                        Matches.splice(i, 1);
                                        Matches.splice(Matches.length-2, 1);
                                    } else {
                                        Matches[Matches.length-1][Matches[Matches.length-1].length-1].push([Y, X]);
                                    }
                                }
                            }
                            Y--;
                        } //Up
                    }
                }

                //Creating new objects when top is clear
                if (y < 1 && Level[y][x] == 0) {
                    Level[y][x] = floor(random(1,5.9999));
                }
            }
        }

        //Breaking matches
        for (var G = 0; G < Matches.length; G++) {
            for (var I = 0; I < Matches[G].length; I++) {
                Level[Matches[G][I][0]][Matches[G][I][1]] = 0;
                Score++;
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
            fill(255, 255, 255);

            //Draw Score
            text("Score: " + Score, Level[0].length*100-(Level[0].length-1)*50 + width/2, Level.length*50 + Level.length*50 + height/2);

            //Draw grid
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
        console.log(Tick);
    }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight-4);
}