var i,j,rows,cols,grid, pretty;

$( document ).ready(function() {
	rows = 9;
	cols = 9;
	vars = 5;
	grid = [];
	player = { x: 3, y: 3};
	direction = 0; // N - E - S - O
	cursor = { x: 0, y: 0};
	pretty = "";


	function initGrid(){
		for (i=0; i < rows; i++) {
			grid.push([]);
			for (j=0; j < cols; j++) {
				grid[i].push(0);
			}
		}
	}

	function popGrid(){
		for (i=0; i < rows; i++) {
			for (j=0; j < cols; j++) {
				grid[i][j] = Math.floor(Math.random()*vars)+1;
			}
		}
	}
	
	function showGrid(){
		pretty = "";
		for (i=0; i < rows; i++) {
			pretty += "\n";
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
		}
		console.log(pretty+"\n\n",'color:black;font-weight:bold;background:yellow;border-radius:2px;','');
	}

	function getHeight(){
		console.log("Player player => " + player.x + "," +player.y +" altura => " + grid[player.x][player.y]+"\n\n");
	}


	initGrid();
	//showGrid();

	popGrid();
	showGrid();
	
	getHeight();
	getDirections();

	function getNorth(player){
		var x,y; x = player.x-1; y = player.y;
		return grid[x][y];
	}
	function getSouth(player){
		var x,y; x = player.x+1; y = player.y;
		return grid[x][y];
	}
	function getEast(player){
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
		directions += getWest(player) +"\t%c"+grid[player.x][player.y]+"%c\t" + getEast(player) + " \n";
		directions += "\t" + getSouth(player);
		console.info("%c"+directions+"\n\n",'','color:black;font-weight:bold;background:yellow;border-radius:2px;','');
	}

	function moveUp(){
		if (player.x>0){ player.x--;}
		showGrid();
		getDirections();
	}
	function moveDown(){
		if (player.x <cols-1){ player.x ++;}
		//player[0]++;
		showGrid();
		getDirections();
	}
	function moveLeft(){
		if (player.x>0){ player.x--;}
		showGrid();
		getDirections();
	}
	function moveRight(){
		if (player.y<rows-1) {player.y++;}
		showGrid();
		getDirections();
	}

	function turnLeft(){	
		if (direction ==0) direction = 3; else direction --; 
		setCursor();
	}
	function turnRight(){	if (direction ==3) direction = 0; else direction ++; }
	function setCursor(){
		switch (direction){
			case 0 : 
				cursor.x=player.x-1;
				cursor.y=player.y;
				showGrid();
				//getDirections();
				break;
			case 1 : 
				cursor.x=player.x;
				cursor.y=player.y+1;
				showGrid();
				break;
			case 2 : 
				cursor.x=player.x+1;
				cursor.y=player.y;
				showGrid();
				break;
			case 3 : 
				cursor.x=player.x;
				cursor.y=player.y-1;
				showGrid();
				break;
		}
	}

	document.onkeypress = function(evt) {
	    evt = evt || window.event;
	    var charCode = evt.keyCode || evt.which;
	    var charStr = String.fromCharCode(charCode);
	    switch (charStr) {
	    	// case "w": moveUp(); break;
	    	// case "s": moveDown(); break;
	    	// case "a": moveLeft(); break;
	    	// case "d": moveRight(); break;

	    	case "w": step(); break;
	    	case "s": back(); break;
	    	case "a": turnLeft(); break;
	    	case "d": turnRight(); break;
	    	case "e": action(); break;
	    	default: break;
	    }
	};


});

