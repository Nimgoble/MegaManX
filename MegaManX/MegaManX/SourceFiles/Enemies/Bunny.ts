module MegaManX 
{
	export class Bunny extends BaseEnemy
	{
		nextHopTime: number;
		static jumpVelocityY: number = 100;
		static regularGravity: number = 7.5;
		static hopFrequency: number = 1.25;
		static jumpVelocityX: number = 50;

		constructor(game: Phaser.Game, x: number, y: number)
		{
			super(game, x, y, 'bunny', null, 25);
			this.animatedSprite.currentAnimation = this.animatedSprite.animations.add('idle', Phaser.Animation.generateFrameNames('bunny', 1, 1, '', 4), 1, true);
			this.animatedSprite.animations.add('jumpStart', Phaser.Animation.generateFrameNames('bunny', 2, 4, '', 4), 15, false);
			this.animatedSprite.animations.add('falling', Phaser.Animation.generateFrameNames('bunny', 3, 3, '', 4), 1, false);
			this.animatedSprite.animations.add('jumpLand', Phaser.Animation.generateFrameNames('bunny', 2, 2, '', 4), 1, false);
			this.animatedSprite.animations.add('shoot', ['bunny0005', 'bunny0006', 'bunny0005'], 30, false);

			this.nextHopTime = 0.0;

			this.body.collideWorldBounds = false;
			this.body.gravity.y = Bunny.regularGravity;
			this.body.allowGravity = true;
			this.body.setSize(28, 28, 0, 0);
			this.body.bounce.setTo(0, 0);
		}

		update()
		{
			if (this.nextHopTime <= this.game.time.totalElapsedSeconds() && this.body.touching.down)
				this.hop();
			
			this.updateAnimation();
		}

		hop()
		{
			//Move the body up a hair so we can jump
			this.body.y -= 1;
			//Jump
			this.body.velocity.y = -Bunny.jumpVelocityY;
			this.body.velocity.x = Bunny.jumpVelocityX * -this.scale.x;
			this.nextHopTime = this.game.time.totalElapsedSeconds() + Bunny.hopFrequency;
		}

		OnCollision(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{
			if (obj1 === this)
			{
				if (obj1.body.touching.down)
					this.body.velocity.x = 0;
				if (obj1.body.touching.left || obj1.body.touching.right)
					this.scale.x *= -1;
			}
		}

		updateAnimation()
		{
			var currentAnimationName = this.animatedSprite.getCurrentAnimationName();
			var nextAnimation = currentAnimationName;
			if (!this.body.touching.down)
			{
				if (currentAnimationName === 'jumpStart' &&
					this.animatedSprite.currentAnimation.isFinished &&
					this.body.velocity.y >= 0)
				{
					nextAnimation = 'falling';
				}
				else if (this.body.velocity.y < 0 && currentAnimationName !== 'jumpStart')
				{
					//if we're going up and our animation isn't jump and we jumped
					nextAnimation = 'jumpStart';
				}
			}
			else if (this.body.touching.down && this.body.deltaY() > 0.0)
			{
				nextAnimation = 'jumpLand';
			}
			else
				nextAnimation = 'idle';

			//console.log('bunny current animation: ' + currentAnimationName + '\nbunny next animation: ' + nextAnimation);

			if (nextAnimation !== currentAnimationName)
			{
				this.animatedSprite.stopAnimation(null, true);
				this.animatedSprite.playAnimation(nextAnimation);
			}
		}
	}
}
