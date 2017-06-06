/*global alert: false*/
//Fonctions
var canvas;
var scene;
var inGame;
var creaInvaders;
var creaProjectile;
var creaCircleInvaders;
var reloadShoot;
var reloadShootBoss;
var reset;
var resetBoss;
var timer;
var timerBoss;
var start;
var end;

//Variables Ship
var ship = new Image();
ship.src = "gfx/ship.png";
ship.width = 50;
ship.height = 50;
var xShip = 375;
var yShip = 900;
var lifeShip = 5;
var reload = true;
var autoFire = false;
var save;

//Variables Invaders
var invaders = new Image();
invaders.src = "gfx/invaders.png";
invaders.width = 40;
invaders.height = 40;
var invaders2 = new Image();
invaders2.src = "gfx/invaders2.png";
invaders2.width = 40;
invaders2.height = 40;
var objInvaders = [];
var xInvader, yInvader, life, march;
var objCircle = [];
var xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle;
var revx = false;
var who;
var ripost;
var pattern = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
			   10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
			   10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
			   10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var app = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
           10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
           10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
           10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Variables Boss
var bossImg = new Image();
bossImg.src = "gfx/bossImg.png";
bossImg.width = 160;
bossImg.height = 160;
var xBoss = 320;
var yBoss = 20;
var dead = false;
var lifeBoss = 50;
var reloadBoss = true;
var shotgunBoss = false;
var powerupBoss, whatPowerBoss;
var alreadyPowerBoss = false;

//Variables Projectile
var projectileInvImg = new Image();
projectileInvImg.src = "gfx/projectileInvaders.png";
projectileInvImg.width = 2;
projectileInvImg.heigth = 6;
var projectileShipImg = new Image();
projectileShipImg.src = "gfx/projectileShip.png";
projectileShipImg.width = 2;
projectileShipImg.heigth = 6;
var objProjectile = [];
var Projectiles;
var xProject, yProject, xPasProject, yPasProject, angle, touch, rev;

//Variables Powerups
var capsDef = new Image();
capsDef.src = "gfx/capsDef.png";
capsDef.width = 10;
capsDef.height = 5;
var capsDoubleFire = new Image();
capsDoubleFire.src = "gfx/capsDoubleFire.png";
capsDoubleFire.width = 10;
capsDoubleFire.height = 5;
var capsFreeMove = new Image();
capsFreeMove.src = "gfx/capsFreeMove.png";
capsFreeMove.width = 10;
capsFreeMove.height = 5;
var capsMachineGun = new Image();
capsMachineGun.src = "gfx/capsMachineGun.png";
capsMachineGun.width = 10;
capsMachineGun.height = 5;
var capsShotgun = new Image();
capsShotgun.src = "gfx/capsShotgun.png";
capsShotgun.width = 10;
capsShotgun.height = 5;
var powerup, whatPower = Math.floor(Math.random() * 100);
var xCaps = -100;
var yCaps = -100;
var drawPowerup = false;
var alreadyPower = false;
var machineGun = false;
var defense = false;
var doubleFire = false;
var freeMove = false;
var shotgun = false;
var shotgunShoot;

//Variables Timers
var seconde;
var compte;
var clock;
var secondeBoss;
var compteBoss;
var clockBoss;

//Variables structure du code
var j, m, w, z, c, f, b;
var youWin = 0;
var keyState = {};
var pause = false;
var moveAnim = false;
var startGame, endGame;
var play;

creaInvaders = function () {
	"use strict";
	canvas = document.getElementById('canvas');
	scene = canvas.getContext("2d");

	var k, l, n, Invader = function (xInvader, yInvader, march, life) {
		this.x = xInvader;
		this.y = yInvader;
		this.life = life;
		this.march = march;
	};
	for (k = 0; k < 7; k += 1) {
		for (l = 0; l < 13; l += 1) {
			xInvader = l * 50 + 80;
			yInvader = k * 50 + 10;
			life = true;
			march = false;
			objInvaders.push(new Invader(xInvader, yInvader, march, life));
		}
	}
};

creaCircleInvaders = function () {
	"use strict";
	var CircleInvader = function (xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle) {
		this.x = xCircle;
		this.y = yCircle;
		this.life = lifeCircle;
		this.angle = angleCircle;
		this.rev = revCircle;
		this.nbLife = nbLife;
		this.app = appCircle;
	};
	for (f = 0; f <= 2 * Math.PI; f += 0.2) {
		xCircle = Math.cos(f) * 700 + 400;
		yCircle = Math.sin(f) * 700 - 360;
		lifeCircle = true;
		angleCircle = f;
		revCircle = true;
		nbLife = 2;
		appCircle = 2;
		objCircle.push(new CircleInvader(xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle));
	}
	for (f = 0; f <= 2 * Math.PI; f += 0.2) {
		xCircle = Math.cos(f) * 750 + 400;
		yCircle = Math.sin(f) * 750 - 360;
		lifeCircle = true;
		angleCircle = f;
		revCircle = false;
		nbLife = 1;
		appCircle = 1;
		objCircle.push(new CircleInvader(xCircle, yCircle, lifeCircle, angleCircle, revCircle, appCircle));
	}
};

creaProjectile = function () {
	"use strict";
	Projectiles = function (xProject, yProject, xPasProject, yPasProject, angle, touch, rev) {
		this.x = xProject;
		this.y = yProject;
		this.xPas = xPasProject;
		this.yPas = yPasProject;
		this.angle = angle;
		this.touch = touch;
		this.rev = rev;
	};
};
window.addEventListener('keydown', function (e) {
	"use strict";
	keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
	"use strict";
	keyState[e.keyCode || e.which] = false;
}, true);

reloadShoot = function () {
	"use strict";
	reload = true;
};

reloadShootBoss = function () {
    "use strict";
    reloadBoss = true;
};

timer = function () {
	"use strict";
	if (clock) {
		if (!pause) {
			seconde -= 1;
		}
		compte = setTimeout(timer, 1000);
		if (seconde === 0) {
			powerup = Math.floor((Math.random() * 100) + 1);
			reset();
			clock = false;
		}
	}
};

timerBoss = function () {
	"use strict";
	if (clockBoss) {
		if (!pause) {
			secondeBoss -= 1;
		}
		compteBoss = setTimeout(timerBoss, 1000);
		if (secondeBoss === 0) {
			powerupBoss = Math.floor((Math.random() * 100) + 1);
			resetBoss();
			clockBoss = false;
		}
	}
};

resetBoss = function () {
	"use strict";
	if (shotgunBoss) {
		shotgunBoss = false;
	}
	alreadyPowerBoss = false;
	whatPowerBoss = Math.floor(Math.random() * 100);
};

reset = function () {
	"use strict";
	if (machineGun) {
		machineGun = false;
	}
	if (defense) {
		defense = false;
		ship.src = "gfx/ship.png";
	}
	if (doubleFire) {
		doubleFire = false;
	}
	if (freeMove) {
		freeMove = false;
		yShip = 725;
	}
	alreadyPower = false;
	whatPower = Math.floor(Math.random() * 100);
};

start = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
    if (!dead) {
        scene.drawImage(bossImg, xBoss, yBoss, bossImg.width, bossImg.height);
    }
	for (j = 0; j < objInvaders.length; j += 1) {
		if (objInvaders[j].life) {
			if (app[j] >= 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (app[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
	}
	for (f = 0; f < objCircle.length; f += 1) {
		if (objCircle[f].life) {
			if (!objCircle[f].rev) {
				scene.drawImage(invaders, objCircle[f].x, objCircle[f].y, invaders.width, invaders.height);
			} else {
				scene.drawImage(invaders2, objCircle[f].x, objCircle[f].y, invaders2.width, invaders2.height);
			}
		}
	}
	yShip -= 2;
	if (yShip <= 725) {
		inGame();
		return;
	}
	startGame = setTimeout(start, 10);
};

end = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	for (m = 0; m < objProjectile.length; m += 1) {
		if (!objProjectile[m].touch) {
			if (!objProjectile[m].rev) {
				scene.drawImage(projectileInvImg, objProjectile[m].x, objProjectile[m].y, projectileInvImg.width, projectileInvImg.height);
			} else {
				scene.drawImage(projectileShipImg, objProjectile[m].x, objProjectile[m].y, projectileShipImg.width, projectileShipImg.height);
			}
			if (!pause && moveAnim) {
				if (objProjectile[m].rev) {
					objProjectile[m].x -= objProjectile[m].xPas;
					objProjectile[m].y -= objProjectile[m].yPas;
				} else {
					objProjectile[m].x += objProjectile[m].xPas;
					objProjectile[m].y += objProjectile[m].yPas;
				}
			}
		}
	}
	for (f = 0; f < objCircle.length; f += 1) {
		if (objCircle[f].life) {
			if (!objCircle[f].rev) {
				scene.drawImage(invaders, objCircle[f].x, objCircle[f].y, invaders.width, invaders.height);
			} else {
				scene.drawImage(invaders2, objCircle[f].x, objCircle[f].y, invaders2.width, invaders2.height);
			}
		}
	}
	for (f = 0; f < objCircle.length; f += 1) {
		if (objCircle[f].x + 20 <= 400) {
			objCircle[f].x -= 5;
		} else if (objCircle[f].x + 20 > 400) {
			objCircle[f].x += 5;
		}
	}
	yShip -= 3;
	if (yShip <= -60) {
		location.replace("../level 9/level9.html");
	}
	endGame = setTimeout(end, 10);
};

inGame = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
    if (!dead) {
        scene.drawImage(bossImg, xBoss, yBoss, bossImg.width, bossImg.height);
    } else {
        end();
        clock = false;
    }
	youWin = 0;
	if (drawPowerup) {
		if (whatPower <= 20) {
			scene.drawImage(capsMachineGun, xCaps, yCaps, capsMachineGun.width, capsMachineGun.height);
		} else if (whatPower > 20 && whatPower <= 40) {
			scene.drawImage(capsDef, xCaps, yCaps, capsDef.width, capsDef.height);
		} else if (whatPower > 40 && whatPower <= 60) {
			scene.drawImage(capsDoubleFire, xCaps, yCaps, capsDoubleFire.width, capsDoubleFire.height);
		} else if (whatPower > 60 && whatPower <= 80) {
			scene.drawImage(capsFreeMove, xCaps, yCaps, capsFreeMove.width, capsFreeMove.height);
		} else if (whatPower > 80) {
			scene.drawImage(capsShotgun, xCaps, yCaps, capsShotgun.width, capsShotgun.height);
		}
		if (!pause) {
			yCaps += 3;
		}
	}
	for (f = 0; f < objCircle.length; f += 1) {
		if (objCircle[f].life) {
			if (!objCircle[f].rev) {
				scene.drawImage(invaders, objCircle[f].x, objCircle[f].y, invaders.width, invaders.height);
			} else {
				scene.drawImage(invaders2, objCircle[f].x, objCircle[f].y, invaders2.width, invaders2.height);
			}
		}
	}
	if (!pause) {
		for (f = 0; f < objCircle.length; f += 1) {
			if (objCircle[f].rev) {
				objCircle[f].angle += 0.005;
				objCircle[f].x = Math.cos(objCircle[f].angle) * 700 + 400;
				objCircle[f].y = Math.sin(objCircle[f].angle) * 700 - 360;
			} else {
				objCircle[f].angle -= 0.005;
				objCircle[f].x = Math.cos(objCircle[f].angle) * 750 + 400;
				objCircle[f].y = Math.sin(objCircle[f].angle) * 750 - 360;
			}
			ripost = Math.floor(Math.random() * 50);
			if (ripost === 1 && moveAnim) {
				angle = Math.PI / 2;
				xProject = objCircle[f].x + 20;
				yProject = objCircle[f].y + 40;
				xPasProject = Math.abs(Math.cos(angle) * 7.07);
				yPasProject = Math.abs(Math.sin(angle) * 7.07);
				touch = false;
				rev = false;
				if (objCircle[f].life && objCircle[f].x + 20 < 800 && objCircle[f].x + 20 > 0 && objCircle[f].y > 0) {
					objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
			}
		}
	}
	for (j = 0; j < objInvaders.length; j += 1) {
		if (objInvaders[j].life) {
			if (app[j] >= 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (app[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
		if (objInvaders[j].y + 40 > yShip + 10 && pattern[j] > 0) {
			location.reload();
		}
		if (800 - objInvaders[j].x - 40 < 10 && pattern[j] > 0) {
			revx = false;
		} else if (objInvaders[j].x < 10 && pattern[j] > 0) {
			revx = true;
		}
		if (!pause && !objInvaders[j].march) {
			if (revx) {
				objInvaders[j].x += 2;
			} else {
				objInvaders[j].x -= 2;
			}
		}
	}
	if (revx && !pause) {
		xBoss += 2;
	} else if (!revx && !pause) {
		xBoss -= 2;
	}
	if (xBoss + 150 > 800) {
		revx = false;
	} else if (xBoss - 20 < 0) {
		revx = true;
	}
	for (m = 0; m < objProjectile.length; m += 1) {
		if (!objProjectile[m].touch) {
			if (!objProjectile[m].rev) {
				scene.drawImage(projectileInvImg, objProjectile[m].x, objProjectile[m].y, projectileInvImg.width, projectileInvImg.height);
			} else {
				scene.drawImage(projectileShipImg, objProjectile[m].x, objProjectile[m].y, projectileShipImg.width, projectileShipImg.height);
			}
			if (!pause && moveAnim) {
				if (objProjectile[m].rev) {
					objProjectile[m].x -= objProjectile[m].xPas;
					objProjectile[m].y -= objProjectile[m].yPas;
				} else {
					objProjectile[m].x += objProjectile[m].xPas;
					objProjectile[m].y += objProjectile[m].yPas;
				}
			}
			if (objProjectile[m].y < -10 || objProjectile[m].y > 800) {
				objProjectile[m].touch = true;
			}
		}
	}
	if (keyState[70]) {
		if (!autoFire) {
			autoFire = true;
		} else {
			autoFire = false;
		}
		keyState[70] = false;
	}
	if (autoFire && reload && !pause && moveAnim && !machineGun && !doubleFire && !shotgun) {
		angle = Math.PI / 2;
		xProject = xShip + 25;
		yProject = yShip;
		xPasProject = Math.cos(angle) * 7.07;
		yPasProject = Math.sin(angle) * 7.07;
		touch = false;
		rev = true;
		objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
		reload = false;
		setTimeout(reloadShoot, 100);
	} else if (autoFire && reload && !pause && moveAnim && machineGun && !doubleFire && !shotgun) {
		angle = Math.random() * 2.35 + 0.30;
		xProject = xShip + 25;
		yProject = yShip;
		xPasProject = Math.cos(angle) * 7.07;
		yPasProject = Math.sin(angle) * 7.07;
		touch = false;
		rev = true;
		objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
		reload = false;
		setTimeout(reloadShoot, 50);
	} else if (autoFire && reload && !pause && moveAnim && !machineGun && doubleFire && !shotgun) {
		for (z = 0; z < 2; z += 1) {
			angle = Math.PI / 2;
			xProject = xShip + 9 + z * 32;
			yProject = yShip;
			xPasProject = Math.cos(angle) * 7.07;
			yPasProject = Math.sin(angle) * 7.07;
			touch = false;
			rev = true;
			objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
		}
		reload = false;
		setTimeout(reloadShoot, 100);
	} else if (autoFire && reload && !pause && moveAnim && !machineGun && !doubleFire && shotgun) {
		for (c = 0; c < 1.57; c += 0.1) {
			angle = Math.PI / 4 + c;
			xProject = xShip + 25;
			yProject = yShip;
			xPasProject = Math.cos(angle) * 7.07;
			yPasProject = Math.sin(angle) * 7.07;
			touch = false;
			rev = true;
			objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
		}
		shotgunShoot -= 1;
		if (shotgunShoot === 0) {
			shotgun = false;
			powerup = Math.floor(Math.random() * 100);
			whatPower = Math.floor(Math.random() * 100);
		}
		reload = false;
		setTimeout(reloadShoot, 500);
	}
	if (!pause && moveAnim) {
		ripost = Math.floor(Math.random() * 7);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 25);
			angle = Math.PI / 2;
			xProject = objInvaders[who].x + 20;
			yProject = objInvaders[who].y + 40;
			xPasProject = Math.abs(Math.cos(angle) * 7.07);
			yPasProject = Math.abs(Math.sin(angle) * 7.07);
			touch = false;
			rev = false;
			if (pattern[who] > 0) {
				objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
			}
		}
	}
	if (!pause && moveAnim && reloadBoss && !shotgunBoss) {
		for (b = 0; b < 5; b += 1) {
            if (b === 0) {
				angle = Math.PI / 2 + 0.2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 1) {
				angle = Math.PI / 2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 2) {
				angle = Math.PI / 2 - 0.2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
		}
		reloadBoss = false;
        setTimeout(reloadShootBoss, 600);
	}
    if (!pause && moveAnim && reloadBoss && shotgunBoss) {
        for (b = 0; b < 5; b += 1) {
            if (b === 0) {
				angle = Math.PI / 2 + 0.4;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 1) {
				angle = Math.PI / 2 + 0.2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 2) {
				angle = Math.PI / 2 - 0.2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 3) {
                angle = Math.PI / 2 - 0.4;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
            if (b === 4) {
                angle = Math.PI / 2;
				xProject = xBoss + 80;
				yProject = yBoss + 130;
				xPasProject = Math.cos(angle) * 7.07;
				yPasProject = Math.sin(angle) * 7.07;
				touch = false;
				rev = false;
				if (!dead) {
				    objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
				}
            }
        }
        reloadBoss = false;
        setTimeout(reloadShootBoss, 600);
    }
	if (keyState[39] && !pause) {
		xShip += 10;
	} else if (keyState[37] && !pause) {
		xShip -= 10;
	}
	if (keyState[38] && !pause && freeMove) {
		yShip -= 10;
	} else if (keyState[40] && !pause && freeMove) {
		yShip += 10;
	}
	if (xShip < 0) {
		xShip = 0;
	} else if (xShip > 750) {
		xShip = 750;
	}
	if (yShip < 0) {
		yShip = 0;
	} else if (yShip > 750) {
		yShip = 750;
	}
	if (lifeShip <= 0) {
		location.reload();
	}
	for (j = 0; j < objInvaders.length; j += 1) {
		for (m = 0; m < objProjectile.length; m += 1) {
			if (pattern[j] > 0 && !objProjectile[m].touch) {
				if (objProjectile[m].x + 2 > objInvaders[j].x && objProjectile[m].x < objInvaders[j].x + 40 && objProjectile[m].y < objInvaders[j].y + 40 && objProjectile[m].y + 10 > objInvaders[j].y + 40 && objProjectile[m].y - 10 < objInvaders[j].y + 40 && objProjectile[m].rev) {
					objProjectile[m].touch = true;
					pattern[j] -= 1;
					if (pattern[j] <= 0) {
						objInvaders[j].life = false;
						powerup = Math.floor(Math.random() * 100);
						if (powerup <= 20 && !drawPowerup && !alreadyPower) {
							xCaps = objInvaders[j].x + 15;
							yCaps = objInvaders[j].y + 40;
							drawPowerup = true;
						}
					}
				}
				if (objProjectile[m].x + 2 > xShip && objProjectile[m].x < xShip + 50 && objProjectile[m].y + 6 > yShip && objProjectile[m].y + 16 > yShip && objProjectile[m].y - 4 < yShip && !objProjectile[m].rev) {
					objProjectile[m].touch = true;
					if (!defense) {
						lifeShip -= 1;
					}
				}
                if (objProjectile[m].rev && objProjectile[m].x + 2 > xBoss + 20 && objProjectile[m].x < xBoss + 140 && objProjectile[m].y < yBoss + 130 && objProjectile[m].y + 10 > yBoss + 130 && objProjectile[m].y - 10 < yBoss + 130) {
                    lifeBoss -= 1;
                    objProjectile[m].touch = true;
                    if (lifeBoss <= 0) {
                        dead = true;
                    }
                }
			}
		}
	}
	for (f = 0; f < objCircle.length; f += 1) {
		for (m = 0; m < objProjectile.length; m += 1) {
			if (objCircle[f].life && !objProjectile[m].touch && objProjectile[m].x + 2 > objCircle[f].x && objProjectile[m].x < objCircle[f].x + 40 && objProjectile[m].y < objCircle[f].y + 40 && objProjectile[m].y + 10 > objCircle[f].y + 40 && objProjectile[m].y - 10 < objCircle[f].y + 40 && objProjectile[m].rev) {
				objProjectile[m].touch = true;
				objCircle[f].nbLife -= 1;
				if (objCircle[f].nbLife <= 0) {
					objCircle[f].life = false;
					if (powerup <= 20 && !drawPowerup && !alreadyPower) {
						xCaps = objInvaders[f].x + 15;
						yCaps = objInvaders[f].y + 40;
						drawPowerup = true;
					}
				}
			}
		}
	}
	if ((xCaps + 10 > xShip && xCaps < xShip + 50 && yCaps + 10 > yShip && yCaps + 15 > yShip && yCaps - 15 < yShip) ||
			((yCaps < yShip + 50 && yCaps + 5 > yShip && xCaps + 10 > xShip && xCaps + 20 > xShip && xCaps < xShip)) ||
			((yCaps < yShip + 50 && yCaps + 5 > yShip && xCaps < xShip + 50 && xCaps + 10 > xShip + 50 && xCaps - 10 < xShip + 50))) {
		xCaps = -100;
		yCaps = -100;
		drawPowerup = false;
		alreadyPower = true;
		if (whatPower <= 20) {
			machineGun = true;
			seconde = 5;
			clock = true;
			timer();
		} else if (whatPower > 20 && whatPower <= 40) {
			defense = true;
			ship.src = "gfx/invincibleShip.png";
			seconde = 10;
			clock = true;
			timer();
		} else if (whatPower > 40 && whatPower <= 60) {
			doubleFire = true;
			seconde = 10;
			clock = true;
			timer();
		} else if (whatPower > 60 && whatPower <= 80) {
			freeMove = true;
			seconde = 10;
			clock = true;
			timer();
		} else if (whatPower > 80) {
			shotgun = true;
			shotgunShoot = 5;
			seconde = 10;
			clock = true;
			timer();
		}
	}
	powerupBoss = Math.floor(Math.random() * 10000);
	if (powerupBoss === 1 && !alreadyPowerBoss) {
		whatPowerBoss = Math.floor(Math.random() * 100);
		if (whatPowerBoss <= 100) {
			shotgunBoss = true;
			secondeBoss = 5;
			clockBoss = true;
			timerBoss();
		}
		alreadyPowerBoss = true;
	}
	if (yCaps > 800) {
		powerup = Math.floor(Math.random() * 100);
		whatPower = Math.floor(Math.random() * 100);
		drawPowerup = false;
	}
	if (keyState[80]) {
		pause = true;
		moveAnim = false;
	}
	if (keyState[32]) {
		pause = false;
		moveAnim = true;
	}
	for (m = 0; m < objProjectile.length; m += 1) {
		if (objProjectile[m].touch) {
			save = objProjectile[objProjectile.length - 1];
			objProjectile[objProjectile.length - 1] = objProjectile[m];
			objProjectile[m] = save;
			objProjectile.pop();
		}
	}
	play = setTimeout(inGame, 15);
};

setTimeout(creaInvaders, 1000);
setTimeout(creaProjectile, 1001);
setTimeout(creaCircleInvaders, 1002);
setTimeout(start, 1003);
