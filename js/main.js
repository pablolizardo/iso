var game = new Phaser.Game(640,360,Phaser.AUTO);
var linea;

var GameState = {
	preload:function () {
		console.log('preload');
		this.load.image('brick', 'assets/brick_1.png');
		this.load.image('bg', 'assets/bg_cyan.png');
		this.load.image('char', 'assets/char.png');
		this.load.image('arrow', 'assets/btn_arrow.png');
		this.load.image('btn_up', 'assets/btn_up.png');
		this.load.image('btn_empty', 'assets/btn_empty.png');
		this.game.load.atlasJSONHash('char_turn', 'assets/char_turn.png', 'assets/char_turn.json');
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
		var distanceX = 62;
		var distanceY = 36;
		var stepY =0;
		var stepX =0;

		for (var i = level_1.length - 1; i >= 0; i--) {
			for (var j = level_1[i].length - 1; j >= 0; j--) {
				var brick = this.game.add.sprite(this.game.world.centerX-150+j*31+stepX,this.game.world.centerY-18*j+stepY,'brick');
				// brick.anchor.setTo(0.5);
				brick.position.y -= level_1[i][j];
				this.game.add.tween(brick).from( { y: -200 });
				this.game.add.tween(brick).start;

				var brickTween = game.add.tween(brick.position.y);
				brickTween.to({y:200}, 200, Phaser.Easing.Linear.None);
				brickTween.start();

				console.log(level_1[i][j]);
				var bricks = [];
			};
			distanceY -=15;
			stepY+=18;
			stepX+=31;
			console.log(' ---- ')
		};



		viajero= game.add.sprite(this.game.world.centerX,this.game.world.centerY-30, 'char_turn');
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

		//left 
		this.arrow_left = this.game.add.sprite(0,game.world.centerY,'arrow');
		this.arrow_left.customParams = {direction :-1};
		this.arrow_left.inputEnabled = true;
		this.arrow_left.events.onInputDown.add(this.moveChar,this );

		this.arrow_right = this.game.add.sprite(this.game.world.width,game.world.centerY,'arrow');
		this.arrow_right.scale.x = -1;
		this.arrow_right.customParams = {direction :1};
		this.arrow_right.inputEnabled = true;
		this.arrow_right.events.onInputDown.add(this.moveChar,this );

		this.action_left = this.game.add.sprite(0,0,'btn_empty');
		this.action_right = this.game.add.sprite(this.game.world.width-this.action_left.width,0,'btn_up');
		
	     linea = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, 360);

		game.camera.scale = .4;

	},
	update:function() {
	},
	moveChar: function(sprite,event ) {
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