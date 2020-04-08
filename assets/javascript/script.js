'use strict'


let timer;

window.onload = function() {
	document.addEventListener('keydown', changeDirection1);
	document.addEventListener('keydown', changeDirection2);
	document.addEventListener('keydown', changeDirection3);
	spawnFruit();
	timer = setInterval(loop, gamespeed);
	setInterval(GMspeed, 500)
}
	
	// game let

	let
		canv = document.getElementById('game'),
		ctx = canv.getContext('2d'),
		background = new Image(),
		gs = false,
		fkp = false,
		gamespeed = 100,
		ah = 8,
		aw = 8,
		ax = 0,
		ay = 0,
		rx = 0,
		ry = 0,
		snakenumber = 3,
		isfruit = false,
		fruits = [],
		rocks = [],
		maxrocks = 0,
		maxfruits = 10,
		currentfruits = 0;

		background.src = "assets/images/net.jpg";

	// snake let

	let
		snake1,
		snake2,
		snake3,
		speed = 9,
		basespeed = 9,
		xv = 0,
		yv = 0,
		px = 10,
		py = 10,
		ph = 8,
		pw = 8,
		trail = [],
		tail = 2,
		tailSafeZone = 4,
		cooldown = false,
		score = 0;

		snake1 = {
			alive: true,
			speed: 9,
			basespeed: 9,
			xv: speed,
			yv: 0,
			px: randomNumber(30, 30),
			py: randomNumber(15, 15),
			ph: 8,
			pw: 8,
			trail: [],
			tail: 2,
			tailSafeZone: 8,
			cooldown: false,
			score: 0,
			color: 'lime',
		}

		snake2 = {
			alive: true,
			speed: 9,
			basespeed: 9,
			xv: speed,
			yv: 0,
			px: randomNumber(45, 45),
			py: randomNumber(30, 30),
			ph: 8,
			pw: 8,
			trail: [],
			tail: 2,
			tailSafeZone: 8,
			cooldown: false,
			score: 0,
			color: 'blue',
		}

		snake3 = {
			alive: true,
			speed: 9,
			basespeed: 9,
			xv: speed,
			yv: 0,
			px: randomNumber(10, 10),
			py: randomNumber(10, 10),
			ph: 8,
			pw: 8,
			trail: [],
			tail: 2,
			tailSafeZone: 8,
			cooldown: false,
			score: 0,
			color: 'red',
		}

		snake1.trail[0] = {
			x: this.px,
			y: this.py,
		}

		snake2.trail[0] = {
			x: this.px,
			y: this.py,
		}

		snake3.trail[0] = {
			x: this.px,
			y: this.py,
		}

		for(let i = 1; i <= snakenumber; i++)
		{
			eval('snake' + i).snakeMoving = snakeMoving;
			eval('snake' + i).snakeTeleportation = snakeTeleportation;
			eval('snake' + i).tailManaging = tailManaging;
			eval('snake' + i).eatEvent = eatEvent;
			eval('snake' + i).snakeDeath = snakeDeath;
			eval('snake' + i).showTail = showTail;
			eval('snake' + i).tail = 20;
		}

function GMspeed(){
	gamespeed--;
}

function game()
{
	spawnRock();
	showGame();
	showFruits();
	showObstacle();
}

function snake()
{
	for(let i = 1; i <= snakenumber; i++)
	{
		if(eval('snake' + i).alive)
		{
			eval('snake' + i).tailManaging();
			eval('snake' + i).showTail();
			eval('snake' + i).snakeDeath();
			eval('snake' + i).snakeMoving();
			eval('snake' + i).snakeTeleportation();
			eval('snake' + i).eatEvent();
			
		}

		if(!eval('snake' + i).alive)
		{
			eval('snake' + i).showTail();
		}
	}
}

function loop() {

	clearInterval(timer);
	timer = setInterval(loop, gamespeed);

	game();
	snake();

}

// environment builder

function showGame() 
{
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.drawImage(background, 0, 0);

	ctx.strokeStyle = 'red';
	ctx.lineWidth = 19;
	ctx.strokeRect(0, 0, canv.width, canv.height);
}

// fruits builder

function showFruits()
{
	for(let i = 0; i < maxfruits; i++)
	{
		
		ctx.fillStyle = 'orange';
		ctx.fillRect(fruits[i].ax, fruits[i].ay, aw, ah);
	
	}
}

// Obstacle builder

function showObstacle()
{
	for(let i = 0; i < maxrocks; i++)
	{
		
		ctx.fillStyle = 'grey';
		ctx.fillRect(rocks[i].rx, rocks[i].ry, aw, ah);
	
	}
}

// random cell

function randomNumber(min, max)
{
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return (Math.round(rand) * 10 - (Math.round(rand) - 1));
}

// obstacle spawner

function spawnRock() {
	for (let i = 0; i < maxrocks; i++)
	{
		rocks[i] = {
			rx: randomNumber(1, 58),
			ry: randomNumber(1, 58),
		}
	}
}

// fruit spawner

function spawnFruit() 
{
	outer:

	for(let i = currentfruits; i < maxfruits; i++)
	{
		ax = randomNumber(1, 58);
		ay = randomNumber(1, 58);

		for(let x = 1; x <= snakenumber; x++){
			for(let j = 0; j < eval('snake' + x).trail.length; j++)
			{
				if(
					(eval('snake' + x).trail[j].x != ax
					|| eval('snake' + x).trail[j].y != ay)
					&& (eval('snake' + x).px != ax
					|| eval('snake' + x).py != ay)
					)
				{
					fruits.push({ax: ax, ay: ay,});

					currentfruits++;

					continue outer;
				} else {
					continue outer;
				}
			}
		}
	}
}

	function setCooldown2()
	{
		snake2.cooldown = false;
	}

	function setCooldown1()
	{
		snake1.cooldown = false;
	}

	function setCooldown3()
	{
		snake3.cooldown = false;
	}

// change direction

function changeDirection1(evt) {
	if(snake1.alive && (evt.keyCode == 37 || evt.keyCode == 38 || evt.keyCode == 39 || evt.keyCode == 40)){
	if (!fkp && [37, 38, 39, 40].indexOf(evt.keyCode) > -1) {
		setTimeout(function() {gs = true;}, 1000);
		fkp = true;
	}

	if(snake1.cooldown) {return false;}
	
	if(evt.keyCode == 37 && ~(snake1.xv > 0) && (snake1.xv < speed) ) // left arrow
		{snake1.xv = -speed; snake1.yv = 0;}

	if(evt.keyCode == 38 && ~(snake1.yv > 0) && (snake1.yv < speed) ) // top arrow
		{snake1.xv = 0; snake1.yv = -speed;}

	if(evt.keyCode == 39 && ~(snake1.xv < 0) && (snake1.xv > -speed) ) // right arrow
		{snake1.xv = speed; snake1.yv = 0;}

	if(evt.keyCode == 40 && ~(snake1.yv < 0) && (snake1.yv > -speed) ) // bottom arrow
		{snake1.xv = 0; snake1.yv = speed;}

	snake1.cooldown = true;

	if(evt.keyCode == 37 || evt.keyCode == 38 || evt.keyCode == 39 || evt.keyCode == 40){
		setTimeout(setCooldown1, gamespeed);
	}

	}
}

function changeDirection2(evt) {
	if(snake2.alive && (evt.keyCode == 65 || evt.keyCode == 87 || evt.keyCode == 68 || evt.keyCode == 83)) {
	if (!fkp && [65, 68, 83, 87].indexOf(evt.keyCode) > -1) {
		setTimeout(function() {gs = true;}, 1000);
		fkp = true;
	}

	if(snake2.cooldown) {return false;}
	
	if(evt.keyCode == 65 && ~(snake2.xv > 0) && (snake2.xv < speed) ) // left arrow
		{snake2.xv = -speed; snake2.yv = 0;}

	if(evt.keyCode == 87 && ~(snake2.yv > 0) && (snake2.yv < speed) ) // top arrow
		{snake2.xv = 0; snake2.yv = -speed;}

	if(evt.keyCode == 68 && ~(snake2.xv < 0) && (snake2.xv > -speed) ) // right arrow
		{snake2.xv = speed; snake2.yv = 0;}

	if(evt.keyCode == 83 && ~(snake2.yv < 0) && (snake2.yv > -speed) ) // bottom arrow
		{snake2.xv = 0; snake2.yv = speed;}

	snake2.cooldown = true;
	
	if(evt.keyCode == 65 || evt.keyCode == 87 || evt.keyCode == 68 || evt.keyCode == 83){
		setTimeout(setCooldown2, gamespeed);
	}
	
	}
}

function changeDirection3(evt) {
	if(snake3.alive && (evt.keyCode == 72 || evt.keyCode == 85 || evt.keyCode == 75 || evt.keyCode == 74)) {
	if (!fkp && [72, 74, 75, 85].indexOf(evt.keyCode) > -1) {
		setTimeout(function() {gs = true;}, 1000);
		fkp = true;
	}

	if(snake3.cooldown) {return false;}
	
	if(evt.keyCode == 72 && ~(snake3.xv > 0) && (snake3.xv < speed) ) // left arrow
		{snake3.xv = -speed; snake3.yv = 0;}

	if(evt.keyCode == 85 && ~(snake3.yv > 0) && (snake3.yv < speed) ) // top arrow
		{snake3.xv = 0; snake3.yv = -speed;}

	if(evt.keyCode == 75 && ~(snake3.xv < 0) && (snake3.xv > -speed) ) // right arrow
		{snake3.xv = speed; snake3.yv = 0;}

	if(evt.keyCode == 74 && ~(snake3.yv < 0) && (snake3.yv > -speed) ) // bottom arrow
		{snake3.xv = 0; snake3.yv = speed;}

	snake3.cooldown = true;

	

	if(evt.keyCode == 72 || evt.keyCode == 85 || evt.keyCode == 75 || evt.keyCode == 74){
		setTimeout(setCooldown3, gamespeed);
	}
	}
}

// snake moving

function snakeMoving()
{
	this.px += this.xv;
	this.py += this.yv;
}

// snake Teleportation

function snakeTeleportation()
{
	if ((this.px) >= canv.width - 10) 
		{this.px = 10;}

	if ((this.px) <= 1)
		{this.px = canv.width - (2 * 9);}

	if ((this.py) <= 1)
		{this.py = canv.height - (2 * 9);}

	if ((this.py) >= canv.height - 9)
		{this.py = 10;}
}

function showTail()
{
	for(let i = 0; i < this.trail.length; i++)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.trail[i].x, this.trail[i].y, pw, ph)
	}
}

// tail managing

function tailManaging()
{

	this.trail.push({x: this.px, y: this.py,});

	if(this.trail.length > this.tail && this.alive)
	{
		this.trail.shift();
	}

	if(this.trail.length > this.tail && this.alive)
	{
		this.trail.shift();
	}
}

// eat Event

function eatEvent()
{
	for(let i = 0; i < maxfruits; i++){
		if(this.trail[this.trail.length - 1].x == fruits[i].ax && this.trail[this.trail.length - 1].y == fruits[i].ay && this.alive)
		{
			fruits.splice(i, 1,);
			currentfruits--;
			this.tail++;
			this.score++;
			spawnFruit();
			return;
		}
	}
}

function snakeDeath() 
{
	for(let i = this.trail.length - tailSafeZone; i >= 0; i--)
	{
		if(this.alive){
		if(	this.px < (this.trail[i].x + this.pw)
			&& this.px + this.pw > this.trail[i].x
			&& this.py < (this.trail[i].y + this.ph)
			&& this.py + this.ph > this.trail[i].y)
		{
			
			
			this.color = 'grey';
		

			this.xv = 0;
			this.yv = 0;

			this.alive = false;
		}
		}
	}

	for(let x = 1; x <= snakenumber; x++)
	{
		if(this != eval("snake" + x)){
			for(let i = 0; i < eval("snake" + x).trail.length; i++)
			{
				if((this.px + this.xv == eval("snake" + x).trail[i].x && this.py + this.yv == eval("snake" + x).trail[i].y)
					|| (this.px == eval("snake" + x).trail[i].x && this.py == eval("snake" + x).trail[i].y))
				{
				this.color = 'grey';



				this.xv = 0;
				this.yv = 0;

				this.alive = false;
				}
			}
		}
	}
}

//this.px == eval("snake" + x).trail[i].x && this.py == eval("snake" + x).trail[i].y