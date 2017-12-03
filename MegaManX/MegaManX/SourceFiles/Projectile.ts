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
		damagePoints?: number;
		instigator: Phaser.Sprite;
		constructor(game: Phaser.Game, x: number, y: number, projectileArguments: ProjectileArguments, instigator: Phaser.Sprite, key?: any, frame?: any, damagePoints?: number)
		{
			super(game, x, y, key, frame);
			this.anchor.setTo(0.5, 0.5);
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
			this.damagePoints = damagePoints;

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

			this.body.onCollide = new Phaser.Signal();
			this.body.onCollide.add(this.OnHit, this);
				
			game.add.existing(this);	
		}

		OnHit(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{
			if (this.instigator === obj2)
				return false;

			if (obj2 instanceof BaseEnemy)
			{
				var enemy = obj2 as BaseEnemy;
				enemy.OnHit(this);
				if (this.damagePoints !== null)
				{
					this.damagePoints -= enemy.maxHealth;
					if (this.damagePoints <= 0)
						this.Die();
				}
			}
			if (obj2 instanceof Player)
			{
				var player = obj2 as Player;
				player.OnHit(this);
			}
			return false;
		}

		initProjectile()
		{
			if (this.creationAnimation !== null && this.creationAnimation !== undefined)
				this.creationAnimation.play();
			else
				this.flyingAnimation.play();
		}

		onCreationCompleted()
		{
			this.flyingAnimation.play();
		}

		collisionCallback(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{
			this.Die();
		}

		Die()
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
			if (!this.inCamera)
			{
				//Die immediately
				this.destroy();
				return;
			}

			if (this.isDying && this.animations.currentAnim !== null && this.animations.currentAnim.isFinished && !this.isDead)
			{
				this.isDead = true;
			}
		}

		onOutOfBounds(context: Phaser.Sprite)
		{
			console.log(context.name + ' exited the world bounds');
			context.destroy();
		}
	}
}