var game = new Phaser.Game(640,360,Phaser.AUTO);

var GameState = {
	preload:function () {
		// body...
		console.log('preload');
		this.load.image('brick', 'assets/brick_1.png');
		this.load.image('bg', 'assets/bg_cyan.png');
		this.load.image('char', 'assets/char.png');
		this.load.image('arrow', 'assets/arrow.png');
	},
	create:function () {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.bg = this.game.add.sprite(0,0,'bg');

		this.brick = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'brick');
		this.brick.anchor.setTo(0.5,.9);

		var level = [1,2,2,1,5,3,7,2];
		for (var i = level.length - 1; i >= 0; i--) {
			//level[i];
			var distanceX = 31;
			var distanceY = 53;
			var brick = this.game.add.sprite(this.game.world.centerX-124+distanceX*i,this.game.world.centerY,'brick');
			brick.anchor.setTo(0.5,.9);
			brick.position.y = (level[i]*10)+200;
		};

		this.char = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-40,'char');
		this.char.anchor.setTo(0.5,.9);
		this.char.inputEnabled = true;
		this.char.events.onInputDown.add(this.animateChar, this);



		//left 
		this.arrow_left = this.game.add.sprite(0,0,'arrow');
		this.arrow_left.customParams = {direction :-1};
		this.arrow_left.inputEnabled = true;
		this.arrow_left.events.onInputDown.add(this.moveChar,this );

		this.arrow_right = this.game.add.sprite(this.game.world.width,0,'arrow');
		this.arrow_right.scale.x = -1;
		this.arrow_right.customParams = {direction :1};
		this.arrow_right.inputEnabled = true;
		this.arrow_right.events.onInputDown.add(this.moveChar,this );


	},
	update:function() {
	},
	moveChar: function(sprite,event ) {
		console.log('mover personaje a la izquierda');
		console.log(sprite.customParams.direction);
		if (sprite.customParams.direction<0) {
			this.char.position.x -=10;
			this.char.position.y +=5;
		}else {
			this.char.position.x +=10;
			this.char.position.y +=5;
		};
	} ,
	animateChar: function(sprite,event ) {
		console.log('mover personaje a la izquierda');
		this.char.angle -=10;
	}
};

game.state.add('GameState', GameState);
game.state.start('GameState');