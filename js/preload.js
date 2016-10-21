var preload = function(game){}

preload.prototype = {
	preload: function(){ 
		
		var loadingBar = this.add.sprite(160,240,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.spritesheet("numbers","assets/numbers.png",100,100);

		// body...
		console.log('preload');
		this.load.image('brick', 'assets/brick.png');
		this.load.image('bg', 'assets/bg_cyan.png');
		this.load.image('char', 'assets/char.png');
		this.load.image('arrow', 'assets/arrow.png');
		//this.load.spritesheet('char_turn', 'assets/char_turn.png', 60, 138, 81);
		this.game.load.atlasJSONHash('char_turn', 'assets/char_turn.png', 'assets/char_turn.json');
		//  Firefox doesn't support mp3 files, so use ogg
    	this.game.load.audio('bgmusic', ['assets/audio/bgmusic.ogg']);


	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}