module MegaManX
{
    export class TestLevel extends Phaser.State
    {
        background: Phaser.Sprite;
        player: MegaManX.Player;
        tiles: Phaser.Group;
		slope: Phaser.Group;
		bunny: MegaManX.Bunny;
		pauseKey: Phaser.Key;

        create()
		{
			this.game.world.setBounds(0, 0, 1920, 1920);
            this.tiles = this.game.add.group();
            this.tiles.enableBody = true;
            this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
            //this.tiles.physicsBodyType = Phaser.Physics.NINJA;

            //Floor
            var tileSprite = this.game.add.tileSprite(0, 352, (50 * 32), 32, 'genericTile', null, this.tiles);
            tileSprite.body.immovable = true;
            tileSprite.body.collideWorldBounds = false;
            tileSprite.body.allowGravity = false;
            //Left Wall
            tileSprite = this.game.add.tileSprite(0, 0, 32, (11 * 32), 'genericTile', null, this.tiles);
            tileSprite.body.immovable = true;
            tileSprite.body.collideWorldBounds = false;
            tileSprite.body.allowGravity = false;
            tileSprite.body.rotation = 90;

            //Slope?
            this.slope = this.game.add.group();
            this.slope.enableBody = true;
            this.slope.physicsBodyType = Phaser.Physics.ARCADE;
            //this.slope.physicsBodyType = Phaser.Physics.NINJA;
            for (var x = 0; x < 11; x++)
            {
                var tile = this.slope.create(32 * (11 + x), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
                //this.game.physics.ninja.enableAABB(tile);
            }
            this.slope.angle = -15;

			this.player = new MegaManX.Player(this.game, 64, 0);
			this.bunny = new Bunny(this.game, 128, 332);

            this.game.camera.follow(this.player);
            this.player.teleportToGround();

			this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.ESC]);
			this.pauseKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.pauseKey.onDown.add(this.togglePauseGame, this);
		}

		togglePauseGame()
		{
			this.game.paused = !this.game.paused;
		}

        update()
		{
			var index = 0;
			var castedGame = (this.game as Game);
			while (index < castedGame.projectiles.length) {
				var projectile = castedGame.projectiles[index];
				if (projectile === null || projectile.isDead)
				{
					projectile.destroy();
					castedGame.removeProjectile(projectile);
				}
				else
					index++;
			}

            //this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
			//console.log("player y velocity before physics collide: " + this.player.body.velocity.y);
            //this.game.physics.arcade.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
			this.game.physics.arcade.collide(this.tiles, this.player, this.player.collisionCallback, null, this.player);
			this.game.physics.arcade.collide(this.tiles, this.bunny, this.bunny.OnCollision, null, this.bunny);
			for (var i = 0; i < castedGame.projectiles.length; ++i)
			{
				var projectile = castedGame.projectiles[i];
				this.game.physics.arcade.collide(this.tiles, projectile, projectile.collisionCallback, null, projectile);
			}

			for (var i = 0; i < castedGame.projectiles.length; ++i)
			{
				var projectile = castedGame.projectiles[i];
				if (projectile.isDead)
				{
					projectile.destroy();
					castedGame.removeProjectile(projectile);
				}
			}
			
            //this.game.physics.ninja.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
			//console.log("player y velocity after physics collide: " + this.player.body.velocity.y);
			//this.game.debug.body(this.player);
            this.player.updateCurrentAnimation();
		}

		renderCrossForPoint(point: Phaser.Point, length: number, color?: string)
		{
			if (color === null) color = 'red';
			var halfLength = length / 2;
			var line1 = new Phaser.Line(point.x - halfLength, point.y - halfLength, point.x + halfLength, point.y + halfLength);
			var line2 = new Phaser.Line(point.x + halfLength, point.y - halfLength, point.x - halfLength, point.y + halfLength);
			this.game.debug.geom(line1, color, true);
			this.game.debug.geom(line2, color, true);
		}

        render()
        {
			//this.game.debug.spriteBounds(this.player, 'blue', false);
			//this.game.debug.body(this.player, 'red', false);
			this.game.debug.body(this.bunny, 'red', false);
			//this.renderCrossForPoint(this.player.getTopForward(false), 10, 'blue');
			//this.renderCrossForPoint(this.player.getBottomForward(false), 10, 'blue');
			//this.renderCrossForPoint(this.player.getTopBackward(false), 10, 'blue');
			//this.renderCrossForPoint(this.player.getBottomBackward(false), 10, 'blue');

			var castedGame = (this.game as Game);
			for (var i = 0; i < castedGame.projectiles.length; ++i)
			{
				var projectile = castedGame.projectiles[i];
				if (projectile !== null && projectile !== undefined && (!projectile.isDead || !projectile.isDying) && projectile.worldTransform)
					this.game.debug.spriteBounds(projectile, 'red', false);
			}
            //this.game.debug.spriteInfo(this.player, 32, 32);

            //this.game.debug.renderSpriteBody(this.player, 'blue');
            //this.game.debug.renderSpriteCollision(this.player, 32, 160);
            //this.game.debug.renderSpriteInputInfo(this.player, 32, 320);
            /*
            this.game.debug.renderText('Current Animation: ' + this.player.currentAnimation, 32, 356);
            this.game.debug.renderText('Next Animation: ' + this.player.nextAnimation, 32, 372);

            this.game.debug.renderText('Frame Velocity X: ' + this.player.frameVelocityX.toString(), 32, 388);
            this.game.debug.renderText('Frame Velocity Y: ' + this.player.frameVelocityY.toString(), 32, 404);
            */

			this.game.debug.text('Wall sliding(method): ' + (this.player.isWallSliding() ? 'Yes' : 'No'), 32, 384);
            //this.game.debug.text('Wall sliding(variable): ' + (this.player.wallSliding ? 'Yes' : 'No'), 32, 400);
			this.game.debug.text('Left Key Down: ' + (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) ? 'Yes' : 'No'), 32, 416);
			this.game.debug.text('Right Key Down: ' + (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) ? 'Yes' : 'No'), 32, 432);
			this.game.debug.text('Dashing: ' + (this.player.isDashing ? 'Yes' : 'No'), 32, 448);
			this.game.debug.text('World Children: ' + this.world.children.length.toString(), 32, 464);

			

			this.game.debug.bodyInfo(this.player, 32, 32);
            for (var i = 0; i < this.tiles.length; i++)
            {
                this.game.debug.spriteBounds(this.tiles.getAt(i), 'purple', false);
                //this.game.debug.spriteCollision(this.tiles.getAt(i), 32, 32);
            }

			//this.game.debug.text('Current Animation: ' + this.player.animatedSprite.getCurrentAnimationName(), 32, 128);
			//this.game.debug.text('onFloor: ' + this.player.body.onFloor(), 32, 160);
			//this.game.debug.text('shot charge: ' + this.player.shotCharge, 32, 192);

            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        }
    }
} 