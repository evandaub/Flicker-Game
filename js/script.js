//Javascript document

//variable for the canvas element
var canvas;
//variable for the context
var context;
//variable that creates "circle"
var circles;
//variable that draws "circle"
var draw;
//circles class
var Circle;
//draw circle on scree
var drawCircle;
//variable to store numbers assigned to each light
var light;
//holds random numbers in array
var generateFlash = new Array;
//stores the level player is currently on
var lev=1;
//counts light flashes
var c;
//holds the next set of random numbers to feed
var flashes = new Array;
//variable to make 4 lights flash
var num=0;
//variable to store the flashing pattern
var storePattern= new Array();
//variable to store the amount of delay
var delay=1000;
//variable to store the pattern of the user input
var user_pattern= new Array();
//variable to store the number of times the user has clicked
var click_num=0;
//variable to compare the user pattern to computer pattern
var compareComputer;
//variebl to compare the computer pattern to the user pattern
var compareUser;
//starting game timer
var counter=5;
//time user has to complete their turn
var user_counter=10;
//how many times the user has clicked
var clicked_num=0;
//check to see if the user is right and pass to another function
var check_user;


//go to init when page initializes
window.onload=init;

function init(){

	//create canvas and get context
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	//create array to store circles in
	circles = [];
	//define the specs for the circle
	draw = function (context, x, y, fillcolor, radius) {
	   context.beginPath();
	   context.arc(x, y, radius, 0, 2 * Math.PI, false);
	   context.fillStyle = fillcolor;
	   context.fill();
	   context.stroke();   
	};
	//determine how far the click is from the radius
	Circle = function(x, y, radius) {
	   this.left = x - radius;
	   this.top = y - radius;
	   this.right = x + radius;
	   this.bottom = y + radius;
	}; 
	//puts the drawn circle into the circles array
	drawCircle = function (context, x, y, fillcolor, radius, circles) {
	   draw(context, x, y, fillcolor, radius);
	   var circle = new Circle(x, y, radius);
	   circles.push(circle);  
	};
	//flashes the pattern
	flash = function(pattern){
		
		pattern=flashes.length
		for(var i=0; i<pattern; i++){
		delay+=1000
			if(num<pattern && flashes[i] === 1){

			blueFlash();
			console.log('blue ' + num)
			}else if(num<pattern && flashes[i] === 2){

			yellowFlash();
			console.log('yellow ' + num)
			}else if(num<pattern && flashes[i] === 3){


			greenFlash();
			console.log('green ' + num)
			}else if(num<pattern && flashes[i] === 4){

			redFlash();
			console.log('red ' + num)
			}else if(num=pattern){
			restore();
			console.log('cleared flashes')
			flashes.length=0;
			}
		}
		flashes.length=0;
	}
	//draws circles on screen
		drawCircle(context, canvas.width/4, canvas.height/4, " #82CAFA", 50, circles);
		drawCircle(context, (canvas.width/4)*3, canvas.height/4, "#FFDB58", 50, circles);
		drawCircle(context, canvas.width/4, (canvas.height/4)*3, "#827839", 50, circles);
		drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, " #C24641", 50, circles);

	//if the canvas is clicked, subtract the offset of the canvas from the click points

	document.getElementsByTagName("body")[0].onclick=
	function(e){
		clickCheck(e);
	}


	
	
	document.getElementById("submit").onclick=
	function(){
	//variable to give the user time between levels
	Timer=setInterval(function(){startGameMessage()}, delay);
	//Timer=setInterval(function(){startGameMessage();}, 1000);
	//start the game
	startGameMessage();
	restore();
	}
}//end init


function clickCheck(e){

   var clickedX = e.pageX-canvas.offsetLeft;
   var clickedY = e.pageY-canvas.offsetTop;
//determine if the click is inside the circle by comparing click point and radius. if click point is less than radius, point is inside circle.  if the click point is larger than radius, point is outside circle.
   for (var i = 0; i < circles.length; i++) {  
       if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
       	display=i+1;
       	if(display==1){
		
         console.log('clicked blue');
		 click_num+=1
		 console.log(clicked_num)
		 user_pattern.push('blue');
       	}else if(display==2){
		 
       	 console.log('clicked yellow');
		 user_pattern.push('yellow');
		 click_num+=1
		 console.log(clicked_num)
       	}else if(display==3){
		 
       	console.log('clicked green');
		click_num+=1
		console.log(clicked_num)
		user_pattern.push('green')
       	}else if(display==4){
		
       	 console.log('clicked red');
		 click_num+=1
		 user_pattern.push('red')
		 console.log(clicked_num)
       	}//end second if statement
       }//end if statement
   }//end for statement
	
   if(click_num==3){
	
	comparePatterns();
	}else{
	//do nothing
	}
};//end function


///////////////END INIT FUNCTIONS.  START CREATING ON SCREEN/////////

function startGameMessage(){
	console.log('here')		
		if(counter>0){
		console.log(counter)
			document.getElementById('gameStartMessage').innerHTML= 'Watch the flashing pattern to your left. Your game will begin in ' + counter;
			counter=counter-1;
		
		}else if(counter==0){
		console.log(counter)
			document.getElementById('gameStartMessage').innerHTML= 'Your game will begin now';
			counter=10;
			startGame();
			clearInterval(Timer)
		}//end else if
	
}//end startgamemessage function

function createCanvas(){
	console.log('create canvas')
	//variable for body
	var body = document.body;
	//remove current canvas from screen
	body.removeChild(document.getElementById("myCanvas"));
	//create new canvas
	body.appendChild(document.createElement('canvas'));
	//give canvas id of myCanvas
	document.getElementsByTagName("canvas")[0].id="myCanvas";
	//assign each color a number
	//create canvas and get context
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	canvas.style.width= "500px";
	canvas.style.height= "500px";
	//store those dimensions as property var's so we can do math on them
	canvas.width= 500;
	canvas.height= 500;
	canvas.style.border= "solid black 1px";
}

function startGame(){
	counter=5;
	document.getElementById('gameStartMessage').innerHTML= '';
	c=2+lev;
	for(i=0; i<c; i++){
		generateFlash[i] = Math.floor((Math.random()*4)+1);
	}
	levelCheck();

}


function levelCheck(){

c=2+lev;
console.log('populating flashes')
	for(var i=0; i<c; i++)
	//make for loop that generates 4 random numbers 1-4
	for(i=0; i<generateFlash.length; i++){	
		//make light var equal to a random number in the generateFlash array
		light=generateFlash[i]
		//push the random number into the flashes array
		flashes.push(light);
	}//END FOR LOOP
	flash(flashes.length)
lev=lev+1;
console.log('inside level check' + ' ' + lev)
}





function userTimer(){
	console.log(user_counter + '' + clicked_num)
	if(user_counter>0 && clicked_num!=3){
		document.getElementById('gameStartMessage').innerHTML= 'Time Remaining :' + user_counter;
		user_counter=user_counter-1;
	}else if(user_counter==0){
		document.getElementById('gameStartMessage').innerHTML= '';
		comparePatterns();
	}
	
}




//draw blue circle
function blueFlash(){
console.log('flashing blue')
	setTimeout(
		function(){
			createCanvas();
			drawCircle(context, canvas.width/4, canvas.height/4, "blue", 50, circles);
			drawCircle(context, (canvas.width/4)*3, canvas.height/4, "#FFDB58", 50, circles);
			drawCircle(context, canvas.width/4, (canvas.height/4)*3, "#827839", 50, circles);
			drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, " #C24641", 50, circles);
			restore();
		}, delay);
		
	storePattern.push("blue")
}//end function

//draw red flash
function redFlash(){
console.log('flashing red')
	setTimeout(
		function(){
			createCanvas();
			drawCircle(context, canvas.width/4, canvas.height/4, " #82CAFA", 50, circles);
			drawCircle(context, (canvas.width/4)*3, canvas.height/4, "#FFDB58", 50, circles);
			drawCircle(context, canvas.width/4, (canvas.height/4)*3, "#827839", 50, circles);
			drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, "red", 50, circles);
			restore();
		},delay);
		storePattern.push("red")
}//end function

//draw yellow flash
function yellowFlash(){
console.log('flashing yellow')
	setTimeout(
		function(){
			createCanvas();
			drawCircle(context, canvas.width/4, canvas.height/4, " #82CAFA", 50, circles);
			drawCircle(context, (canvas.width/4)*3, canvas.height/4, "yellow", 50, circles);
			drawCircle(context, canvas.width/4, (canvas.height/4)*3, "#827839", 50, circles);
			drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, " #C24641", 50, circles);
			restore();
		}, delay);
	storePattern.push("yellow")
}
function greenFlash(){
console.log('flashing green')
	setTimeout(
		function(){
			createCanvas();
			drawCircle(context, canvas.width/4, canvas.height/4, " #82CAFA", 50, circles);
			drawCircle(context, (canvas.width/4)*3, canvas.height/4, "#FFDB58", 50, circles);
			drawCircle(context, canvas.width/4, (canvas.height/4)*3, "green", 50, circles);
			drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, " #C24641", 50, circles);
			restore();
		}, delay);
	storePattern.push("green")	
	
}//end function

function restore(){
console.log('restoring')
	setTimeout(
	function(){
	createCanvas();
	drawCircle(context, canvas.width/4, canvas.height/4, " #82CAFA", 50, circles);
	drawCircle(context, (canvas.width/4)*3, canvas.height/4, "#FFDB58", 50, circles);
	drawCircle(context, canvas.width/4, (canvas.height/4)*3, "#827839", 50, circles);
	drawCircle(context, (canvas.width/4)*3, (canvas.height/4)*3, " #C24641", 50, circles);
	
	}, delay)
	num+=1;
	if(num==3){
	//stop and wait for user input
	setTimeout(function(){document.getElementById('gameStartMessage').innerHTML= 'Your turn will begin now';},1000);
	setTimeout(function(){document.getElementById('gameStartMessage').innerHTML= '';},5000);
	User_Timer = setInterval(userTimer, 1000);
	num=0;
	
	}
	
	
}//end function

//compare the pattern of computer and user
function comparePatterns(){
	for(i=0; i<storePattern.length; i++){
	compareComputer = storePattern[i];

	}
	for(i=0; i<user_pattern.length; i++){
	compareUser = user_pattern[i]; 

	}
	
	delay=1000;
	if(compareComputer === compareUser){
	check_user='correct';
	user_continue();
	}else{
	check_user='incorrect'
	user_continue();
	}//end if statement
countdown=5;

}	

function user_continue(){
if(check_user=='correct'){
	//clear the users timer
	clearInterval(User_Timer);
	//ask if they would like to continue
	document.getElementById('gameStartMessage').innerHTML='Great Job! Would you like to play again? <input type=\'submit\' value=\'yes\' id=\'yes\'> <input type=\'submit\' value=\'no\' id=\'no\'>';
		//if yes... 
		document.getElementById("yes").onclick=function(){
		//clear the buttons...
		setTimeout(function(){document.getElementById('gameStartMessage').innerHTML=''}, 1250)
			Timer=setInterval(function(){startGameMessage()}, delay);

		//and restart the game
		generateFlash.length=0;
			lev=1;
			c=1;
			flashes.length=0;;
			num=0;
			storePattern.length=0;
			delay=1000;
			counter=5;
			user_counter=10;
			clicked_num=0;
			startGameMessage();
		}//end onclick function
		
		//if no...
		document.getElementById("no").onclick=function(){
		//clear EVERYTHING
			generateFlash.length=0;
			lev=1;
			c;
			flashes.length=0;;
			num=0;
			storePattern.length=0;
			delay=1000;
			counter=5;
			user_counter=10;
			clicked_num=0;
		}
	}else if(check_user=='incorrect'){
		clearInterval(User_Timer);
		document.getElementById('gameStartMessage').innerHTML='Not quite! Would you like to continue? <input type=\'submit\' value=\'yes\' id=\'yes\'><input type=\'submit\' value=\'no\' id=\'no\'>';
			
		//if yes... 
		document.getElementById("yes").onclick=function(){
			//clear the buttons...
			setTimeout(function(){document.getElementById('gameStartMessage').innerHTML=''}, 1250)
				Timer=setInterval(function(){startGameMessage()}, delay);

			//and restart the game
			
		}//end onclick function
		
		//if no...
		document.getElementById("no").onclick=function(){
		//clear EVERYTHING
			generateFlash.length=0;
			lev=1;
			c;
			flashes.length=0;;
			num=0;
			storePattern.length=0;
			delay=1000;
			counter=5;
			user_counter=10;
			clicked_num=0;
			setTimeout(function(){document.getElementById('gameStartMessage').innerHTML=''}, 1500)
				

		}
	}
}


