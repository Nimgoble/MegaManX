module MegaManX 
{
	export class BaseEnemy extends Phaser.Sprite
	{
		health: number;
		maxHealth: number;
		ClassName: string = this.name;
		animatedSprite: AnimatedSprite;
		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, maxHealth?: number, currentHealth?: number)
		{
			super(game, x, y, null, frame);
			this.anchor.setTo(0.5, 0.5);
			game.physics.enable(this, Phaser.Physics.ARCADE);

			if (maxHealth !== null)
				this.maxHealth = maxHealth;

			this.health = (currentHealth !== null) ? currentHealth : this.maxHealth;

			game.add.existing(this);

			this.animatedSprite = new AnimatedSprite(game, -0.5, -0.5, key, 0);
			game.add.existing(this.animatedSprite);
			this.addChild(this.animatedSprite);
		}

		OnHit()
		{

		}

		OnCollision(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
		{

		}
	}
}