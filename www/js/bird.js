if($('#bird').length>0){
var xpos = 1200;
var ypos = 570;
var game = new Phaser.Game(this.xpos, ypos, Phaser.AUTO, 'bird');

// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        game.stage.backgroundColor = '#71c5cf';
        game.load.image('pipe', 'img/pipe.png');
        game.load.image('birdddd', 'img/logo.png');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 105, 'birdddd');

        // Add gravity to the bird to make it fall
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        game.input.onDown.add(this.jump, this);

        this.pipes = game.add.group(); // Create a group
        this.pipes.enableBody = true;  // Add physics to the group
        this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes
        this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);//每这么多毫秒创建一条柱子
    },

    update: function() {// This function is called 60 times per second
        if (this.bird.inWorld == false)
            this.restartGame();
        game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this); 
    },
    jump: function() {
        this.bird.body.velocity.y = -400; // bird jumping speed
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    addOnePipe: function(x, y) {  
        // Get the first dead pipe of our group
        var pipe = this.pipes.getFirstDead();
        // Set the new position of the pipe
        pipe.reset(x, y);
        console.log('x:'+x+"  y:"+y);
        pipe.body.velocity.x = -400;          // Add velocity to the pipe to make it move left
        // Kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    addRowOfPipes: function() {  
        // Pick where the hole will be
        var hole = Math.floor(Math.random() * 5) + 1; //空洞的位置
        // Add the 6 pipes 
        for (var i = 0; i < 8; i++){
            if (i != hole && i != hole + 1 && i!=hole+2){
                this.addOnePipe(xpos, i * 60 + 10);   
            }
        }
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');


} // if div exists