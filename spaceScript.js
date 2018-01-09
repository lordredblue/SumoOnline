//spaceScript.js

// initialize canvas
var canvas = document.getElementById("spaceCanvas");
var ctx = canvas.getContext("2d");
var gameEnd = false;
var gameStart = false;
var playClick = true;


//initialize images 
var sumoImg = new Image();
var sumos_y = 55;
var sumos_x = 0;
sumoImg.src = "https://i.imgur.com/LFFjwSH.jpg";

var blueWinsImg = new Image();
blueWinsImg.src = "https://i.imgur.com/mW9e3oy.jpg";

var redWinsImg = new Image();
redWinsImg.src = "https://i.imgur.com/M9tZ30a.jpg";

var tieImg = new Image();
tieImg.src = "https://i.imgur.com/hP8aJl2.jpg";

var readyin3Img = new Image();
readyin3Img.src = "https://i.imgur.com/nMmcpSP.jpg";

var readyin2Img = new Image();
readyin2Img.src = "https://i.imgur.com/C1XK5Cu.jpg";

var readyin1Img = new Image();
readyin1Img.src = "https://i.imgur.com/k1Z2Wjz.jpg";

var fightImg = new Image();
fightImg.src = "Fight.png";

var instructNotPressed = new Image();
instructNotPressed.src = "Instruction_UP.png";

var instructPressed = new Image();
instructPressed.src = "Instruction_P.png";


function instructionScreen()
{	
	var testCoords; // to be used for click detection on a canvas shape
	
	function checkCursorPositionOnClick(e)
	{ 
		function onCanvasClick(e) 
		{	
			//alert(getCursorPosition(e)); //use this to find coords of play button
		  	testCoords = getCursorPosition(e);
		  	if(playClick && testCoords[0] >= 300 && testCoords[0] <= 520 && testCoords[1] >=364 && testCoords[1] <=464) //play button coords
		  	{	
		  		//code goes here if click hits target
		  		
		  		setTimeout(function(){
		  			ctx.drawImage(instructPressed, 0,0, canvas.width, canvas.height);}, 0);
		  		playClick = false;
		  		setTimeout(function(){playGame();}, 500);

		  	};
		};
		 
		function getCursorPosition(e) 
		{
		  	var x;
		    var y;
		    if (e.pageX != undefined && e.pageY != undefined) {
				x = e.pageX;
				y = e.pageY;
		    }
		    else {
				x = e.clientX + document.body.scrollLeft +
		            document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
		            document.documentElement.scrollTop;
		    }
		  	x -= canvas.offsetLeft;
		    y -= canvas.offsetTop;
		    
		    return [x,y];
		};

		canvas.addEventListener("mouseup", onCanvasClick, false);
	};

	window.onload = function(){
		ctx.drawImage(instructNotPressed, 0,0, canvas.width, canvas.height);
		checkCursorPositionOnClick(canvas);	
	}
}

var requestAnimationFrame = window.requestAnimationFrame
var pos_x = 0;

function animateFight()
{
  
  pos_x += 25;
  if(pos_x-900 <= canvas.width){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
    ctx.drawImage(fightImg, pos_x - 900, canvas.height/2 - 100, 900, 600);
    requestAnimationFrame(animateFight);
}
  else{
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(sumoImg, 0,sumos_y, canvas.width, canvas.height);
    ctx.font = "70px Arial";
	ctx.fillStyle = "red";
	ctx.fillText("Red: " +  String(spaceCounter), 10, 70);
	ctx.fillStyle = "blue";
	ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
	gameStart = true;
  }
}


function loadInitialCanvas()
{  
		setTimeout(function(){
			ctx.drawImage(readyin3Img, 0,0, canvas.width, canvas.height);
		}, 0);
		setTimeout(function(){
			ctx.drawImage(readyin2Img, 0,0, canvas.width, canvas.height);
		}, 1000);
		setTimeout(function(){
			ctx.drawImage(readyin1Img, 0,0, canvas.width, canvas.height);
		}, 2000);
		setTimeout(function(){	
			animateFight();
		}, 3000);
		
};

function animateDuringGame()
{
	ctx.font = "70px Arial";
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(sumoImg, sumos_x, sumos_y, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillText("Red: " +   String(spaceCounter), 10, 70);
	ctx.fillStyle = "blue";
	ctx.fillText("Blue: " + String(enterCounter), 1100, 70);
}

//Number of keypresses tracker
var spaceCounter = 0; 
var enterCounter = 0;

function checkKeyPressed(key)
{ 	
	if(gameEnd || !gameStart){}

	else if(key.keyCode == "32"){
		spaceCounter += 1;
		sumos_x +=20
		animateDuringGame();
	}

	else if(key.keyCode == "13"){
		enterCounter += 1;
		sumos_x -= 20
		animateDuringGame();
	}

	changeBorderColor();
};

function changeBorderColor()
	{
		if(sumos_x < 0){
			canvas.style.border = "5px solid #004cff";
		};

		if(sumos_x > 0){
			canvas.style.border = "5px solid #ff2e00";
		};

		if(sumos_x == 0){
			canvas.style.border = "5px solid #a500ff";
		};
	};
	
//Spits out the result depending on who wins
function compareSpaceEnter()
{
	if(spaceCounter > enterCounter){
		ctx.drawImage(redWinsImg, 0, 75, canvas.width, canvas.height);
	}
	else if(spaceCounter < enterCounter){
		ctx.drawImage(blueWinsImg, 0, 75, canvas.width, canvas.height);
	}
	else{
		ctx.drawImage(tieImg, 0, 75, canvas.width, canvas.height);
	}
};

//Timer
function countDown(secs, elem)
{
	var element = document.getElementById(elem);
	if(secs <= 10){
		element.innerHTML = "Time remaining: " + secs + " seconds";
	};

	secs--;
	var timer = setTimeout('countDown('+secs+',"'+elem+'")', 1000);
	
	if(secs < -1){
		clearTimeout(timer);
		element.innerHTML = '<h3>Game Over!</h3>'
		compareSpaceEnter();
		gameEnd = true;
		//code for what happens after countdown ends goes here
	};
	
};

//plays the game
function playGame()
{	
	loadInitialCanvas();
	window.addEventListener("keyup", checkKeyPressed, false);
	countDown(14, "underCanvas"); //add x to desired time limit to allow for 123fight
};


instructionScreen(); //playGame is called

