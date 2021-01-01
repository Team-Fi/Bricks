"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let bricks = [];
let keys = [];

class Brick {
	constructor (x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	}
}

class Ball {
	constructor (x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
		this.d = 0;
	}
}

class Player {
	constructor (x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw() {
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	left() {
		if (this.x > 0) this.x -= 5;
	}

	right() {
		if (this.x < 400) this.x += 5;
	}
}

function onKeyDown(e) {
	if (!e.repeat) {
		keys.push(e.code);
	}
}

function onKeyUp(e) {
	keys = keys.filter((value) => {
		return value !== e.code;
	});
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

function keyPressed() {
	const args = arguments;
	return Array.from(args).map(key => {
		return keys.includes(key);
	}).includes(true);
}

const player = new Player(200, 290, 100, 10, "red");

function draw() {
	ctx.clearRect(0, 0, 500, 300)

	if (keyPressed("ArrowLeft", "KeyA")) player.left();
	if (keyPressed("ArrowRight", "KeyD")) player.right();

	player.draw();

	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);