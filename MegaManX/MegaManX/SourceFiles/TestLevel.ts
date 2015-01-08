module MegaManX
{
    export class TestLevel extends Phaser.State
    {
        background: Phaser.Sprite;
        player: MegaManX.Player;
        tiles: Phaser.Group;
        slope: Phaser.Group;

        create()
        {
            this.tiles = this.game.add.group();
            this.tiles.enableBody = true;
            this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
            //Floor
            for (var x = 0; x < 20; x++)
            {
                var tile = this.tiles.create((x * 32), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
            }

            //Left wall
            for (var x = 0; x < 11; x++)
            {
                var tile = this.tiles.create(0, 0 + (x * 32), 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.rotation = 90;
                tile.body.allowGravity = false;
            }

            //Slope?
            this.slope = this.game.add.group();
            this.slope.enableBody = true;
            this.slope.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 11; x++)
            {
                var tile = this.slope.create(32 * (11 + x), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
            }
            this.slope.rotation = -15;

            this.player = new MegaManX.Player(this.game, 64, 0);

            this.camera.follow(this.player);
            this.player.teleportToGround();

            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        }

        update()
        {
            //this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.game.physics.arcade.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.player.updateCurrentAnimation();
        }

        render()
        {
            this.game.debug.spriteBounds(this.player, 'red');
            this.game.debug.spriteInfo(this.player, 32, 32);

            //this.game.debug.renderSpriteBody(this.player, 'blue');
            //this.game.debug.renderSpriteCollision(this.player, 32, 160);
            //this.game.debug.renderSpriteInputInfo(this.player, 32, 320);
            /*
            this.game.debug.renderText('Current Animation: ' + this.player.currentAnimation, 32, 356);
            this.game.debug.renderText('Next Animation: ' + this.player.nextAnimation, 32, 372);

            this.game.debug.renderText('Frame Velocity X: ' + this.player.frameVelocityX.toString(), 32, 388);
            this.game.debug.renderText('Frame Velocity Y: ' + this.player.frameVelocityY.toString(), 32, 404);
            */

            //this.game.debug.renderText('Wall sliding: ' + (this.player.wallSliding ? 'Yes' : 'No'), 32, 400);
            //this.game.debug.renderText('Teleporting: ' + (this.player.teleporting ? 'Yes' : 'No'), 32, 416);
            //this.game.debug.renderText('Player Gravity: ' + this.player.body.gravity.toString(), 32, 432);

            for (var i = 0; i < this.tiles.length; i++)
            {
                this.game.debug.spriteBounds(this.tiles.getAt(i), 'purple');
                //this.game.debug.spriteCollision(this.tiles.getAt(i), 32, 32);
            }

            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        }
    }
} 