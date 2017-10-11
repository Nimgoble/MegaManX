module MegaManX 
{
	export class Projectile extends Phaser.Sprite
	{
		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, xVelocity?: number, yVelocity?: number)
		{
			super(game, x, y, key, frame);
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.checkWorldBounds = true;
			this.events.onOutOfBounds.add(this.onOutOfBounds, this);
			if (xVelocity !== null)
				this.body.velocity.x = xVelocity;
			if (yVelocity !== null)
				this.body.velocity.y = yVelocity;
			this.body.allowGravity = false;
			game.add.existing(this);
		}

		onOutOfBounds(context: Phaser.Sprite)
		{
			context.destroy();
		}
	}
}