/*global alert: false*/
//Fonctions
var canvas;
var scene;
var inGamePhase1;
var inGamePhase2;
var inGamePhase3;
var creaInvaders;
var creaProjectile;
var creaCircleInvaders;
var reloadShoot;
var reloadShootCircle;
var reset;
var timer;
var startPhase1;
var startPhase2;
var startPhase3;
var endPhase1;
var endPhase2;
var endPhase3;
var creaFirstArc;
var creaSecondeArc;

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
var xInvader, yInvader, life;
var Invader;
var CircleInvader;
var objCircle = [];
var xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle;
var objCircle = [];
var reloadCircle = true;
var revx = false;
var who;
var ripost;
var firstCircle = false;
var secondeCircle = false;
var incrementAngle = 0;
var patternPhase1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

var appPhase1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

var patternPhase2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
					 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
					 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
					 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
					 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
					 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
					 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

var appPhase2 = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
				 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
				 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
				 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
				 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
				 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
				 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];

var patternPhase3 = [7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7,
					 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var appPhase3 = [7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7,
				 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

//Variables Timer
var seconde;
var compte;
var clock;

//Variables structure du code
var j, m, w, z, c, k, l, b, f;
var youWin = 0;
var keyState = {};
var pause = false;
var moveAnim = false;
var play;
var startGame, endGame;
var incrementPhase1 = 0;
var incrementPhase2 = 0;

creaInvaders = function () {
	"use strict";
	canvas = document.getElementById('canvas');
	scene = canvas.getContext("2d");

	Invader = function (xInvader, yInvader, life) {
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

creaCircleInvaders = function () {
	"use strict";
	CircleInvader = function (xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle) {
		this.x = xCircle;
		this.y = yCircle;
		this.life = lifeCircle;
		this.angle = angleCircle;
		this.rev = revCircle;
		this.nbLife = nbLife;
		this.app = appCircle;
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

reloadShootCircle = function () {
	"use strict";
	reloadCircle = true;
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

startPhase1 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	for (j = 0; j < objInvaders.length; j += 1) {
		if (objInvaders[j].life) {
			if (appPhase1[j] === 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (appPhase1[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
	}
	yShip -= 2;
	if (yShip <= 725) {
		inGamePhase1();
		return;
	}
	startGame = setTimeout(startPhase1, 10);
};

endPhase1 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	autoFire = false;
	drawPowerup = false;
	alreadyPower = false;
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
			if (objProjectile[m].y < -10 || objProjectile[m].y > 810) {
				objProjectile[m].touch = true;
			}
		}
	}
	incrementPhase1 += 1;
	if (incrementPhase1 === 200) {
		startPhase2();
		return;
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
	if (keyState[80]) {
		pause = true;
		moveAnim = false;
	}
	if (keyState[32]) {
		pause = false;
		moveAnim = true;
	}
	endGame = setTimeout(endPhase1, 10);
};

inGamePhase1 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
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
	for (j = 0; j < objInvaders.length; j += 1) {
		if (!objInvaders[j].life) {
			youWin += 1;
		}
		if (youWin === 91) {
			endPhase1();
			return;
		}
		if (objInvaders[j].life) {
			if (appPhase1[j] === 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (appPhase1[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
		if (800 - objInvaders[j].x - 40 < 10 && objInvaders[j].life) {
			for (w = 0; w < objInvaders.length; w += 1) {
				if (!pause && moveAnim) {
					objInvaders[w].y += 5;
				}
				if (objInvaders[w].y + 40 > yShip - 20 && objInvaders[w].life) {
					location.reload();
				}
			}
			revx = false;
		} else if (objInvaders[j].x < 10 && objInvaders[j].life) {
			for (w = 0; w < objInvaders.length; w += 1) {
				if (!pause && moveAnim) {
					objInvaders[w].y += 5;
				}
			}
			revx = true;
		}
		if (!pause && moveAnim) {
			if (revx) {
				objInvaders[j].x += 2;
			} else {
				objInvaders[j].x -= 2;
			}
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
		ripost = Math.floor(Math.random() * 10);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 90);
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
					patternPhase1[j] -= 1;
					if (patternPhase1[j] <= 0) {
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
	play = setTimeout(inGamePhase1, 15);
};

startPhase2 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	objInvaders = [];
	for (k = 0; k < 7; k += 1) {
		for (l = 0; l < 13; l += 1) {
			xInvader = l * 50 + 100;
			yInvader = k * 50 + 10 - 350;
			life = true;
			objInvaders.push(new Invader(xInvader, yInvader, life));
		}
	}
	inGamePhase2();
	return;
};

endPhase2 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	autoFire = false;
	drawPowerup = false;
	alreadyPower = false;
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
			if (objProjectile[m].y < -10 || objProjectile[m].y > 810) {
				objProjectile[m].touch = true;
			}
		}
	}
	incrementPhase2 += 1;
	if (incrementPhase2 === 200) {
		startPhase3();
		return;
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
	if (keyState[80]) {
		pause = true;
		moveAnim = false;
	}
	if (keyState[32]) {
		pause = false;
		moveAnim = true;
	}
	endGame = setTimeout(endPhase2, 10);
};

inGamePhase2 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
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
	for (j = 0; j < objInvaders.length; j += 1) {
		if (patternPhase2[j] <= 0) {
			youWin += 1;
		}
		if (youWin === 91) {
			endPhase2();
			return;
		}
		if (patternPhase2[j] > 0) {
			if (appPhase2[j] === 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (appPhase2[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
		if (!pause && moveAnim) {
			objInvaders[j].y += 1.1;
			if (objInvaders[j].y + 40 > yShip - 10 && patternPhase2[j] > 0) {
				location.reload();
			}
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
		ripost = Math.floor(Math.random() * 10);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 90);
			angle = Math.PI / 2;
			xProject = objInvaders[who].x + 20;
			yProject = objInvaders[who].y + 40;
			xPasProject = Math.abs(Math.cos(angle) * 7.07);
			yPasProject = Math.abs(Math.sin(angle) * 7.07);
			touch = false;
			rev = false;
			if (patternPhase2[who] > 0) {
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
			if (patternPhase2[j] > 0 && !objProjectile[m].touch) {
				if (objProjectile[m].x + 2 > objInvaders[j].x && objProjectile[m].x < objInvaders[j].x + 40 && objProjectile[m].y < objInvaders[j].y + 40 && objProjectile[m].y + 10 > objInvaders[j].y + 40 && objProjectile[m].y - 10 < objInvaders[j].y + 40 && objProjectile[m].rev) {
					objProjectile[m].touch = true;
					patternPhase2[j] -= 1;
					if (patternPhase2[j] <= 0) {
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
	play = setTimeout(inGamePhase2, 15);
};

startPhase3 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	objInvaders = [];
	for (k = 0; k < 7; k += 1) {
		for (l = 0; l < 13; l += 1) {
			xInvader = l * 50 + 100;
			yInvader = k * 50 + 10 - 200;
			life = true;
			objInvaders.push(new Invader(xInvader, yInvader, life));
		}
	}
	inGamePhase3();
	return;
};

endPhase3 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
	autoFire = false;
	drawPowerup = false;
	alreadyPower = false;
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
			if (objProjectile[m].y < -10 || objProjectile[m].y > 810) {
				objProjectile[m].touch = true;
			}
		}
	}
	yShip -= 3;
	if (yShip < -50) {
		location.replace();
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
	if (keyState[80]) {
		pause = true;
		moveAnim = false;
	}
	if (keyState[32]) {
		pause = false;
		moveAnim = true;
	}
	endGame = setTimeout(endPhase3, 10);
};

creaFirstArc = function () {
	"use strict";
	for (f = -0.4; f < Math.PI / 3 - 0.4; f += 0.2) {
		xCircle = Math.cos(f) * 700 + 400;
		yCircle = Math.sin(f) * 700 - 320;
		lifeCircle = true;
		angleCircle = f;
		revCircle = true;
		nbLife = 2;
		appCircle = 2;
		objCircle.push(new CircleInvader(xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle));
	}
};

creaSecondeArc = function () {
	"use strict";
	objCircle = [];
	incrementAngle = 0.011;
	for (f = Math.PI + 0.4; f > 2 * Math.PI / 3 + 0.4; f -= 0.2) {
		xCircle = Math.cos(f) * 700 + 400;
		yCircle = Math.sin(f) * 700 - 170;
		lifeCircle = true;
		angleCircle = f;
		revCircle = false;
		nbLife = 2;
		appCircle = 2;
		objCircle.push(new CircleInvader(xCircle, yCircle, lifeCircle, angleCircle, revCircle, nbLife, appCircle));
	}
};

inGamePhase3 = function () {
	"use strict";
	scene.clearRect(0, 0, 800, 800);
	scene.drawImage(ship, xShip, yShip, ship.width, ship.height);
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
			scene.drawImage(invaders, objCircle[f].x, objCircle[f].y, invaders.width, invaders.height);
			if (!pause) {
				if (objCircle[f].rev) {
					objCircle[f].angle -= 0.02;
					objCircle[f].x = Math.cos(objCircle[f].angle) * 700 + 400;
					objCircle[f].y = Math.sin(objCircle[f].angle) * 700 - 320;
				} else {
					objCircle[f].angle += 0.02;
					objCircle[f].x = Math.cos(objCircle[f].angle) * 700 + 400;
					objCircle[f].y = Math.sin(objCircle[f].angle) * 700 - 170;
				}
				if (incrementAngle >= 0.02) {
					objCircle[f].life = false;
				}
			}
		}
	}
	if (!pause) {
		incrementAngle += 0.00002;
	}
	for (j = 0; j < objInvaders.length; j += 1) {
		if (patternPhase3[j] <= 0) {
			youWin += 1;
		}
		if (youWin === 91) {
			endPhase3();
			clock = false;
			return;
		}
		if (patternPhase3[j] > 0) {
			if (appPhase3[j] >= 2) {
				scene.drawImage(invaders2, objInvaders[j].x, objInvaders[j].y, 40, 40);
			} else if (appPhase3[j] === 1) {
				scene.drawImage(invaders, objInvaders[j].x, objInvaders[j].y, 40, 40);
			}
		}
		if (!pause && moveAnim) {
			objInvaders[j].y += 0.5;
			if (objInvaders[j].y > 300 && !firstCircle) {
				creaFirstArc();
				firstCircle = true;
			}
			if (objInvaders[j].y > 450 && !secondeCircle) {
				creaSecondeArc();
				secondeCircle = true;
			}
			if (objInvaders[j].y + 40 > yShip - 10 && patternPhase3[j] > 0) {
				location.reload();
			}
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
	if (!pause && moveAnim && reloadCircle) {
		for (f = 0; f < objCircle.length; f += 1) {
			angle = Math.PI / 2;
			xProject = objCircle[f].x + 20;
			yProject = objCircle[f].y + 40;
			xPasProject = Math.cos(angle) * 7.07;
			yPasProject = Math.sin(angle) * 7.07;
			touch = false;
			rev = false;
			if (objCircle[f].life && objCircle[f].x + 20 > 0 && objCircle[f].x + 20 < 800 && objCircle[f].y > 0) {
				objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
			}
		}
		reloadCircle = false;
		setTimeout(reloadShootCircle, 175);
	}
	if (!pause && moveAnim) {
		ripost = Math.floor(Math.random() * 10);
		if (ripost === 1) {
			who = Math.floor(Math.random() * 30);
			for (b = 0; b < 3; b += 1) {
				if (b === 0) {
					angle = Math.PI / 2 + 0.2;
					xProject = objInvaders[who].x + 20;
					yProject = objInvaders[who].y + 40;
					xPasProject = Math.cos(angle) * 7.07;
					yPasProject = Math.sin(angle) * 7.07;
					touch = false;
					rev = false;
					if (patternPhase3[who] > 0) {
						objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
					}
				}
				if (b === 1) {
					angle = Math.PI / 2;
					xProject = objInvaders[who].x + 20;
					yProject = objInvaders[who].y + 40;
					xPasProject = Math.abs(Math.cos(angle) * 7.07);
					yPasProject = Math.abs(Math.sin(angle) * 7.07);
					touch = false;
					rev = false;
					if (patternPhase3[who] > 0) {
						objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
					}
				}
				if (b === 2) {
					angle = Math.PI / 2 - 0.2;
					xProject = objInvaders[who].x + 20;
					yProject = objInvaders[who].y + 40;
					xPasProject = Math.cos(angle) * 7.07;
					yPasProject = Math.sin(angle) * 7.07;
					touch = false;
					rev = false;
					if (patternPhase3[who] > 0) {
						objProjectile.push(new Projectiles(xProject, yProject, xPasProject, yPasProject, angle, touch, rev));
					}
				}
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
			if (patternPhase3[j] > 0 && !objProjectile[m].touch) {
				if (objProjectile[m].x + 2 > objInvaders[j].x && objProjectile[m].x < objInvaders[j].x + 40 && objProjectile[m].y < objInvaders[j].y + 40 && objProjectile[m].y + 10 > objInvaders[j].y + 40 && objProjectile[m].y - 10 < objInvaders[j].y + 40 && objProjectile[m].rev) {
					objProjectile[m].touch = true;
					patternPhase3[j] -= 1;
					if (patternPhase3[j] <= 0) {
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
	play = setTimeout(inGamePhase3, 15);
};

setTimeout(creaInvaders, 1000);
setTimeout(creaProjectile, 1001);
setTimeout(creaCircleInvaders, 1002);
setTimeout(startPhase1, 1003);
