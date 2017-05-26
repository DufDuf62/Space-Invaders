/*global alert: false*/
//Fonctions
var canvas;
var scene;
var inGame;
var creaInvaders;
var creaProjectile;
var reloadShoot;
var reset;
var timer;
var start;
var end;

//Variables Ship
var ship = new Image();
ship.src = "gfx/ship.png";
ship.width = 50;
ship.height = 50;
var xShip = 375;
var yShip = 900;
var lifeShip = 2;
var reload = true;

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
var xInvader, yInvader, life;
var revx = false;
var who;
var ripost;
var pattern = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var app = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

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
var capsImg = new Image();
capsImg.src = "gfx/capsImg.png";
capsImg.width = 10;
capsImg.height = 5;
var powerup, whatPower;
var xCaps, yCaps;
var drawPowerup = false;
var alreadyPower = false;
var machineGun = false;
var defense = false;
var doubleFire = false;
var freeMove = false;

//Variables Timer
var seconde;
var compte;
var clock;

//Variables structure du code
var j, m, w, z;
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

	var k, l, n, Invader = function (xInvader, yInvader, life) {
		this.x = xInvader;
		this.y = yInvader;
		this.life = life;
	};
	for (k = 0; k < 7; k += 1) {
		for (l = 0; l < 13; l += 1) {
			xInvader = l * 50 + 100;
			yInvader = k * 50 + 10;
			life = true;
			objInvaders.push(new Invader(xInvader, yInvader, life));
		}
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
	for (j = 0; j < objInvaders.length; j += 1) {
		if (objInvaders[j].life) {
			if (app[j] === 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (app[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
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
	yShip -= 3;
	if (yShip <= -60) {
		location.reload();
	}
	endGame = setTimeout(end, 10);
};

inGame = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	youWin = 0;
	if (drawPowerup) {
		scene.drawImage(capsImg, xCaps, yCaps, capsImg.width, capsImg.height);
		if (!pause) {
			yCaps += 3;
		}
	}
	for (j = 0; j < objInvaders.length; j += 1) {
		if (!objInvaders[j].life) {
			youWin += 1;
		}
		if (youWin === 91) {
			end();
			return;
		}
		if (objInvaders[j].life) {
			if (app[j] === 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (app[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
		if (800 - objInvaders[j].x - 40 < 10 && objInvaders[j].life) {
			for (w = 0; w < objInvaders.length - 13; w += 1) {
				if (!pause && moveAnim) {
					objInvaders[w].y += 5;
				}
			}
			revx = false;
		} else if (objInvaders[j].x < 10 && objInvaders[j].life) {
			for (w = 0; w < objInvaders.length - 13; w += 1) {
				if (!pause && moveAnim) {
					objInvaders[w].y += 5;
				}
			}
			revx = true;
		}
		if (j > 77 && !pause && moveAnim) {
			objInvaders[j].y += 0.75;
		}
		if (!pause && moveAnim && j <= 77) {
			if (revx) {
				objInvaders[j].x += 2;
			} else {
				objInvaders[j].x -= 2;
			}
		}
		if (objInvaders[j].y + 40 > yShip - 20 && objInvaders[j].life) {
			location.reload();
		}
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
		}
	}
	if (keyState[70] && reload && !pause && moveAnim && !machineGun && !doubleFire) {
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
	} else if (keyState[70] && reload && !pause && moveAnim && machineGun && !doubleFire) {
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
	} else if (keyState[70] && reload && !pause && moveAnim && !machineGun && doubleFire) {
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
	}
	if (!pause && moveAnim) {
		ripost = Math.floor(Math.random() * 10);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 77);
			angle = Math.PI / 2;
			xProject = objInvaders[who].x + 20;
			yProject = objInvaders[who].y + 40;
			xPasProject = Math.abs(Math.cos(angle) * 7.07);
			yPasProject = Math.abs(Math.sin(angle) * 7.07);
			touch = false;
			rev = false;
			if (objInvaders[who].life) {
				objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
			}
		}
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
			if (objInvaders[j].life && !objProjectile[m].touch) {
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
			}
		}
	}
	if ((xCaps + 10 > xShip && xCaps < xShip + 50 && yCaps + 10 > yShip && yCaps + 15 > yShip && yCaps - 15 < yShip) ||
			((yCaps < yShip + 50 && yCaps + 5 > yShip && xCaps + 10 > xShip && xCaps + 20 > xShip && xCaps < xShip)) ||
			((yCaps < yShip + 50 && yCaps + 5 > yShip && xCaps < xShip + 50 && xCaps + 10 > xShip + 50 && xCaps - 10 < xShip + 50))) {
		xCaps = 900;
		yCaps = 900;
		drawPowerup = false;
		alreadyPower = true;
		whatPower = Math.floor(Math.random() * 100);
		if (whatPower <= 25) {
			machineGun = true;
			seconde = 5;
			clock = true;
			timer();
		} else if (whatPower > 25 && whatPower <= 50) {
			defense = true;
			ship.src = "gfx/invincibleShip.png";
			seconde = 10;
			clock = true;
			timer();
		} else if (whatPower > 50 && whatPower <= 75) {
			doubleFire = true;
			seconde = 10;
			clock = true;
			timer();
		} else if (whatPower > 75) {
			freeMove = true;
			seconde = 10;
			clock = true;
			timer();
		}
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
	play = setTimeout(inGame, 10);
};

setTimeout(creaInvaders, 1000);
setTimeout(creaProjectile, 1001);
setTimeout(start, 1002);
