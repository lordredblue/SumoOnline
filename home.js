var homeImg = new Image();
homeImg.src = "Homepage_UP.png";

var homePressOff = new Image();
homePressOff.src = "Homepage_OFF.png";

var homePressOn = new Image();
homePressOn.src = "Homepage_ON.png";

var canvas = document.getElementById("home");
var ctx = canvas.getContext("2d");

window.onload = function(){
	ctx.drawImage(homeImg, 0,0, canvas.width, canvas.height);
}

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

function onCanvasClick(e) 
		{	
			//alert(getCursorPosition(e)); //use this to find coords of play button
		  	testCoords = getCursorPosition(e);

		  	if(testCoords[0] >= 136 && testCoords[0] <= 368 && testCoords[1] >=371 && testCoords[1] <=473) //playonline button coords
		  	{	
		  		//code goes here if click hits target
		  		//ctx.clearRect(0,0,canvas.width, canvas.height);
		  		setTimeout(function(){
		  			ctx.drawImage(homePressOn, 0,0, canvas.width, canvas.height);}, 0);
		  		
		  		setTimeout(function(){
		  			window.location.href = "http://wiz18.gloopen.com:3000/index.html";
		  		}, 1000);
		  		//setTimeout(function(){playGame();}, 1000);

		  	};
		  	//play offline
		  	if(testCoords[0] >= 458 && testCoords[0] <= 680 && testCoords[1] >=375 && testCoords[1] <=471){
		  		
		  		//ctx.clearRect(0,0,canvas.width, canvas.height);
		  		setTimeout(function(){
		  			ctx.drawImage(homePressOff, 0, 0, canvas.width, canvas.height);}, 0);

		  		setTimeout(function(){
		  			window.location.href ="https://shastrihm.github.io/Sumo/";
		  		}, 1000);

		  	}

		};

canvas.addEventListener("mouseup", onCanvasClick, false);