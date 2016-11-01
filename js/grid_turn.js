var i,j,rows,cols,grid, pretty;

$( document ).ready(function() {
	// levels= {
	// 	level01 : {
	// 		rows : 7,
	// 		cols : 7,
	// 		vars : 4,
	// 		player : { x: 0, y:0, direction: 0},
	// 		cursor : { x: 0, y:0}
	// 	}
	// }
	rows = 4;
	cols = 4;
	vars = 4;
	grid = [];
	player = { x: Math.floor(Math.random()*(rows+cols)/2), y: Math.floor(Math.random()*(rows+cols)/2), health : 100};
	direction = 2; // N - E - S - O
	cursor = { x: 0, y: 0};
	cursor_old = { x: 0, y: 0};
	pretty = "";
	moves = rows+cols;
	time = (rows+cols)*5;

	this.onkeypress = function(evt) {
	    evt = evt || window.event;
	    var charCode = evt.keyCode || evt.which;
	    var charStr = String.fromCharCode(charCode);
	    switch (charStr) {
	    	case "w": cursorUp(); break;
	    	case "s": cursorDown(); break;
	    	case "e": step(); break;
	    	case "a": turnLeft(); break;
	    	case "d": turnRight(); break;
	    	default: break;
	    }
	    if (charCode=="32") { step(); }
	};

	function initGrid(){
		for (i=0; i < rows; i++) {
			grid.push([]);
			for (j=0; j < cols; j++) grid[i].push(0);
		}
	}

	function popGrid(){
		for (i=0; i < rows; i++) {
			for (j=0; j < cols; j++) {
				grid[i][j] = Math.floor(Math.random()*vars)+1;
			}
		}
		grid[Math.floor(Math.random()*rows)][Math.floor(Math.random()*cols)] = vars+1;
	}
	
	function getCursor(){ 		return grid[cursor.x][cursor.y]; }
	function getCursorOld(){ 	return grid[cursor_old.x][cursor_old.y]; }
	function getPlayer(){ 		return grid[player.x][player.y]; }
	function showGrid(){
		if (getPlayer()==6) {
			console.info("you have won!")
		} else if (time ==0){
			console.error("game over");
		} else {
			pretty = "";
			for (i=0; i < rows; i++) {
				pretty += "\n\n";
				for (j=0; j < cols; j++) {
					if(i == player.x && j == player.y) {
						pretty += " %c " + grid[i][j] + " %c" ;
					} else if(i == cursor.x && j == cursor.y) {
						pretty += " [" + grid[i][j] + "]" ;
					} 
					else{
						pretty += "  " + grid[i][j] + " " ;
					}
				}
				if (i==0) {pretty += "\tlevel \t\t->\t" + "01";}
				if (i==1) {pretty += "\tmoves left \t->\t" + moves;}
				if (i==2) {pretty += "\ttime left  \t->\t" + time;}
				if (i==3) {pretty += "\tDistancia \t->\t" + getDistance();}
				if (i==4) {pretty += "\tisValid  \t->\t" + isValid() ;}
				if (i==6) {pretty += "\tPlayer  \t->\t" + getPlayer() ;}
				if (i==7) {pretty += "\tCursor  \t->\t" + getCursor() ;}
				if (i==8) {pretty += "\tCursorOld  \t->\t" + getCursorOld() ;}
			}
			console.log(pretty+"\n\n",'color:black;font-weight:bold;background:yellow;border-radius:2px;','');
			time--;
		}
	}

	function getNorth(player) {
		var x,y; x = player.x-1; y = player.y;
		return grid[x][y];
	}
	function getSouth(player) {
		var x,y; x = player.x+1; y = player.y;
		return grid[x][y];
	}
	function getEast(player) {
		var x,y, ret; 
		x = player.x; y = player.y+1;
		if (player.y+1>cols-1) { 
			ret = "";
		} else{
			ret = grid[x][y];
		}
		return ret;
	}
	function getWest(player){
		var x,y; x = player.x; y = player.y-1;
		return grid[x][y];
	}
	function getDirections() {
		var directions = "";
		directions += "Direcciones: \n\n";
		directions += "\t" + getNorth(player) +"\n";
		directions += getWest(player) +"\t%c"+getPlayer()+"%c\t" + getEast(player) + " \n";
		directions += "\t" + getSouth(player);
		console.info("%c"+directions+"\n\n",'','color:black;font-weight:bold;background:yellow;border-radius:2px;','');
	}

	function step(){
		if(isValid()){
			player.x = cursor.x; 
			player.y = cursor.y; 
			moves--;
			setCursor(); 
			showGrid(); 
		};
	}
	function cursorUp() {
		switch (direction){
			case 0 : 
				cursor.x = player.x-2;	
				cursor_old.x = player.x-1;
				break;
			case 1 : 
				cursor.y = player.y+2;	
				cursor_old.y = player.y+1;
				break;
			case 2 : 
				cursor.x = player.x+2;	
				cursor_old.x = player.x+1;
				break;
			case 3 : 
				cursor.y = player.y-2;	
				cursor_old.y = player.y-1;
				break;
		}
		showGrid(); 
	}
	function cursorDown() {setCursor(); }
	function turnLeft(){	
		if (direction ==0) direction = 3; 
		else direction --; 
		setCursor(); 
		cursor_old.x = cursor.x;
		cursor_old.y = cursor.y;
	}

	function turnRight(){	
		if (direction ==3) direction = 0; 
		else direction ++; 
		setCursor(); 
		cursor_old.x = cursor.x;
		cursor_old.y = cursor.y;
	}

	function setCursor(){
		switch (direction){
			case 0 : cursor.x=player.x-1; 	cursor.y=player.y; 		showGrid(); break;
			case 1 : cursor.x=player.x; 	cursor.y=player.y+1; 	showGrid(); break;
			case 2 : cursor.x=player.x+1; 	cursor.y=player.y; 		showGrid(); break;
			case 3 : cursor.x=player.x; 	cursor.y=player.y-1; 	showGrid(); break;
		}
	}

	function getDistance() {
		d = 0;
		if(cursor.x - player.x ==1 || cursor.x - player.x ==-1)	{ d = 1; }
		if(cursor.x - player.x ==2 || cursor.x - player.x ==-2)	{ d = 2; }
		if(cursor.y - player.y ==1 || cursor.y - player.y ==-1)	{ d = 1; }
		if(cursor.y - player.y ==2 || cursor.y - player.y ==-2)	{ d = 2; }
		return d ;
	}

	function isValid() {
		v = false;
		a= getPlayer() - getCursor();
		if (getDistance() == 1) {
			if ( a == 1 || a == -1 || a == 0 || a == 2 || a == -2) 	{
				v=true;
			}
		}
		if (getDistance() == 2) {
			if (( getPlayer() > getCursorOld() && a== 0 ) || ( getPlayer() > getCursorOld() && a== 1 ) ) v=true; 
		}
		return v;
	}

	initGrid();
	popGrid();
	setCursor();
	setInterval(function(){ showGrid(); }, 1000);

});

