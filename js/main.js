var game = new Phaser.Game(640,360,Phaser.AUTO);
var linea;
var isoGroup, cursorPos, cursor;

var ii = 0; 
var jj = 0;
var dx = 10;
var dy = 10;
var bdx = 21;
var bdy = 21;

var fps =60;
var animTime = 400;
var GameState = {
	preload:function () {
		console.log('preload');
		this.load.image('brick', 'assets/brick_1.png');
		this.game.load.atlasJSONHash('viajero', 'assets/viajero.png', 'assets/viajero.json');
		this.game.load.atlasJSONHash('ui', 'assets/ui.png', 'assets/ui.json');
		this.game.load.atlasJSONHash('bricks', 'assets/bricks.png', 'assets/bricks.json');
    	this.game.load.audio('bgmusic', ['assets/audio/bgmusic.ogg']);

    	this.centerX = this.game.world.centerX;
    	this.centerY = this.game.world.centerY;
    	this.w = this.game.world.width;
    	this.h = this.game.world.height;

	    game.plugins.add(new Phaser.Plugin.Isometric(game));
	    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
	    game.iso.anchor.setTo(0.5, 0);

	},
	create:function () {
		//game.world.setBounds(0, 0, 640, 360);
		music = this.game.add.audio('bgmusic');
    	music.play();

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
    	this.game.stage.backgroundColor = '#18283C';

		// var level = [1,1,1,1,2,-1,2,3];
		// 
		var level_1 =[];
		for (var i = 0; i < dx; i++) {
			for (var j = 0; j < dy; j++) {
				level_1[[i],[j]]=i;
				console.log(level_1[[i],[j]]);
			}
		}
		//var level_height =[[1,2,6,1,2], [1,3,6,3,1], [3,2,7,4,2], [4,1,4,1,5] ,[4,2,3,4,3]];
		//var level_matrix =[[1,1,0,0,1,1,1],[1,1,1,1,0], [1,0,1,1,1], [0,1,1,0,1], [1,0,1,1,1]];
        

        isoGroup = game.add.group();

		var cube; 
		
        for (var xx = bdx*dx; xx > 0; xx -= bdx) {
            for (var yy = bdy*dy; yy > 0; yy -= bdy) {
                cube = game.add.isoSprite(xx, yy, 0, 'brick', 0, isoGroup);
                cube.anchor.set(0.5);
                cube.scale.set(0.3);
                cube.alpha =Math.random()/3;
                // if (level_matrix[ii][jj] >0) {
                // 	//cube.destroy();
	               //  //game.add.tween(cube).to({ isoZ: 10 }, 100 * ((xx + yy) % 10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
                // }
                game.iso.simpleSort(isoGroup);
            	jj++;
            }
        	ii++;
        }


	


		viajero= game.add.sprite(this.game.world.centerX,this.game.world.centerY+5, 'viajero');
		viajero.anchor.setTo(0.5,.9);
		viajero.scale.set(0.5);
		viajero.customParams = {direction : 1};

    	game.camera.follow(viajero);


		viajero.animations.add('turn_1_2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
		viajero.animations.add('turn_2_3',[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]);
		viajero.animations.add('turn_3_4',[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]);
		viajero.animations.add('turn_4_1',[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81]);

		viajero.animations.add('turn_2_1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].reverse());
		viajero.animations.add('turn_3_2',[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].reverse());
		viajero.animations.add('turn_4_3',[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61].reverse());
		viajero.animations.add('turn_1_4',[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81].reverse());


		viajero.animations.add('walk_1',[81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]);
		viajero.animations.add('walk_2',[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,]);
		viajero.animations.add('walk_3',[121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,]);
		viajero.animations.add('walk_4',[141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,]);

		//left 
		this.arrow_left = this.game.add.sprite(0,game.world.centerY,'ui',5);
		this.arrow_left.customParams = {direction :-1};
		this.arrow_left.inputEnabled = true;
		this.arrow_left.events.onInputDown.add(this.turnChar,this );

		this.arrow_right = this.game.add.sprite(this.game.world.width,game.world.centerY,'ui',5);
		this.arrow_right.scale.x = -1;
		this.arrow_right.customParams = {direction :1};
		this.arrow_right.inputEnabled = true;
		this.arrow_right.events.onInputDown.add(this.turnChar,this );

		this.action_left = this.game.add.sprite(0,0,'ui',1);
		this.action_right = this.game.add.sprite(this.game.world.width-this.action_left.width,0,'ui',7);
		this.action_right.inputEnabled = true;
		this.action_right.events.onInputDown.add(this.moveChar,this);
		
		var ui_items = game.add.group();
		ui_items.add(this.arrow_left);
		ui_items.add(this.arrow_right);
		ui_items.add(this.action_left);
		ui_items.add(this.action_right);
		ui_items.fixedToCamera = true;
	     //linea = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, 360);

		game.camera.scale = .4;

	},
	update:function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.turnChar(this.action_left);
			
		}
		game.debug.spriteInfo(viajero, 10, 20);
		//game.debug.cameraInfo(game.camera, 10, 120);

	},
	moveChar: function(sprite,event ) {
		switch (viajero.customParams.direction){
			case 1: 
				var posx =  viajero.x - 19; 
				var posy = viajero.y + 9.5; 
				game.add.tween(viajero).to( { y: posy, x : posx}, animTime, "Linear", true);
    			viajero.animations.play('walk_1', fps, false);
    			viajero.animations.currentAnim.onComplete.add(function () {	viajero.frame=1}, this);
				break;
			case 2: 
				var posx =  viajero.x + 19; 
				var posy = viajero.y + 9.5; 
				game.add.tween(viajero).to( { y: posy, x : posx}, animTime, "Linear", true);
    			viajero.animations.play('walk_2', fps, false);
    			viajero.animations.currentAnim.onComplete.add(function () {	viajero.frame=21}, this);
				break;
			case 3: 
				var posx =  viajero.x + 19; 
				var posy = viajero.y - 9.5; 
				game.add.tween(viajero).to( { y: posy, x : posx}, animTime, "Linear", true);
    			viajero.animations.play('walk_3', fps, false);
    			viajero.animations.currentAnim.onComplete.add(function () {	viajero.frame=41}, this);
				break;
			case 4: 
				var posx =  viajero.x - 19; 
				var posy = viajero.y - 9.5; 
				game.add.tween(viajero).to( { y: posy, x : posx}, animTime, "Linear", true);
    			viajero.animations.play('walk_4', fps, false);
    			viajero.animations.currentAnim.onComplete.add(function () {	viajero.frame=61}, this);
				break;
		}
	},
	turnChar: function(sprite,event ) {
		console.log('mover personaje a la izquierda');
		console.log(sprite.customParams.direction);
		if (sprite.customParams.direction<0) {
			if (viajero.customParams.direction ==1) {
    			viajero.animations.play('turn_1_2', fps, false);
			} 
			if (viajero.customParams.direction == 2) {
    			viajero.animations.play('turn_2_3', fps, false);
			}
			if (viajero.customParams.direction == 3) {
    			viajero.animations.play('turn_3_4', fps, false);
			}
			if (viajero.customParams.direction == 4) {
    			viajero.animations.play('turn_4_1', fps, false);
			}
			viajero.customParams.direction++;
			if (viajero.customParams.direction==5) {
				viajero.customParams.direction=1;
			}
			console.log(viajero.customParams.direction);

		}else {
			//viajero.position.x -=10;
			//viajero.position.y +=5;
			if (viajero.customParams.direction ==1) {
    			viajero.animations.play('turn_1_4', 24, false);
			} 
			if (viajero.customParams.direction == 2) {
    			viajero.animations.play('turn_2_1', 24, false);
			}
			if (viajero.customParams.direction == 3) {
    			viajero.animations.play('turn_3_2', 24, false);
			}
			if (viajero.customParams.direction == 4) {
    			viajero.animations.play('turn_4_3', 24, false);
			}
			viajero.customParams.direction--;
			if (viajero.customParams.direction==0) {
				viajero.customParams.direction=4;
			}
			console.log(viajero.customParams.direction);
		};
	} ,
	animateChar: function(sprite,event ) {
		console.log('mover personaje a la izquierda');
		this.char.angle -=10;
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');