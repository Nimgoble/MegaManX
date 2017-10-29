module MegaManX 
{
	export class Projectile extends Phaser.Sprite
	{
		deathAnimation: string;
		isDying: boolean;
		isDead: boolean;
		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, xVelocity?: number, yVelocity?: number)
		{
			super(game, x, y, key, frame);
			this.isDying = false;
			this.isDead = false;
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

		collisionCallback(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{
			if (this.isDead || this.isDying)
				return;
			this.isDying = true;
			if (this.deathAnimation !== '')
				this.animations.play(this.deathAnimation, null, false, true);
		}

		update()
		{
			if (this.isDying && this.animations.currentAnim.isFinished && !this.isDead)
			{
				this.isDead = true;
			}
		}

		onOutOfBounds(context: Phaser.Sprite)
		{
			context.destroy();
		}
	}
}