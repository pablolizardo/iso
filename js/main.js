var game = new Phaser.Game(640,360,Phaser.AUTO);
var linea;

var GameState = {
	preload:function () {
		console.log('preload');
		// this.load.image('brick', 'assets/brick_1.png');
		// this.load.image('bg', 'assets/bg_cyan.png');
		// this.load.image('char', 'assets/char.png');
		// this.load.image('arrow', 'assets/btn_arrow.png');
		// this.load.image('btn_up', 'assets/btn_up.png');
		// this.load.image('btn_empty', 'assets/btn_empty.png');
		// this.game.load.atlasJSONHash('char_turn', 'assets/char_turn.png', 'assets/char_turn.json');
		// this.game.load.atlasJSONHash('char_walk', 'assets/char_walk.png', 'assets/char_walk.json');
		this.game.load.atlasJSONHash('viajero', 'assets/viajero.png', 'assets/viajero.json');
		this.game.load.atlasJSONHash('ui', 'assets/ui.png', 'assets/ui.json');
    	this.game.load.audio('bgmusic', ['assets/audio/bgmusic.ogg']);
	},
	create:function () {
		game.world.setBounds(0, 0, 640, 360);
		music = this.game.add.audio('bgmusic');
    	//music.play();

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
    	this.game.stage.backgroundColor = '#18283C';

		// var level = [1,1,1,1,2,-1,2,3];
		var level_1 =[[1,2,6,1,2], [1,3,6,3,1], [3,2,7,4,2], [4,1,4,1,5] ,[4,2,3,4,3]];
		// for (var i = level.length - 1; i >= 0; i--) {
		// 	var distanceX = 60;
		// 	var distanceY = 138;
		// 	var brick = this.game.add.sprite(this.game.world.centerX+(distanceX/2)*i,200+(distanceX/2)-17*i,'brick');
		// 	brick.anchor.setTo(0.5	);
		// 	brick.position.y -= level[i]*(distanceX/2);
		// };
		// var distanceX = 62;
		// var distanceY = 36;
		// var stepY =0;
		// var stepX =0;

		// for (var i = level_1.length - 1; i >= 0; i--) {
		// 	for (var j = level_1[i].length - 1; j >= 0; j--) {
		// 		var brick = this.game.add.sprite(this.game.world.centerX-150+j*31+stepX,this.game.world.centerY-18*j+stepY,'brick');
		// 		// brick.anchor.setTo(0.5);
		// 		brick.position.y -= level_1[i][j]*10;
		// 		this.game.add.tween(brick).from( { y: -200 });
		// 		this.game.add.tween(brick).start;

		// 		var brickTween = game.add.tween(brick.position.y);
		// 		brickTween.to({y:200}, 200, Phaser.Easing.Linear.None);
		// 		brickTween.start();

		// 		console.log(level_1[i][j]);
		// 		var bricks = [];
		// 	};
		// 	distanceY -=15;
		// 	stepY+=18;
		// 	stepX+=31;
		// 	console.log(' ---- ')
		// };



		viajero= game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'viajero');
		viajero.anchor.setTo(0.5,.9);
		viajero.customParams = {direction : 1};
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
		
	     linea = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, 360);

		game.camera.scale = .4;

	},
	update:function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			this.turnChar(this.action_left);
			
		}
	},
	moveChar: function(sprite,event ) {
		switch (viajero.customParams.direction){
			case 1: 
				var posx =  viajero.x - 36; 
				var posy = viajero.y + 18; 
				game.add.tween(viajero).to( { y: posy, x : posx}, 600, "Linear", true);
    			viajero.animations.play('walk_1', 24, false);
				break;
			case 2: 
				var posx =  viajero.x + 36; 
				var posy = viajero.y + 18; 
				game.add.tween(viajero).to( { y: posy, x : posx}, 500, "Linear", true);
    			viajero.animations.play('walk_2', 24, false);
				break;
			case 3: 
				var posx =  viajero.x + 36; 
				var posy = viajero.y - 18; 
				game.add.tween(viajero).to( { y: posy, x : posx}, 500, "Linear", true);
    			viajero.animations.play('walk_3', 24, false);
				break;
			case 4: 
				var posx =  viajero.x - 36; 
				var posy = viajero.y - 18; 
				game.add.tween(viajero).to( { y: posy, x : posx}, 500, "Linear", true);
    			viajero.animations.play('walk_4', 24, false);
				break;
		}
	},
	turnChar: function(sprite,event ) {
		console.log('mover personaje a la izquierda');
		console.log(sprite.customParams.direction);
		if (sprite.customParams.direction<0) {
			if (viajero.customParams.direction ==1) {
    			viajero.animations.play('turn_1_2', 24, false);
			} 
			if (viajero.customParams.direction == 2) {
    			viajero.animations.play('turn_2_3', 24, false);
			}
			if (viajero.customParams.direction == 3) {
    			viajero.animations.play('turn_3_4', 24, false);
			}
			if (viajero.customParams.direction == 4) {
    			viajero.animations.play('turn_4_1', 24, false);
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