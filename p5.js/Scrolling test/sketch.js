var Respawn;

function setup () {
    var Canvas = createCanvas(windowWidth/20*13, windowHeight/10*9);
    Canvas.parent("Canvas");
    Respawn = getItem("SpawnPoint");
    if (!Respawn) {
        Respawn = 0;
        storeItem("SpawnPoint", Respawn);
    };
    console.log(Respawn);
}

function draw() {
    rectMode(CENTER);

    var Particles = [];
    var FlagParticles = [];
    var Level = [{
        X: 450,
        Y: 500,
        Width: 500,
        Height: 20,
        Type: 1
    }, {
        X: 450,
        Y: 465,
        Width: 30,
        Height: 50,
        Type: -1,
        Order: 0
    }, {
        X: 500,
        Y: 300,
        Type: 0,
        Text: "You're fat!",
        Size: 50,
        Align: CENTER
    }, {
        X: 500,
        Y: 325,
        Type: 0,
        Text: "Oh and also: Use WASD to move",
        Size: 10,
        Align: CENTER
    }, {
        X: 750,
        Y: 500,
        Width: 100,
        Height: 20,
        Type: 3
    }, {
        X: 210,
        Y: 260,
        Width: 20,
        Height: 500,
        Type: 1
    }, {
        X: 1000,
        Y: 400,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 1700,
        Y: 1950,
        Type: 0,
        Text: "Crouch",
        Size: 25,
        Align: CENTER
    }, {
        X: 2000,
        Y: 2020,
        Width: 1250,
        Height: 20,
        Type: 1
    }, {
        X: 2310,
        Y: 1900,
        Width: 400,
        Height: 180,
        Type: 1
    }, {
        X: 2850,
        Y: 2020,
        Width: 150,
        Height: 20,
        Type: 3
    }, {
        X: 2700,
        Y: 2020,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2850,
        Y: 1600,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2700,
        Y: 1180,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2550,
        Y: 760,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2400,
        Y: 340,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2400,
        Y: 130,
        Type: 0,
        Text: "Haha I bully you",
        Size: 25,
        Align: CENTER
    }, {
        X: 2400,
        Y: -120,
        Width: 150,
        Height: 20,
        Type: 2
    }, {
        X: 2335,
        Y: -340,
        Width: 20,
        Height: 420,
        Type: 1
    }, {
        X: 2400,
        Y: -540,
        Width: 150,
        Height: 20,
        Type: 1
    }, {
        X: 2160,
        Y: -531,
        Type: 0,
        Text: "LOOOOOOOOOOOOONG",
        Size: 25,
        Align: CENTER
    }, {
        X: 1700,
        Y: -540,
        Width: 600,
        Height: 20,
        Type: 1
    }, {
        X: 1500,
        Y: -500,
        Type: 0,
        Text: "Down and up!",
        Size: 25,
        Align: CENTER
    }, {
        X: 1000,
        Y: 0,
        Width: 200,
        Height: 20,
        Type: 2
    }, {
        X: 1750,
        Y: -575,
        Width: 30,
        Height: 50,
        Type: -1,
        Order: 1
    }, {
        X: 500,
        Y: -540,
        Width: 200,
        Height: 20,
        Type: 2
    }, {
        X: 750,
        Y: -1000,
        Width: 700,
        Height: 20,
        Type: 3
    }, {
        X: 850,
        Y: -800,
        Width: 500,
        Height: 20,
        Type: 1
    }, {
        X: 850,
        Y: -770,
        Type: 0,
        Text: "Use crouch to bounce lower, you probably already know that.",
        Size: 15,
        Align: CENTER
    }, {
        X: 850,
        Y: -750,
        Type: 0,
        Text: "Imagine falling and setting your spawn back to start.",
        Size: 15,
        Align: CENTER
    }, {
        X: 1150,
        Y: -800,
        Width: 100,
        Height: 20,
        Type: 2
    }, {
        X: 1050,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 1050,
        Y: -1150,
        Type: 0,
        Text: "Never",
        Size: 25,
        Align: CENTER
    }, {
        X: 650,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 650,
        Y: -1150,
        Type: 0,
        Text: "Gonna",
        Size: 25,
        Align: CENTER
    }, {
        X: 250,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 250,
        Y: -1150,
        Type: 0,
        Text: "Give",
        Size: 25,
        Align: CENTER
    }, {
        X: -150,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: -150,
        Y: -1150,
        Type: 0,
        Text: "You",
        Size: 25,
        Align: CENTER
    }, {
        X: -550,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 2
    }, {
        X: -550,
        Y: -1150,
        Type: 0,
        Text: "Up",
        Size: 25,
        Align: CENTER
    }, {
        X: -250,
        Y: -1750,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: -250,
        Y: -1700,
        Type: 0,
        Text: "Never",
        Size: 25,
        Align: CENTER
    }, {
        X: 150,
        Y: -1750,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 150,
        Y: -1700,
        Type: 0,
        Text: "Gonna",
        Size: 25,
        Align: CENTER
    }, {
        X: 550,
        Y: -1750,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 550,
        Y: -1700,
        Type: 0,
        Text: "Let",
        Size: 25,
        Align: CENTER
    }, {
        X: 950,
        Y: -1750,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 950,
        Y: -1700,
        Type: 0,
        Text: "You",
        Size: 25,
        Align: CENTER
    }, {
        X: 1350,
        Y: -1750,
        Width: 100,
        Height: 20,
        Type: 1
    }, {
        X: 1350,
        Y: -1700,
        Type: 0,
        Text: "Down",
        Size: 25,
        Align: CENTER
    }, {
        X: 2150,
        Y: -1200,
        Width: 500,
        Height: 20,
        Type: 1
    }, {
        X: 2000,
        Y: -1235,
        Width: 30,
        Height: 50,
        Type: -1,
        Order: 2
    }, {
        X: 2000,
        Y: -1150,
        Type: 0,
        Text: "Never",
        Size: 25,
        Align: CENTER
    }, {
        X: 2300,
        Y: -1500,
        Width: 400,
        Height: 20,
        Type: 3
    }, {
        X: 2150,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 2
    }, {
        X: 2150,
        Y: -1150,
        Type: 0,
        Text: "Gonna",
        Size: 25,
        Align: CENTER
    }, {
        X: 2300,
        Y: -1200,
        Width: 100,
        Height: 20,
        Type: 2
    }, {
        X: 2300,
        Y: -1150,
        Type: 0,
        Text: "Run",
        Size: 25,
        Align: CENTER
    }, {
        X: 2450,
        Y: -1150,
        Type: 0,
        Text: "Around",
        Size: 25,
        Align: CENTER
    }, {
        X: 2510,
        Y: -1200,
        Width: 20,
        Height: 620,
        Type: 3
    }, {
        X: 2400,
        Y: -900,
        Width: 200,
        Height: 20,
        Type: 1
    }];
    var Camera = {
        X: 0,
        Y: 0,
        RealX: 0,
        RealY: 0,
        ShakeX: 0,
        ShakeY: 0
    };
    var Player = {
        X: 450,
        Y: 250,
        X_Vel: 0,
        Y_Vel: 0,
        Mode: 1,
        Width: 20,
        Height: 30
    };
    var Debug = {
        Enter: false,
        Colliding: [],
        MaxMinType: [1,-1]
    };
    var DrawPlayer = function (X, Y) {
        rect(X, Y, Player.Width, Player.Height);
    };
    var DrawFlag = function (X,Y, Width, Height, R, G, B) {
        fill(R, G, B);
        rect(X - Width/3, Y, Width/3, Height);
        ellipse(X - Width/3, Y - Height/2, Width/3, Height/5);
        triangle(X - Width/6, Y - Height/2, X - Width/6, Y, X + Width/3*1, Y - Height/4);
    };
    var Dieded = function () {
        for (var i = 0; i < Level.length; i++) {
                if (Level[i].Type == -1 && Level[i].Order == Respawn) {
                    Player.X = Level[i].X;
                    Player.Y = Level[i].Y - 100;
                    i = Level.length;
                };
        };
        Player.X_Vel = 0;
        Player.Y_Vel = 0;
    };
    var Particle = function (Life, X, Y, X_Vel, Y_Vel, Size, R, G, B, Gravity, Collides) {
        Particles.push({
            Life: Life,
            X: X,
            Y: Y,
            X_Vel: X_Vel,
            Y_Vel: Y_Vel,
            Size: Size,
            R: R,
            G: G,
            B: B,
            Gravity: Gravity,
            Collides: Collides
        });
    };
    var FlagParticle = function (X, Y, Width, Height, R, G, B, Speed, Direction) {
        FlagParticles.push({
            X: X,
            Y: Y,
            Width: Width,
            Height: Height,
            R: R,
            G: G,
            B: B,
            Speed: Speed,
            Direction: Direction
        })
    };
    var TouchingLevel = {
        Touch: function (X, Y, Width, Height, Interaction) {
        for (var i = 0; i < Level.length; i++) {
            if (Level[i].Type > 0) {
                if (abs(X-Level[i].X) < Width/2 + Level[i].Width/2 && abs(Y-Level[i].Y) < Height/2 + Level[i].Height/2) {
                    return true;
                }
            }
        }
        return false;
        },
        Type: function (X, Y, Width, Height, Type) {
            for (var i = 0; i < Level.length; i++) {
                if (Level[i].Type == Type) {
                    if (abs(X-Level[i].X) < Width/2 + Level[i].Width/2 && abs(Y-Level[i].Y) < Height/2 + Level[i].Height/2) {
                        return true;
                    }
                }
            }
            return false;
        },
        Index: function (X, Y, Width, Height, Type) {
            for (var i = 0; i < Level.length; i++) {
                if (Level[i].Type == Type) {
                    if (abs(X-Level[i].X) < Width/2 + Level[i].Width/2 && abs(Y-Level[i].Y) < Height/2 + Level[i].Height/2) {
                        return i;
                    }
                }
            }
            return false;
        }
    };

    //Setting the player to the correct last checkpoint
    Dieded();
    Camera.X = Player.X;
    Camera.Y = Player.Y;
    
    //Finding the max and min Type value
    for (var i = 0; i < Level.length; i++) {
        if (Level[i].Type > Debug.MaxMinType[0]) {
            Debug.MaxMinType[0] = Level[i].Type;
        } else if (Level[i].Type < Debug.MaxMinType[1]) {
            Debug.MaxMinType[1] = Level[i].Type;
        };
    };

    draw = function() {
        background(25, 25, 25);
        noStroke();
        fill(200, 200, 200);

        //Particles
        for (var i = 0; i < Particles.length; i++) {
            if (Particles[i].Life > 0) {
                fill(Particles[i].R, Particles[i].G, Particles[i].B);
                ellipse(Camera.X*-1 + Particles[i].X, Camera.Y*-1 + Particles[i].Y, Particles[i].Size, Particles[i].Size);
                Particles[i].X_Vel = Particles[i].X_Vel*0.99;
                Particles[i].Y_Vel += Particles[i].Gravity;
                Particles[i].X += Particles[i].X_Vel;
                Particles[i].Y += Particles[i].Y_Vel;
                Particles[i].Life--;
            } else {
                Particles.splice(i, 1);
            };
        };

        //Level
        for (var i = 0; i < Level.length; i++) {
            if (Level[i].Type == 1) {
                fill(255, 255, 255);
            } else if (Level[i].Type == 2) {
                fill(156, 39, 176);
            } else if (Level[i].Type == 3) {
                fill(255, 100, 0);
            };

            if (Level[i].Type > 0) {
                rect(Camera.X*-1 + Level[i].X, Camera.Y*-1 + Level[i].Y, Level[i].Width, Level[i].Height);
            } else {
                if (Level[i].Type == 0) {
                    fill(255, 255, 255);
                    textSize(Level[i].Size);
                    textAlign(Level[i].Align);
                    text(Level[i].Text, Camera.X*-1 + Level[i].X, Camera.Y*-1 + Level[i].Y);
                } else if (Level[i].Type == -1) {
                    if (Level[i].Order == Respawn) {
                        DrawFlag(Camera.X*-1 + Level[i].X, Camera.Y*-1 + Level[i].Y, Level[i].Width, Level[i].Height, 0, 255, 100);
                    } else {DrawFlag(Camera.X*-1 + Level[i].X, Camera.Y*-1 + Level[i].Y, Level[i].Width, Level[i].Height, 100, 100, 100);};
                };
            };
        };

        //Player
        fill(255, 255, 255);
            //Falling of the map
        if (Player.Y > 5000) {
            Dieded();
        }
            //Crouching
        if (keyIsDown(83)) {
            Player.Mode = 2;
            Player.Height = 20;
        } else{
            if (Player.Mode == 2) {
                Player.Mode = 1;
                Player.Height = 30;
                Player.Y += -5;
                if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
                    Player.Mode = 2;
                    Player.Height = 20;
                    Player.Y += 5;
                } 
            }
        }
            //Make the player fall
        Player.Y_Vel += 1 + 0.5*(Player.Mode - 1);
        for (var i = 0; i < abs(Player.Y_Vel); i++) {
            Player.Y += abs(Player.Y_Vel)/Player.Y_Vel;
            if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
                i = abs(Player.Y_Vel);
            }
        }
            //Puts the player back up
        if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
            for (var i=0; i < abs(Player.Y_Vel); i++) {
                if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
                    Player.Y -= abs(Player.Y_Vel)/Player.Y_Vel; 
                }
            }

            var ChangedVel;

            //If touching Trampoline and if jump key pressed
            if (TouchingLevel.Type(Player.X, Player.Y + abs(Player.Y_Vel)/Player.Y_Vel, Player.Width, Player.Height, 2)) {
                if (Player.Y_Vel > 0) {
                    if (keyIsDown(87)) {
                        ChangedVel = -35;
                    } else {ChangedVel = -30;}
                    for (var x = 0; x < 20; x++) {
                        Particle(random(10, 20), Player.X, Player.Y + Player.Height/2, random(-1, 1)*random(10, 20), -10, 10, 156, 39, 176, 1, 1);
                    }
                } else {ChangedVel = 0;};
            } else if (keyIsDown(87) && Player.Y_Vel > 0){
                ChangedVel = -20;
                for (var i = 0; i < 5; i++) {
                    Particle(random(10, 40), Player.X, Player.Y + Player.Height/2, random(-3, 3), random(-12, -15), 10, 255, 255, 255, 1, 1);
                }
            } else {ChangedVel = 0;};
            //If touching Lava
            if (TouchingLevel.Type(Player.X, Player.Y + abs(Player.Y_Vel)/Player.Y_Vel, Player.Width, Player.Height, 3)) {
                for (var x = 0; x  < 10; x++) {
                    Particle(random(30, 40), Player.X, Player.Y + Player.Height/2, random(-10, 10), random(-10, -20), 10, 255, 100, 0, 1, 1);
                }
                Dieded();
            };

            Player.Y_Vel = ChangedVel;
        }
            //Horizontal movement
        Player.X_Vel = ((keyIsDown(65)*-1) + keyIsDown(68)) + (keyIsDown()*2+1)*Player.X_Vel*0.9;
        Player.X += Player.X_Vel;
        if (keyIsDown(65) || keyIsDown(68)) {
            if (random(0, 10) < 1) {
                Particle(10, Player.X, Player.Y+10, random(-5, 5), -5, 10, 255, 255, 255, 0.5, 1);
            };
        };
            //Wall collision
        if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
            for (var i = 0; i < ceil(abs(Player.X_Vel)); i++) {
                if (TouchingLevel.Touch(Player.X, Player.Y, Player.Width, Player.Height, 0)) {
                    Player.X -= abs(Player.X_Vel) / Player.X_Vel;
                }
            }

            var ChangedVel;
            
            if (TouchingLevel.Type(Player.X + abs(Player.X_Vel)/Player.X_Vel, Player.Y, Player.Width, Player.Height, 3)) {
                for (var x = 0; x  < 10; x++) {
                    Particle(random(30, 40), Player.X, Player.Y + Player.Height/2, abs(Player.X_Vel)/Player.X_Vel*random(-10, -15), random(-20, 0), 10, 255, 100, 0, 1, 1);
                }
                Dieded();
            }
            if (TouchingLevel.Type(Player.X + abs(Player.X_Vel)/Player.X_Vel, Player.Y, Player.Width, Player.Height, 2)) {
                ChangedVel = Player.X_Vel*-2/*lerp(Player.X_Vel, Player.X_Vel*2, 0.5)*-1*/;
            } else {ChangedVel = 0;}

            Player.X_Vel = ChangedVel
        }
            //Detect if Player hits Flag
        if (TouchingLevel.Type(Player.X, Player.Y, Player.Width, Player.Height, -1) &&  Level[TouchingLevel.Index(Player.X, Player.Y, Player.Width, Player.Height, -1)].Order != Respawn) {
            Respawn = Level[TouchingLevel.Index(Player.X, Player.Y, Player.Width, Player.Height, -1)].Order;
            storeItem("SpawnPoint", Respawn);
            for (var i = 0; i < random(5, 10); i++) {
                FlagParticle(Level[TouchingLevel.Index(Player.X, Player.Y, Player.Width, Player.Height, -1)].X, Level[TouchingLevel.Index(Player.X, Player.Y, Player.Width, Player.Height, -1)].Y, 15, 25, 0, 255, 100, random(10, 20), random(-180, 180));
            }
        }
        DrawPlayer(Player.X + -1*Camera.X, Player.Y + -1*Camera.Y);

        //Flag Particles
        for (var i = 0; i < FlagParticles.length; i++) {
            if (FlagParticles[i].Speed > 1) {
                DrawFlag(Camera.X*-1 + FlagParticles[i].X, Camera.Y*-1 + FlagParticles[i].Y, lerp(0, FlagParticles[i].Width, FlagParticles[i].Speed/5), lerp(0, FlagParticles[i].Height, FlagParticles[i].Speed/5), FlagParticles[i].R, FlagParticles[i].G, FlagParticles[i].B);

                //Velocity, credit to @griffpatch from Scratch for the formula
                FlagParticles[i].X = FlagParticles[i].X + FlagParticles[i].Speed * sin(FlagParticles[i].Direction);
                FlagParticles[i].Y = FlagParticles[i].Y + FlagParticles[i].Speed * cos(FlagParticles[i].Direction);
                FlagParticles[i].Speed = FlagParticles[i].Speed + (FlagParticles[i].Speed * -0.1);
            } else {FlagParticles.splice(i, 1);}

        };

        //Camera
        Camera.RealX += (Player.X-Camera.RealX)/3;
        Camera.RealY += (Player.Y-Camera.RealY)/3;
        Camera.X = Camera.RealX - width/2 + Camera.ShakeX;
        Camera.Y = Camera.RealY - height/2 + Camera.ShakeY;

        //Testing
        if (keyIsDown(69)) {
            Particle(random(10, 20), Player.X, Player.Y + Player.Height/2, random(-1, 1)*random(10, 20), random(-10, -20), 10, 156, 39, 176, 1, 1);
            Player.Y_Vel += -2;
        };

        keyPressed = function() {
            if (keyCode == 13) {
                if (Debug.Enter) {
                    Debug.Enter = false;
                } else {Debug.Enter = true;};
            };
        };

        if (Debug.Enter) {
            Debug.Colliding.splice(0, Debug.Colliding.length);
            for (var i = Debug.MaxMinType[1]; i < Debug.MaxMinType[0]; i++) {
                if (TouchingLevel.Index(Player.X, Player.Y, Player.Width, Player.Height, i)) {
                    Debug.Colliding.push(TouchingLevel.Index(Player.X, Player.Y, Player.Width+1, Player.Height+1, i));
                };
            };
            textSize(10);
            textAlign(LEFT);
            text("XY: " + Player.X + ", " + Player.Y, width/20, height/20);
            text("Velocity (XY): " + Player.X_Vel + ", " + Player.Y_Vel, width/20, height/20 + 10);
            text("Collider(s)' Index: " + join(Debug.Colliding, ", "), width/20, height/20 + 20);
        };
    }
}

function windowResized() {
  resizeCanvas(windowWidth/20*13, windowHeight/10*9);
}