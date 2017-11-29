module MegaManX 
{
	export class BaseEnemy extends Phaser.Sprite /*implements IEnemyConstructor<BaseEnemy>*/
	{
		health: number;
		maxHealth: number;
		ClassName: string = this.name;
		animatedSprite: AnimatedSprite;
		otherSFX: Phaser.Sound;
		constructor(game: Phaser.Game, x: number, y: number, ...args: any[])
		{
			super(game, x, y, null, args[1]);
			this.anchor.setTo(0.5, 0.5);
			game.physics.enable(this, Phaser.Physics.ARCADE);

			var maxHealth: number = args[2];
			var currentHealth: number = (args.length >= 4) ? args[3] : null;
			var key: string = args[0];
			if (maxHealth !== null)
				this.maxHealth = maxHealth;

			this.health = (currentHealth !== null && currentHealth !== undefined) ? currentHealth : this.maxHealth;

			this.otherSFX = game.add.audio('sfx');
			this.otherSFX.allowMultiple = true;
			this.otherSFX.addMarker('enemyHit', 37.0, 0.5);
			//this.otherSFX.addMarker('jumpLand', 22.5, 0.5);
			//this.otherSFX.addMarker('dash', 23.75, 0.5);

			game.add.existing(this);

			this.animatedSprite = new AnimatedSprite(game, -0.5, -0.5, key, 0);
			game.add.existing(this.animatedSprite);
			this.addChild(this.animatedSprite);
		}

		OnHit(hitter: Projectile)
		{
			if (hitter.damagePoints !== null)
				this.health -= hitter.damagePoints;

			this.otherSFX.play('enemyHit');

			console.log(this.name + ' was hit by a projectile, doing ' + hitter.damagePoints.toString() + ' damage');

			if (this.health <= 0)
				this.destroy();//TODO: Fucking fix this with a death animation, or something
		}

		OnCollision(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{

		}
	}
}