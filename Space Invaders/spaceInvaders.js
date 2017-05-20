/*global alert: false*/
var canvas;
var scene;
var inGame;
var creaInvaders;
var creaProjectile;
var reloadShoot;
var ship = new Image();
ship.src = "gfx/ship.png";
ship.width = 50;
ship.height = 50;
var xShip = 475;
var yShip = 725;
var invaders = new Image();
invaders.src = "gfx/invaders.png";
invaders.width = 40;
invaders.height = 40;
var projectile = new Image();
projectile.src = "gfx/projectile.png";
projectile.width = 5;
projectile.heigth = 10;
var objInvaders = [];
var objProjectile = [];
var Projectiles;
var xInvader, yInvader, life;
var xProject, yProject, touch, rev;
var j, m, w;
var revx = false;
var reload = true;
var youWin = 0;
var keyState = {};
var pause = true;
var ripost;
var who;
var lifeShip = 5;
creaInvaders = function () {
	"use strict";
	canvas = document.getElementById('canvas');
	scene = canvas.getContext("2d");

	var k, l, Invader = function (xInvader, yInvader, life) {
		this.x = xInvader;
		this.y = yInvader;
		this.life = life;
	};
	for (k = 0; k < 7; k += 1) {
		for (l = 0; l < 13; l += 1) {
			xInvader = l * 50 + 20;
			yInvader = k * 50 + 10;
			life = true;
			objInvaders.push(new Invader(xInvader, yInvader, life));
		}
	}
};

creaProjectile = function () {
	"use strict";
	Projectiles = function (xProject, yProject, touch, rev) {
		this.x = xProject;
		this.y = yProject;
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
inGame = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	youWin = 0;
	for (j = 0; j < objInvaders.length; j += 1) {
		if (!objInvaders[j].life) {
			youWin += 1;
		}
		if (youWin === 91) {
			alert("You Win");
		}
		if (objInvaders[j].life) {
			scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
		}
		if (800 - objInvaders[j].x - 40 < 10) {
			for (w = 0; w < objInvaders.length; w += 1) {
				if (!pause) {
					objInvaders[w].y += 5;
				}
				if (objInvaders[w].y > yShip - 20 && objInvaders[w].life) {
					location.reload();
				}
			}
			revx = false;
		} else if (objInvaders[j].x < 10) {
			for (w = 0; w < objInvaders.length; w += 1) {
				if (!pause) {
					objInvaders[w].y += 5;
				}
			}
			revx = true;
		}
		if (!pause) {
			if (revx) {
				objInvaders[j].x += 2;
			} else {
				objInvaders[j].x -= 2;
			}
		}
	}
	for (m = 0; m < objProjectile.length; m += 1) {
		if (!objProjectile[m].touch) {
			scene.drawImage(projectile, objProjectile[m].x, objProjectile[m].y, 5, 10);
			if (!pause) {
				if (objProjectile[m].rev) {
					objProjectile[m].y -= 5;
				} else {
					objProjectile[m].y += 5;
				}
			}
		}
	}
	if (keyState[70] && reload && !pause) {
		xProject = xShip + 25;
		yProject = yShip;
		touch = false;
		rev = true;
		objProjectile.push(new Projectiles(xProject, yProject, touch, rev));
		reload = false;
		setTimeout(reloadShoot, 100);
	}
	if (!pause) {
		ripost = Math.floor(Math.random() * 10);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 90);
			xProject = objInvaders[who].x + 20;
			yProject = objInvaders[who].y + 40;
			touch = false;
			rev = false;
			if (objInvaders[who].life) {
				objProjectile.push(new Projectiles(xProject, yProject, touch, rev));
			}
		}
	}
	if (keyState[39] && !pause) {
		xShip += 10;
	} else if (keyState[37] && !pause) {
		xShip -= 10;
	}
	if (xShip < 0) {
		xShip = 0;
	} else if (xShip > 750) {
		xShip = 750;
	}
	if (lifeShip <= 0) {
		location.reload();
	}
	for (j = 0; j < objInvaders.length; j += 1) {
		for (m = 0; m < objProjectile.length; m += 1) {
			if (objInvaders[j].life && !objProjectile[m].touch) {
				if (objProjectile[m].x + 5 > objInvaders[j].x && objProjectile[m].x < objInvaders[j].x + 40 && objProjectile[m].y < objInvaders[j].y + 40 && objProjectile[m].y + 10 > objInvaders[j].y + 40 && objProjectile[m].y - 10 < objInvaders[j].y + 40 && objProjectile[m].rev) {
					objProjectile[m].touch = true;
					objInvaders[j].life = false;
				}
				if (objProjectile[m].x + 5 > xShip && objProjectile[m].x < xShip + 50 && objProjectile[m].y + 10 > yShip && objProjectile[m].y + 20 > yShip && objProjectile[m].y < yShip && !objProjectile[m].rev) {
					objProjectile[m].touch = true;
					lifeShip -= 1;
				}
			}
		}
	}
	if (keyState[80]) {
		pause = true;
	}
	if (keyState[32]) {
		pause = false;
	}
	setTimeout(inGame, 10);
};

setTimeout(creaInvaders, 1000);
setTimeout(creaProjectile, 1001);
setTimeout(inGame, 1002);
