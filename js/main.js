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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update,render: render } );
    
    
    
function preload() 
{
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
    game.load.image( 'hole', 'assets/hole.png' );
    game.load.image( 'exit', 'assets/hole.png' );
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
    var holegroup;
    //cave exit variables
    var Exit;
    var exit;
    var exits;
    
    var isound = true;
    var killholes = false;
    var holetrue = false;
    var levikey;
    
    Exit = function (index, game, player)
{

    var x = 400;
    //var y = game.world.randomY;
    var y = 10;

    this.game = game;
    this.player = player;
    this.alive = true;

    this.part = game.add.sprite(x, y, 'exit', 'exit');

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
    
    //Function for collectibles. We want to be able to just spawn and delete them as necessary.
Parts = function (index, game, player)
{

    var x = game.world.randomX;
    //var y = game.world.randomY;
    var y = 800;

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

    this.hole.name = index.toString();
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
        

        game.stage.backgroundColor = '#256926';

        Player = game.add.sprite(32, 32, 'player');
        game.physics.enable(Player, Phaser.Physics.ARCADE);
        Player.body.collideWorldBounds = true;
        ////excla = game.add.sprite(Player.x + 10,Player.y - 30, 'excla');
        ////excla.visible = false;
        holegroup = game.add.group;
    
    holes = [];
    HolesTotal = 1;
    //enemiesAlive = 20;
    parts = [];
    PartsTotal = 1;
    exits = [];
    
    for (var i = 0; i < HolesTotal; i++)
    {
        holes.push(new Holes(i, game, Player));
        //holegroup.add(holes[i]);
        //new Cookie(5, game, Player);
    }
    //for (var i = 0; i < PartsTotal; i++)
    //{
    //    parts.push(new Parts(i, game, Player));
    //}

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
        
    levikey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    
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

        for (var i = 0; i < HolesTotal; i++)
        {
            if (holes[i].alive)
            {
                //washole = true;
                //if (killholes == true)
                //    {
                //        holes[i].kill();
                //    }
                if (game.physics.arcade.overlap(Player, holes[i].hole))
                    {
                        for (var i = 0; i < 1; i++)
                        {
                            exits.push(new Exit(i, game, Player));
                        }
                        for (var i = 0; i < PartsTotal; i++)
                        {
                            parts.push(new Parts(i, game, Player));
                        }//Only need this for loop when making a part, AKA when in the InHole function, which we still need.
                    holetrue = true;
                    }
                game.physics.arcade.overlap(Player, holes[0].hole, inHole, null, this);
                //holes[i].kill;
            }
        }
        for (var i = 0; i < parts.length; i++)//Repeat this code block for holes.
        {
            if (parts[i].alive)
            {
                game.physics.arcade.overlap(Player, parts[i].part, gotPart, null, this);
            }
        }
        //If inhole
        if (holetrue == true)
            {
                Player.body.velocity.y = 300;
                if (levikey.isDown)
                    {
                        //counteract the downward force, and play sound.
                        Player.body.velocity.y = -300;
                        if (levikey.isDown && isound == true)
                        {
                            levitate.play();
                            isound = false;
                        }
                        if (!levikey.isDown && isound == false)
                            isound = true;
                        /*if (isound == true)
                            {
                                levitate.play();
                                isound = false;
                            }
                        else
                            isound = true;*/
                    }
              //  for(var i = 0; i < 1; i++)
               //     {
                //if (game.physics.arcade.overlap(Player, exits[0].exit))
                 //   {
                 //       //holetrue == false;
                 //      game.stage.backgroundColor = '#256926';
                        //exits[i].kill();
                        
                 //   }
               //    }

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
        //if (washole == true)
         //   {
         //       Player = game.add.sprite(32, 32, 'player');
         //       game.physics.enable(Player, Phaser.Physics.ARCADE);
         //       Player.body.collideWorldBounds = true;
        //        washole = false;
          //  }
    }
    function inHole(Player, HOle)
    {
        holetrue = true;
        game.stage.backgroundColor = '#5F5F5F';
        HOle.kill();
        Player.x = 400;
        Player.y = 50;
        fall.play();
    }
    function gotPart(Player, partt)
    {
        partt.kill();
        pieces++;
        GET.play();
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
    function render () {

     game.debug.text("Pieces Collected: " +pieces, 32, 32);
    game.debug.text("Arrow keys to move.", 32, 42);
    game.debug.text("M to mute music.", 32, 52);
        game.debug.text("N to resume music.", 32, 62);
        game.debug.text("Q in cave levitates.", 32, 72);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
};