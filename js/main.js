window.onload = function()
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    
    
function preload() 
{
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
    game.load.image( 'hole', 'assets/hole.png' );
    game.load.image( 'player', 'assets/player.png' );
    game.load.image( 'part', 'assets/part.png' );
        game.load.audio('gameoover','assets/gameover.mp3');
        game.load.audio('GET','assets/key.wav');
        game.load.audio('fall','assets/fall.wav');
        game.load.audio('levi','assets/levitate.wav');
        game.load.audio('music', 'assets/Bumpin Beasts.mp3');
    game.load.image('end', 'assets/end_bg.png');
        //gameoover,fall,levi,GET,music
}
    
    
    //global variables
    //var bouncy;
    var pieces = 0;//How many we have collected.
    var hole;
    var part;//variable for collectibles;
    var Player;
    var cursors;
    var musicoff;
    var musicon;
    var music;
    var endbg;//When you finish game.
    ////
    var holes;// = [];
    var HolesTotal;// = 4;
    var parts;// = [];
    var PartsTotal;// = 1;
    ////
    var gameoover;
    var GET;
    var fall;
    var levitate;
    //
    var Parts;
    var Holes;
    
    //Function for collectibles. We want to be able to just spawn and delete them as necessary.
Parts = function (index, game, player)
{

    var x = game.world.randomX;
    //var y = game.world.randomY;
    var y = 300;

    this.game = game;
    this.player = player;
    this.alive = true;

    this.part = game.add.sprite(x, y, 'part', 'part');

    //this.shadow.anchor.set(0.5);
    this.part.anchor.set(0.5);
    //this.turret.anchor.set(0.3, 0.5);

    this.part.name = index.toString();
    game.physics.enable(this.part, Phaser.Physics.ARCADE);
    //this.cookie.body.immovable = false;
    this.part.body.collideWorldBounds = true;
    //this.cookie.body.bounce.setTo(1, 1);

    //this.tank.angle = game.rnd.angle();

    //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
}
    
//Function for making holes. This way we can have a blank background and just plop down holes.
    Holes = function (index, game, player) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.player = player;
    this.alive = true;

    this.hole = game.add.sprite(x, y, 'hole', 'hole');

    //this.shadow.anchor.set(0.5);
    this.hole.anchor.set(0.5);
    //this.turret.anchor.set(0.3, 0.5);

    //this.hole.name = index.toString();
    game.physics.enable(this.hole, Phaser.Physics.ARCADE);
    //this.cookie.body.immovable = false;
    this.hole.body.collideWorldBounds = true;
    //this.cookie.body.bounce.setTo(1, 1);

    //this.tank.angle = game.rnd.angle();

    //game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};
    function create()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something awesome.", style );
        //text.anchor.setTo( 0.5, 0.0 );
        /////////////////////////////////////////////////////////
        

        game.stage.backgroundColor = '#ED8B03';

        Player = game.add.sprite(32, 32, 'player');
        game.physics.enable(Player, Phaser.Physics.ARCADE);
        Player.body.collideWorldBounds = true;
        ////excla = game.add.sprite(Player.x + 10,Player.y - 30, 'excla');
        ////excla.visible = false;
    
    holes = [];
    HolesTotal = 4;
    //enemiesAlive = 20;
    parts = [];
    PartsTotal = 1;
    
    for (var i = 0; i < HolesTotal; i++)
    {
        holes.push(new Holes(i, game, Player));
        //new Cookie(5, game, Player);
    }
    for (var i = 0; i < PartsTotal; i++)
    {
        parts.push(new Parts(i, game, Player));
    }//Only need this for loop when making a part, AKA when in the InHole function, which we still need.

    //player.animations.add('left', [0, 1, 2, 3], 10, true);
    //player.animations.add('turn', [4], 20, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    //Make text for charge.
    //chargeText = game.add.text(player.x -10, player.y - 10, fuelstring + fuel, { font: '12px Arial', fill: '#fff' });
    //scoretxt = game.add.text(10, 50, score, { font: '24px Arial', fill: '#fff' });
    //scoretxt.visible = false;
    
    //timetxt = game.add.text(10, 10, timestr + lives, { font: '12px Arial', fill: '#fff' });
    
    //gscoretxt = game.add.text(10, 30, gscorestr + score, { font: '12px Arial', fill: '#fff' });
    

    cursors = game.input.keyboard.createCursorKeys();
    //jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
    //jumpButton = cursors.up;
    musicoff = game.input.keyboard.addKey(Phaser.Keyboard.M);
    musicon = game.input.keyboard.addKey(Phaser.Keyboard.N);
    music = game.add.audio('music');
    music.loop = true;
    music.play();
    
    endbg = game.add.sprite(0,0, 'end');
    endbg.visible = false;

    //That horrid jump sound.
    //jump = game.add.audio('jump');
    //jump.volume = 0.1;
    //sound effects:
    gameoover = game.add.audio('gameoover');
    GET = game.add.audio('GET');
    fall = game.add.audio('fall');
    levitate = game.add.audio('levi');
    }
    
    function update() 
    {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
        //if (veggies_eaten == 10)
          //  {
            //cancookie = true;
          //  excla.visible = true;
          //  }
        //else
          //  excla.visible = false;
        //if (veggies_eaten > 10)
          //  veggies_eaten = 10;
        Player.body.velocity.x = 0;
        Player.body.velocity.y = 0;//This one is important. Inside the holes, this will be a positive value, making player go down. Inside hole, levitation will add an upward force equal to it.
        updatecontrols();

        for (var i = 0; i < holes.length; i++)
        {
            if (holes[i].alive)
            {
                game.physics.arcade.overlap(Player, holes[i].hole, inHole, null, this);
            }
        }
        for (var i = 0; i < parts.length; i++)//Repeat this code block for holes.
        {
            if (parts[i].alive)
            {
                game.physics.arcade.overlap(Player, parts[i].part, gotPart(), null, this);
            }
        }
    //timetxt.text = timestr + lives;
    //gscoretxt.text = gscorestr + score;
    //excla.x = Player.x + 10;
    //excla.y = Player.y - 30;
    
        
        /*chargeText.x = player.x - 10;
        chargeText.y = player.y - 10;    
        chargeText.text = fuelstring + fuel;*/

        
        
        //
    
            //game.physics.arcade.velocityFromAngle(sprite.angle, 300, player.body.velocity);
            //soundeffect.play();
                                            ////timetxt.text = timestr + lives;
                //scoretxt.text = score;
                //gameon = gameon - 1;
    /*if (lives <= 0)
        {
    //After the game ends:
    endbg.visible = true;
    endbg.bringToTop();
    //gameoover.play();
            if (made == 0);
                {
                    scoretxt = game.add.text(300, 250, score, { font: '100px Arial', fill: '#fff' });
                    music.stop();
                    made = 1;
                    //game.add.gamemover();
                }
    //scoretxt.visible = true;
    //scoretxt.bringToFront();
        }*/
    }
    function inHole()
    {
        Player.x = Player.x + 200;
        //holes[0].kill;
        //holes[1].kill;
        //holes[2].kill;
        //holes[3].kill;
        //holes.kill;
        //for (var i = 0; i < holes.length; i++)
        //{
        //        holes[i].kill;
        //}
        this.kill;
    }
    function gotPart()
    {
        parts.kill;
        pieces++;
    }
    function updatecontrols()
    {
        //if (lives > 0)
    //{
        if (cursors.left.isDown)
        {
            Player.body.velocity.x = -300;
        }
        if (cursors.right.isDown)
        {
            Player.body.velocity.x = 300;
        }
        if (cursors.up.isDown)
        {
            Player.body.velocity.y = -300;
        }
        if (cursors.down.isDown)
        {
            Player.body.velocity.y = 300;
        }
    //}
        ////
        if (musicoff.isDown)
            music.pause();
        if (musicon.isDown)
            music.resume();
        
    }
    function loadmainscreen()
    {
        //256926//green grass
        game.stage.backgroundColor = '#256926';
        //holes = [];
        //HolesTotal = 4;
        //for (var i = 0; i < HolesTotal; i++)
        //{
        //    holes.push(new Holes(i, game, Player));
        //new Cookie(5, game, Player);
        //}
    }
};
