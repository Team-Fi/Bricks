"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let bricks = [];
let keys = [];
let lives = 3;

class Brick {
	constructor (x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
	}

	draw() {
		ctx.fillStyle = this.c;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

class Ball {
	constructor (x, y, r, c) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.c = c;
		this.d = "ru";
		this.initX = x;
		this.initY = y;
	}

	draw() {
		if (this.d == "ru") {
			this.x += 2;
			this.y -= 2;

			if (this.x >= 490) this.d = "lu";
			if (this.y <= 10) this.d = "rd";
			bricks.forEach((item, index, object) => {
				if (this.y >= item.y-this.r && this.y <= item.y+item.h+this.r && this.x >= item.x-this.r && this.x <= item.x+item.w+this.r) {
					this.d = "rd";
					object.splice(index, 1);
					if (!bricks.length) {
						alert("You Won! Hooray!");
						location.reload();
					}
				}
			});
		} else if (this.d == "lu") {
			this.x -= 2;
			this.y -= 2;

			if (this.x <= 10) this.d = "ru";
			if (this.y <= 10) this.d = "ld";
			bricks.forEach((item, index, object) => {
				if (this.y >= item.y-this.r && this.y <= item.y+item.h+this.r && this.x >= item.x-this.r && this.x <= item.x+item.w+this.r) {
					this.d = "ld";
					object.splice(index, 1);
					if (!bricks.length) {
						alert("You Won! Hooray!");
						location.reload();
					}
				}
			});
		} else if (this.d == "ld") {
			this.x -= 2;
			this.y += 2;

			if (this.x <= 10) this.d = "rd";
			if (this.y >= 290-player.h-this.r && this.x > player.x-this.r && this.x < player.x+player.w+this.r) this.d = "lu";
			bricks.forEach((item, index, object) => {
				if (this.y >= item.y-this.r && this.y <= item.y+item.h+this.r && this.x >= item.x-this.r && this.x <= item.x+item.w+this.r) {
					this.d = "lu";
					object.splice(index, 1);
					if (!bricks.length) {
						alert("You Won! Hooray!");
						location.reload();
					}
				}
			});
			if (this.y >= 290) {
				lives--;
				this.x = this.initX;
				this.y = this.initY;
				this.d = "ru";
				player.x = player.initX;
				player.y = player.initY;
				if (!lives) {
					alert("You Died!");
					location.reload();
				}
			}
		} else if (this.d == "rd") {
			this.x += 2;
			this.y += 2;

			if (this.x >= 490) this.d = "ld";
			if (this.y >= 290-player.h-this.r && this.x > player.x-this.r && this.x < player.x+player.w+this.r) this.d = "ru";
			bricks.forEach((item, index, object) => {
				if (this.y >= item.y-this.r && this.y <= item.y+item.h+this.r && this.x >= item.x-this.r && this.x <= item.x+item.w+this.r) {
					this.d = "ru";
					object.splice(index, 1);
					if (!bricks.length) {
						alert("You Won! Hooray!");
						location.reload();
					}
				}
			});
			if (this.y >= 290) {
				lives--;
				this.x = this.initX;
				this.y = this.initY;
				this.d = "ru";
				player.x = player.initX;
				player.y = player.initY;
				if (!lives) {
					alert("You Died!");
					location.reload();
				}
			}
		}

		ctx.beginPath();
		ctx.fillStyle = this.c;
		ctx.arc(this.x, this.y, this.r*2, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}
}

class Player {
	constructor (x, y, w, h, c) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.c = c;
		this.initX = x;
		this.initY = y;
	}

	draw() {
		ctx.fillStyle = this.c;
		ctx.beginPath();
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.fill();
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

const player = new Player(200, 290, 100, 10, "black");
const ball = new Ball(250, 280, 5, "black");
for (let i=0; i<5; i++) {
	for (let j=0; j<3; j++) {
		bricks.push(new Brick(i*85+45, j*20+50, 75, 10, "black"));
	}
}

function draw() {
	ctx.clearRect(0, 0, 500, 300)

	if (keyPressed("ArrowLeft", "KeyA")) player.left();
	if (keyPressed("ArrowRight", "KeyD")) player.right();

	player.draw();
	ball.draw();
	bricks.forEach(x => {
		x.draw();
	});

	ctx.fillStyle = "black";
	ctx.font = "32px sans-serif";
	ctx.fillText("Lives: "+lives, 10, 40);

	requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

document.querySelector(".loading").style.display = "none";