var i,j,rows,cols,grid, pretty;

$( document ).ready(function() {
	rows = 10;
	cols = 8;
	vars = 9;
	grid = [];
	player = [2,2];
	cursor = [player[0]-1,player[1]];
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
				if(i == player[0] && j == player[1]) {
					pretty += " %c " + grid[i][j] + " %c" ;
				} else if(i == cursor[0] && j == cursor[1]) {
					pretty += " [" + grid[i][j] + "]" ;
				} 
				else{
					pretty += "  " + grid[i][j] + " " ;
				}
			}
		}
		console.log(pretty+"\n\n",'color:black;font-weight:bold;background:yellow;border-radius:2px','');
	}

	function getHeight(){
		console.log("Player player => " + player[0] + "," +player[1] +" altura => " + grid[player[0]][player[1]]+"\n\n");
	}


	initGrid();
	//showGrid();

	popGrid();
	showGrid();
	
	getHeight();
	getDirections();

	function getNorth(player){
		var x,y; x = player[0]-1; y = player[1];
		return grid[x][y];
	}
	function getSouth(player){
		var x,y; x = player[0]+1; y = player[1];
		return grid[x][y];
	}
	function getEast(player){
		var x,y, ret; 
		x = player[0]; y = player[1]+1;
		if (player[1]+1>cols-1) { 
			ret = "";
		} else{
			ret = grid[x][y];
		}
		return ret;
	}
	function getWest(player){
		var x,y; x = player[0]; y = player[1]-1;
		return grid[x][y];
	}
	function getDirections() {
		var directions = "";
		directions += "Direcciones: \n\n";
		directions += "\t" + getNorth(player) +"\n";
		directions += getWest(player) +"\t%c"+grid[player[0]][player[1]]+"\t%c" + getEast(player) + " \n";
		directions += "\t" + getSouth(player);
		console.info("%c"+directions+"\n\n",'','color:red;font-weight:bold','');
	}

	function moveUp(){
		if (player[0]>0){ player[0]--;}
		showGrid();
		getDirections();
	}
	function moveDown(){
		if (player[0]<cols-1){ player[0]++;}
		//player[0]++;
		showGrid();
		getDirections();
	}
	function moveLeft(){
		if (player[1]>0){ player[1]--;}
		showGrid();
		getDirections();
	}
	function moveRight(){
		if (player[1]<rows-1) {player[1]++;}
		showGrid();
		getDirections();
	}

	document.onkeypress = function(evt) {
	    evt = evt || window.event;
	    var charCode = evt.keyCode || evt.which;
	    var charStr = String.fromCharCode(charCode);
	    switch (charStr) {
	    	case "w": moveUp(); break;
	    	case "s": moveDown(); break;
	    	case "a": moveLeft(); break;
	    	case "d": moveRight(); break;
	    	default: break;
	    }
	};


});

