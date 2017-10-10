module MegaManX
{
	export class AnimatedSprite extends Phaser.Sprite 
	{
		currentAnimation: Phaser.Animation;
		nextAnimation: Phaser.Animation;

		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any)
		{
			super(game, x, y, key, frame);
			if (this.body !== null)
			{
				this.body.collideWorldBounds = false;
				//this.body.gravity.x = 0;
				this.body.gravity.y = 0;
				//this.body.gravity.clampY(0, 5);
				this.body.allowGravity = false;
				//this.body.allowCollision.any = true;
				this.body.setSize(30, 30, 0, 0);
				this.body.bounce.setTo(0, 0);
			}
		}

		playAnimation(animation: string)
		{
			this.currentAnimation = this.animations.play(animation);
		}

		stopAnimation(animation?: string, resetFrame?: boolean)
		{
			if (animation === null && this.currentAnimation !== null)
				animation = this.currentAnimation.name;
			this.animations.stop(animation, resetFrame);
		}

		getCurrentAnimationName()
		{
			return (this.currentAnimation === null || this.currentAnimation === undefined) ? '' : this.currentAnimation.name;
		}
	}
}