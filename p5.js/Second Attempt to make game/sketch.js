function setup() {
  // put setup code here
  var Canvas = createCanvas(900, 600);
  Canvas.parent("Canvas");
}

function draw() {
  /*
  Yay, I'm now older and smorter. Let's do this
  This is my second attempt to make a game.

  Hello and welcome to *Insert creative and related game name here*!

  Lore: In this game, you will have to avoid siblings coated with paint and shoot them with your cheese collection. Don't worry, they don't actually die, they just sort of go back to spawning chambers where they wait to hop back in to action. That's why they keep on appearing and you also can restart, DUHHHHHUHUHUHUHUHUHUUHUHUHUH *cough* *cough*

  It also turns out that the walls of the room are replaced with cheese-only portals, this means that the cheese can fly forver if they don't hit enemies. Beat that Entropy, ha! Weird, it feels like the developer is actually to lazy to make anything realistic, hmm...

  This game is absolutely 100% child-friendly, no death, no bullets, no gore, no guns... Totally not any of these just recolored! Haha!

  I was younger than 13 at the tiem I build this (I am NOT telling your my secret age) so I didn't add any built- in highscore thing ince I wasn't able to comment or share my stuff. So forget about Highscores unless I suddendly become less lazy and add the feature after Khan Academy allowed me to share this project - Ignore that, that's a Khan Acdemy issue
  */

  //Variables, Arrays, and Objects
  var Enemy = [];
  var Bullet = [];
  var DeathParticles = [];
  var Shockwaves = [];
  var Player = {
      Health: 100,
      MaxHealth: 100,
      Ammo: 10,
      MaxAmmo: 10,
      Damage: 1,      
      X: 450,
      Y: 300
    };
  var StageStats = {
    StartTime: second(),
    Wave: 0,
    SpawnReady: true
  };
  var Shop = {
      X: 1000,
      Y: 300,
  };

  //Functions
  var DrawEnemy = function(X, Y, Type) {
      if (Type === "White") {
          fill(255, 255, 255);
          rect (X-10, Y-10, 20, 20);
      } else if (Type === "Yellow") {
          fill(255, 252, 66);
          rect (X-15, Y-15, 30, 30);
      } else if (Type === "Orange") {
          fill(255, 128, 0);
          rect (X-20, Y-20, 40, 40);
      } else if (Type === "Red") {
          fill(255, 0, 0);
          rect (X-25, Y-25, 50, 50);
      }
  };
  var MoveBullet = function(Entity, Direction) {
      if (Bullet[Entity].Direction === "Up") {
          if (Bullet[Entity].Y > -5) {
              Bullet[Entity].Y = Bullet[Entity].Y - 10;
          } else {Bullet[Entity].Y = 605;}
      } else if (Bullet[Entity].Direction === "Right") {
          if (Bullet[Entity].X < 905) {
              Bullet[Entity].X = Bullet[Entity].X + 10;
          } else {Bullet[Entity].X = -5;}
      } else if (Bullet[Entity].Direction === "Down") {
          if (Bullet[Entity].Y < 605) {
              Bullet[Entity].Y = Bullet[Entity].Y + 10;
          } else {Bullet[Entity].Y = -5;}
      } else if (Bullet[Entity].Direction === "Left") {
          if (Bullet[Entity].X > -5) {
              Bullet[Entity].X = Bullet[Entity].X - 10;
          } else {Bullet[Entity].X = 905;}
      }
  };
  var DieEffect = function(X, Y, Size, Type) {
      for (var i=0; i < Size*2; i++) {
          DeathParticles.push({
              X: X,
              Y: Y,
              Speed: Size*random(1, 3),
              Direction: ceil(random(-179,180)),
              Type: Type
          });
      }
  }; // The circles you see when something gets hurt or dies
  var Shockwave = function(X, Y, Power, Color) {
      Shockwaves.push({
          X: X,
          Y: Y,
          Power: Power,
          MaxPower: Power,
          Color: Color
      });
  }; //Growing circle

    //Game On!
    draw = function () {
        background(138, 255, 144);
        fill(255, 255, 255);

        //Player
        rect(mouseX-15, mouseY-15, 30, 30);

        //Bullet bussiness
        for (var i=0; i < Bullet.length; i++) {
            fill(230, 255, 0);
            if (Bullet[i].Direction === "Up") {
                triangle(Bullet[i].X-5, Bullet[i].Y+5, Bullet[i].X+5, Bullet[i].Y+5, Bullet[i].X, Bullet[i].Y-5);
            } else if (Bullet[i].Direction === "Right") {
                triangle(Bullet[i].X-5, Bullet[i].Y-5, Bullet[i].X-5, Bullet[i].Y+5, Bullet[i].X+5, Bullet[i].Y);
            } else if (Bullet[i].Direction === "Down") {
                triangle(Bullet[i].X-5, Bullet[i].Y-5, Bullet[i].X+5, Bullet[i].Y-5, Bullet[i].X, Bullet[i].Y + 5);
            } else if (Bullet[i].Direction === "Left") {
                triangle(Bullet[i].X+5, Bullet[i].Y-5, Bullet[i].X+5, Bullet[i].Y+5, Bullet[i].X-5, Bullet[i].Y);
            }

            fill(255, 255, 255);

            MoveBullet(i, Bullet[i].Direction);

            //Enemy Collision
            for (var x = 0; x<Enemy.length; x++) {
                if (Enemy[x].Type === "White" & abs(Bullet[i].X - Enemy[x].X) <  15 & abs(Bullet[i].Y - Enemy[x].Y) <  15) {
                    Bullet.splice(i,1);
                    Enemy[x].Health =- Player.Damage;
                    x = Enemy.length;
                } else if (Enemy[x].Type === "Yellow" & abs(Bullet[i].X - Enemy[x].X) <  20 & abs(Bullet[i].Y - Enemy[x].Y) <  20) {
                    DieEffect(Bullet[i].X, Bullet[i].Y, 3, Enemy[x].Type);
                    Shockwave(Bullet[i].X, Bullet[i].Y, 10, Enemy[x].Type);
                    Bullet.splice(i,1);
                    Enemy[x].Health = Enemy[x].Health - Player.Damage;
                    x = Enemy.length;
                } else if (Enemy[x].Type === "Orange" & abs(Bullet[i].X - Enemy[x].X) <  30 & abs(Bullet[i].Y - Enemy[x].Y) < 30) {
                    DieEffect(Bullet[i].X, Bullet[i].Y, 3, Enemy[x].Type);
                    Shockwave(Bullet[i].X, Bullet[i].Y, 10, Enemy[x].Type);
                    Bullet.splice(i,1);
                    Enemy[x].Health = Enemy[x].Health - Player.Damage;
                    x = Enemy.length;
                } else if (Enemy[x].Type === "Red" & abs(Bullet[i].X - Enemy[x].X) <  40 & abs(Bullet[i].Y - Enemy[x].Y) < 40) {
                    DieEffect(Bullet[i].X, Bullet[i].Y, 3, Enemy[x].Type);
                    Shockwave(Bullet[i].X, Bullet[i].Y, 10, Enemy[x].Type);
                    Bullet.splice(i,1);
                    Enemy[x].Health = Enemy[x].Health - Player.Damage;
                    x = Enemy.length;
                }
            }
        }


        //Enemy business
        for (var i=0; i < Enemy.length; i++) {
            //println(Enemy[i].Health);

            if (Enemy[i].Health > 0) {
                DrawEnemy(Enemy[i].X, Enemy[i].Y, Enemy[i].Type);

                fill(255, 255, 255);

                // Moving or colliding with player and dealing damage based on Type
                if (Enemy[i].Type === "White") {
                    if (abs(Enemy[i].X - mouseX) < 25 & abs(Enemy[i].Y - mouseY) < 25) {
                        Shockwave(Enemy[i].X, Enemy[i].Y, 8, Enemy[i].Type);
                        DieEffect(mouseX, mouseY);
                        Enemy.splice(i,1);
                        Player.Health = Player.Health - 10;
                    } else {
                        Enemy[i].X = (mouseX-Enemy[i].X)/15+Enemy[i].X;
                        Enemy[i].Y = (mouseY-Enemy[i].Y)/15+Enemy[i].Y;
                        for (var x=0; x < Enemy.length; x++) {
                            if (x != i) {
                                var BoolToInt = function (Input) {
                                    if (Input) {
                                        return 1;
                                    } else {return -1;}
                                } //To simplify collision math

                                if (abs(Enemy[x].X - Enemy[i].X) < 10) {
                                    Enemy[i].X += ((BoolToInt(Enemy[i].X > Enemy[x].X)*5 + Enemy[x].X) - (BoolToInt(Enemy[i].X < Enemy[x].X)*5 + Enemy[i].X))/2;

                                    Enemy[x].X -= ((BoolToInt(Enemy[i].X > Enemy[x].X)*5 + Enemy[x].X) - (BoolToInt(Enemy[i].X < Enemy[x].X)*5 + Enemy[i].X))/2;

                                    console.log((BoolToInt(Enemy[i].X > Enemy[x].X)*5 + Enemy[x].X) - (BoolToInt(Enemy[i].X < Enemy[x].X)*5 + Enemy[i].X));
                                }
                            }

                        }
                    }

                } else if (Enemy[i].Type === "Yellow") {
                    if (abs(Enemy[i].X - mouseX) < 30 & abs(Enemy[i].Y - mouseY) < 30) {
                        Shockwave(Enemy[i].X, Enemy[i].Y, 15, Enemy[i].Type);
                        Enemy.splice(i, 1);
                        Player.Health = Player.Health - 15;
                    } else {
                        Enemy[i].X = (mouseX-Enemy[i].X)/25+Enemy[i].X;
                        Enemy[i].Y = (mouseY-Enemy[i].Y)/25+Enemy[i].Y;
                    }
                } else if (Enemy[i].Type === "Orange") {
                    if (abs(Enemy[i].X - mouseX) < 35 & abs(Enemy[i].Y - mouseY) < 35) {
                        Shockwave(Enemy[i].X, Enemy[i].Y, 20, Enemy[i].Type);
                        Enemy.splice(i, 1);
                        Player.Health = Player.Health - 25;
                    } else {
                        Enemy[i].X = (mouseX-Enemy[i].X)/35+Enemy[i].X;
                        Enemy[i].Y = (mouseY-Enemy[i].Y)/35+Enemy[i].Y;
                    }
                } else if (Enemy[i].Type === "Red") {
                    if (abs(Enemy[i].X - mouseX) < 40 & abs(Enemy[i].Y - mouseY) < 40) {
                        Shockwave(Enemy[i].X, Enemy[i].Y, 25, Enemy[i].Type);
                        Enemy.splice(i, 1);
                        Player.Health = Player.Health - 45;
                    } else {
                        Enemy[i].X = (mouseX-Enemy[i].X)/50+Enemy[i].X;
                        Enemy[i].Y = (mouseY-Enemy[i].Y)/50+Enemy[i].Y;
                    }
                }
            } else {
                if (Enemy[i].Type === "White") {
                    DieEffect(Enemy[i].X, Enemy[i].Y, 3, Enemy[i].Type);
                    Shockwave(Enemy[i].X, Enemy[i].Y, 8, Enemy[i].Type);
                } else if (Enemy[i].Type === "Yellow") {
                    DieEffect(Enemy[i].X, Enemy[i].Y, 5, Enemy[i].Type);
                    Shockwave(Enemy[i].X, Enemy[i].Y, 15, Enemy[i].Type);
                } else if (Enemy[i].Type === "Orange") {
                    DieEffect(Enemy[i].X, Enemy[i].Y, 7, Enemy[i].Type);
                    Shockwave(Enemy[i].X, Enemy[i].Y, 20, Enemy[i].Type);
                } else if (Enemy[i].Type === "Red") {
                    DieEffect(Enemy[i].X, Enemy[i].Y, 10, Enemy[i].Type);
                    Shockwave(Enemy[i].X, Enemy[i].Y, 20, Enemy[i].Type);
                }

                Enemy.splice(i,1);
            }
        }

        //Death Particle business
        for (var i=0; i < DeathParticles.length; i++) {
            if (DeathParticles[i].Speed > 1) {

                //Color of gore based on Type
                if (DeathParticles[i].Type === "White") {
                    fill(255, 255, 255);
                } else if (DeathParticles[i].Type === "Yellow") {
                    fill(255, 238, 0);
                } else if (DeathParticles[i].Type === "Orange") {
                    fill(255, 149, 0);
                } else if (DeathParticles[i].Type === "Red") {
                    fill(255, 0, 0);
                }

                ellipse(DeathParticles[i].X, DeathParticles[i].Y, DeathParticles[i].Speed, DeathParticles[i].Speed);

                //Velocity
                DeathParticles[i].X = DeathParticles[i].X + DeathParticles[i].Speed * sin(DeathParticles[i].Direction);
                DeathParticles[i].Y = DeathParticles[i].Y + DeathParticles[i].Speed * cos(DeathParticles[i].Direction);
                DeathParticles[i].Speed = DeathParticles[i].Speed + (DeathParticles[i].Speed * -0.1);

                fill(255, 255, 255);
            } else {DeathParticles.splice(i, 1);}
        }

        //ShockWave business
        for (var i=0; i < Shockwaves.length; i++) {
            if (Shockwaves[i].Power > 1) {
                noFill();
                strokeWeight(Shockwaves[i].Power);

                //Color
                if (Shockwaves[i].Color === "White") {
                    stroke(255, 255, 255);
                } else if (Shockwaves[i].Color === "Yellow") {
                    stroke(209, 206, 0);
                } else if (Shockwaves[i].Color === "Orange") {
                    stroke(255, 128, 0);
                } else if (Shockwaves[i].Color === "Red") {
                    stroke(255, 0, 0);
                }

                //Draw
                ellipse(Shockwaves[i].X, Shockwaves[i].Y, (Shockwaves[i].MaxPower - abs(0-Shockwaves[i].Power))*5, (Shockwaves[i].MaxPower - abs(0-Shockwaves[i].Power))*5);

                //Decreas power (Size)
                Shockwaves[i].Power = Shockwaves[i].Power + (Shockwaves[i].Power * -0.2);

                strokeWeight(1);
                fill(255, 255, 255);
            } else {Shockwaves.splice(i, 1);}
        }

        //Health Bar
        stroke(50, 50, 50);
        strokeWeight(25);
        line(575, 575, 875, 575);
        stroke(150, 150, 150);
        strokeWeight(15);
        line(575, 575, 875, 575);
        if (Player.Health > 0) {
            stroke(0, 255, 0);
            line(575, 575, 300/Player.MaxHealth*Player.Health + 575, 575);
        } else {
            stroke(255, 0, 0);
            line(575, 575, 875, 575);
            Player.Health = 0;
        }
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(0, 0, 0);
        textAlign(CENTER);
        textSize(15);
        text("HP: " + Player.MaxHealth + "/" + Player.Health, 725, 580)
        textAlign(LEFT);
        fill(255, 255, 255);
        stroke(0, 0, 0);

        //Ammo bar
        if (Player.Ammo < 10) {
            Player.Ammo = Player.Ammo + 0.01;
        }
        stroke(50, 50, 50);
        strokeWeight(25);
        line(575, 545, 875, 545);
        stroke(150, 150, 150);
        strokeWeight(15);
        line(575, 545, 875, 545);
        if (round(Player.Ammo) > 0) {
            stroke(255, 166, 0);
            line(575, 545, 300/Player.MaxAmmo*round(Player.Ammo) + 575, 545);
        } else {
            stroke(150, 150, 150 );
            line(575, 545, 875, 545);
        }
        stroke(0, 0, 0);
        strokeWeight(1);
        fill(0, 0, 0);
        textAlign(CENTER);
        textSize(15);
        text("Ammo: " + Player.MaxAmmo + "/" + round(Player.Ammo), 725, 550)
        textAlign(LEFT);
        fill(255, 255, 255);
        stroke(0, 0, 0);

        //Spawn wave every 5 seconds
        var Time = second()%10+1;
        fill(0, 0, 0);
        textSize(50);
        textAlign(CENTER);
        text(Time, 450, 100);
        if (Time === 10) {
            if (StageStats.SpawnReady === true) {
                StageStats.Wave++;

                //Spawn enemy
                Shockwave(450, 0, 150, "White");
                for (var i=0; i < StageStats.Wave; i++) {

                    Enemy.push({
                        X: random(100, 800),
                        Y: 0,
                        Type: "",
                        Health: 1
                    });

                    var Random = ceil(random(0.01, 40));
                    if (Random < 20) {
                        Enemy[Enemy.length - 1].Type = "White";
                        Enemy[Enemy.length - 1].Health = 5;
                    } else if (Random < 30) {
                        if (i > 4) {
                            Enemy[Enemy.length - 1].Type = "Yellow";
                            Enemy[Enemy.length - 1].Health = 10;
                            i += 5;
                        } else {
                            Enemy[Enemy.length - 1].Type = "White";
                            Enemy[Enemy.length - 1].Health = 5;
                        }
                    } else if (Random < 37) {
                        if (i > 9) {
                            Enemy[Enemy.length - 1].Type = "Orange";
                            Enemy[Enemy.length - 1].Health = 20;
                            i += 10;
                        } else {
                            Enemy[Enemy.length - 1].Type = "White";
                            Enemy[Enemy.length - 1].Health = 5;
                        }
                    } else if (Random < 40) {
                        if (i > 20) {
                            Enemy[Enemy.length - 1].Type = "Red";
                            Enemy[Enemy.length - 1].Health = 40;
                            i += 20;
                        } else {
                            Enemy[Enemy.length - 1].Type = "White";
                            Enemy[Enemy.length - 1].Health = 5;
                        }
                    }
                }


                StageStats.SpawnReady = false;
            }
        } else {StageStats.SpawnReady = true;}
        text("Wave " + StageStats.Wave, 450, 50);
        textAlign(LEFT);
        fill(255, 255, 255);

        keyPressed = function() {
            //Enemy testing
            if (keyCode === 49) {
                Enemy.push({
                    X: 200,
                    Y: 200,
                    Type: "White",
                    Health: 5
                });
            } else if (keyCode === 50) {
                Enemy.push({
                    X: 200,
                    Y: 200,
                    Type: "Yellow",
                    Health: 10
                });
            } else if (keyCode === 51) {
                Enemy.push({
                    X: 200,
                    Y: 200,
                    Type: "Orange",
                    Health: 20
                });
            } else if (keyCode === 52) {
                Enemy.push({
                    X: 200,
                    Y: 200,
                    Type: "Red",
                    Health: 40
                });
            }

            //Shoot
            if (Player.Ammo >= 1) {
                fill(230, 255, 0);
                var X = mouseX;
                var Y = mouseY;
                Player.Ammo--;
                if (keyCode === 87) {
                    Bullet.push({
                        X: X,
                        Y: Y,
                        Direction: "Up"
                    });
                } else if (keyCode === 68) {
                    Bullet.push({
                        X: X,
                        Y: Y,
                        Direction: "Right"
                    });
                } else if (keyCode === 83) {
                    Bullet.push({
                        X: X,
                        Y: Y,
                        Direction: "Down"
                    });
                } else if (keyCode === 65) {
                    Bullet.push({
                        X: X,
                        Y: Y,
                        Direction: "Left"
                    });
                } else {Player.Ammo++;}
                fill(255, 255, 255);
            }

            //Shop
            if (keyCode === 81) {

            }

            //Testing
            if (keyCode === 69) {
                DieEffect(200, 200, 5, "Yellow");
                Shockwave(450, 0, 150, "White");
                Player.Ammo = 10;
            }
        };
    };

    }