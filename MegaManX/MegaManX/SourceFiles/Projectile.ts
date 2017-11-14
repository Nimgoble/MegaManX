module MegaManX 
{
	export class ProjectileArguments
	{
		xVelocity?: number;
		yVelocity?: number;
		definition: ProjectileDefinition;
		xScale: number;
		public constructor(definition: ProjectileDefinition, xVelocity?: number, yVelocity?: number)
		{
			this.definition = definition;
			this.xVelocity = xVelocity;
			this.yVelocity = yVelocity;
		}
	}
	export class Projectile extends Phaser.Sprite
	{
		isDying: boolean;
		isDead: boolean;
		projectileArguments: ProjectileArguments;
		creationAnimation: Phaser.Animation;
		flyingAnimation: Phaser.Animation;
		deathAnimation: Phaser.Animation;
		constructor(game: Phaser.Game, x: number, y: number, projectileArguments: ProjectileArguments, key?: any, frame?: any)
		{
			super(game, x, y, key, frame);
			this.isDying = false;
			this.isDead = false;
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.checkWorldBounds = true;
			this.events.onOutOfBounds.add(this.onOutOfBounds, this);
			if (projectileArguments.xVelocity !== null)
				this.body.velocity.x = projectileArguments.xVelocity;
			if (projectileArguments.yVelocity !== null)
				this.body.velocity.y = projectileArguments.yVelocity;
			this.body.allowGravity = false;
			this.projectileArguments = projectileArguments;

			this.scale.x = projectileArguments.xScale;

			this.flyingAnimation = this.projectileArguments.definition.flyingAnimation.addToAnimationManager(this.animations);
			if (this.projectileArguments.definition.creationAnimation !== null && this.projectileArguments.definition.creationAnimation !== undefined)
			{
				this.creationAnimation = this.projectileArguments.definition.creationAnimation.addToAnimationManager(this.animations);
				this.creationAnimation.onComplete.add(this.onCreationCompleted, this);
			}
			if (this.projectileArguments.definition.deathAnimation !== null && this.projectileArguments.definition.deathAnimation !== undefined)
			{
				this.deathAnimation = this.projectileArguments.definition.deathAnimation.addToAnimationManager(this.animations);
			}
				
			game.add.existing(this);	
		}

		initProjectile()
		{
			if (this.creationAnimation !== null && this.creationAnimation !== undefined)
			{
				this.creationAnimation.play();
			}
			else
				this.flyingAnimation.play();
		}

		onCreationCompleted()
		{
			this.flyingAnimation.play();
		}

		collisionCallback(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{
			if (this.isDead || this.isDying)
				return;
			this.isDying = true;
			if (this.deathAnimation !== null && this.deathAnimation !== undefined)
				this.deathAnimation.play();
			else
				this.isDead = true;
		}

		update()
		{
			if (this.isDying && this.animations.currentAnim !== null && this.animations.currentAnim.isFinished && !this.isDead)
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