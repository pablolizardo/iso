	var game = new Phaser.Game(640,360,Phaser.AUTO);
var linea;
var isoGroup, cursorPos, cursor;


var fps =70;
var animTime = 300;

var dx = 5;
var dy = 5;
var bdx = 21;
var bdy = 21;

var Level = {
	preload:function () {
		this.load.image('brick', 'assets/brick.png');
		this.load.image('pos', 'assets/pos.png');
		this.load.image('rain', 'assets/rain.png');
		this.game.load.atlasJSONHash('viajero', 'assets/viajero.png', 'assets/viajero.json');
		this.game.load.atlasJSONHash('ui', 'assets/ui.png', 'assets/ui.json');
		//this.game.load.atlasJSONHash('bricks', 'assets/bricks.png', 'assets/bricks.json');
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


		var emitter = game.add.emitter(0, 0, 100	);

			emitter.width = game.world.width*2;
			// emitter.angle = 30; // uncomment to set an angle for the rain.

			emitter.makeParticles('rain');
			emitter.fixedToCamera = true;

			emitter.minParticleScale = 0.1;
			emitter.maxParticleScale = 0.5;

			emitter.setYSpeed(100, 200);
			emitter.setXSpeed(-45, -35);

			emitter.minRotation = 0;
			emitter.maxRotation = 0;

			emitter.start(false, 1400, 5, 0);


		// var level_1 =[];
		// for (var i = 0; i < dx; i++) {
		// 	for (var j = 0; j < dy; j++) {
		// 		level_1[[i],[j]]=i;
		// 		//console.log(level_1[[i],[j]]);
		// 	}
		// }

        isoGroup = game.add.group();

		
		var ii = 0; 
		var jj = 0;

		var cube; 

		
		level_matrix = [[1,1,1,1,1],
						[1,1,1,0,1],
						[0,0,1,0,1],
						[1,1,0,0,1],
						[1,1,0,1,0]];
		//var cubito;
		//cubito = game.add.Cube(10, 10, 10, 20, 32, 32) ;

        for (var xx = bdx*dx; xx > 0; xx -= bdx) {
            for (var yy = bdy*dy; yy > 0; yy -= bdy) {
                cube = game.add.isoSprite(xx, yy,  -42, 'brick',0 , isoGroup);
                //cube = game.add.isoSprite(xx, yy,  4, 'bricks',0 , isoGroup);
                cube.anchor.set(0.5);
                cube.scale.set(0.3);
                game.debug.spriteBounds(cube);
                cube.alpha =Math.random()/10+.85;
                cube.id = "cubo_"+ ii.toString()+"x"+jj.toString();
                console.log(cube.id);
                if (level_matrix[ii][jj] <1) {
                	cube = game.add.isoSprite(xx, yy,  -21, 'brick',0 , isoGroup);
                	cube.anchor.set(0.5);
                	cube.scale.set(0.3);
                }
				game.iso.simpleSort(isoGroup);
                //game.iso.simpleSort(isoGroup);
            	jj++;
            }
        	ii++;
        	jj = 0;
        }

		//this.char= game.add.sprite(this.game.world.centerX,this.game.world.centerY+5, 'viajero');
		this.char= game.add.isoSprite(0,0,0, 'viajero', 0,isoGroup);
		this.char.anchor.set(0.5,.45);
		this.char.scale.set(0.5);
		this.char.customParams = {direction : 1};

        game.iso.topologicalSort(isoGroup);

		//game.physics.isoArcade.enable(this.char);
        //this.char.body.collideWorldBounds = true;

		this.pos= game.add.sprite(0,0, 'pos');
		this.pos.anchor.setTo(0.5,.89);
		this.pos.scale.set(0.2);
		

    	game.camera.follow(this.char);


		this.char.animations.add('turn_1_2',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);
		this.char.animations.add('turn_2_3',[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]);
		this.char.animations.add('turn_3_4',[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]);
		this.char.animations.add('turn_4_1',[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81]);

		this.char.animations.add('turn_2_1',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].reverse());
		this.char.animations.add('turn_3_2',[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].reverse());
		this.char.animations.add('turn_4_3',[41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61].reverse());
		this.char.animations.add('turn_1_4',[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81].reverse());


		this.char.animations.add('walk_1',[81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]);
		this.char.animations.add('walk_2',[101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,]);
		this.char.animations.add('walk_3',[121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,]);
		this.char.animations.add('walk_4',[141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,]);

		//left 
		this.btn_left = this.game.add.sprite(0,game.world.centerY,'ui',5);
		//this.btn_left.customParams = {direction :-1};
		this.btn_left.inputEnabled = true;
		this.btn_left.events.onInputDown.add(this.turnLeft, this );
    	left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    	left.onDown.add(this.turnLeft, this);

		this.btn_right = this.game.add.sprite(this.game.world.width,game.world.centerY,'ui',5);
		this.btn_right.scale.x = -1;
		//this.btn_right.customParams = {direction :1};
		this.btn_right.inputEnabled = true;
		this.btn_right.events.onInputDown.add(this.turnRight, this );
    	right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    	right.onDown.add(this.turnRight, this);

		this.btn_up = this.game.add.sprite(this.game.world.width-this.btn_left.width,0,'ui',7);
		//console.log("ancho" + this.btn_left.width);
		this.btn_up.inputEnabled = true;
		this.btn_up.events.onInputDown.add(this.moveChar, this);
		up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    	up.onDown.add(this.moveChar, this);

		this.btn_jump = this.game.add.sprite(0,0,'ui',1);
		
		var ui_items = game.add.group();
		ui_items.add(this.btn_left);
		ui_items.add(this.btn_right);
		ui_items.add(this.btn_up);
		ui_items.add(this.btn_jump);
		ui_items.fixedToCamera = true;
	     //linea = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, 360);

		game.camera.scale = .4;

	},
	update:function() {
		switch (this.char.customParams.direction) {
			case 1: 
				this.pos.x = this.char.x -19;
				this.pos.y = this.char.y -15;
			break;
			case 2: 
				this.pos.x = this.char.x +19;
				this.pos.y = this.char.y -15;
			break;
			case 3: 
				this.pos.x = this.char.x +19;
				this.pos.y = this.char.y -34;
			break;
			case 4: 
				this.pos.x = this.char.x -19;
				this.pos.y = this.char.y -34;
			break;
		}
		//game.debug.spriteBounds(this.char);
		//game.debug.spriteInfo(this.char, 32, 32);
		//game.debug.spriteBounds(isoGroup);

	},
	moveChar: function(v) {
		//console.log(this.char.customParams.direction + " isoX = "+this.char.isoX + " isoY = " + this.char.isoY);
		switch (this.char.customParams.direction){
			case 1: 
				this.game.add.tween(this.char).to( { isoY : this.char.isoY+=bdx}, 400, Phaser.Easing.Quadratic.InOut, true);
    			this.char.animations.play('walk_1', fps, false);
    			this.char.animations.currentAnim.onComplete.add(function () {	this.char.frame=1}, this);
				game.iso.topologicalSort(isoGroup);

				break;
			case 2: 
				game.add.tween(this.char).to( { isoX : this.char.isoX+=bdx}, animTime, "Linear", true);
    			this.char.animations.play('walk_2', fps, false);
    			this.char.animations.currentAnim.onComplete.add(function () {	this.char.frame=21}, this);
        game.iso.topologicalSort(isoGroup);
				        game.iso.topologicalSort(isoGroup);

				break;
			case 3: 
				game.add.tween(this.char).to( { isoY: this.char.isoY-=bdx}, animTime, "Linear", true);
    			this.char.animations.play('walk_3', fps, false);
    			this.char.animations.currentAnim.onComplete.add(function () {	this.char.frame=41}, this);
        game.iso.topologicalSort(isoGroup);
				        game.iso.topologicalSort(isoGroup);

				break;
			case 4: 
				game.add.tween(this.char).to( { isoX: this.char.isoX-=bdx}, animTime, "Linear", true);
    			this.char.animations.play('walk_4', fps, false);
    			this.char.animations.currentAnim.onComplete.add(function () {	this.char.frame=61}, this);
        game.iso.topologicalSort(isoGroup);
				        game.iso.topologicalSort(isoGroup);

				break;
		}
	},
	turnLeft: function(v) {
		switch (this.char.customParams.direction) {
			case 1 : this.char.animations.play('turn_1_2', fps, false); break;
			case 2 : this.char.animations.play('turn_2_3', fps, false); break;
			case 3 : this.char.animations.play('turn_3_4', fps, false); break;
			case 4 : this.char.animations.play('turn_4_1', fps, false); break;
		}
		this.char.customParams.direction++;
		if (this.char.customParams.direction==5) this.char.customParams.direction=1;
	},
	turnRight: function(v) {
		switch (this.char.customParams.direction) {
			case 1 : this.char.animations.play('turn_1_4', fps, false); break;
			case 2 : this.char.animations.play('turn_2_1', fps, false); break;
			case 3 : this.char.animations.play('turn_3_2', fps, false); break;
			case 4 : this.char.animations.play('turn_4_3', fps, false); break;
		}
		this.char.customParams.direction--;
		if (this.char.customParams.direction==0) this.char.customParams.direction=4;
	}
};

game.state.add('Level', Level);
game.state.start('Level');