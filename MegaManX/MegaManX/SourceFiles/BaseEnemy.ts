module MegaManX 
{
	export class BaseEnemy extends Phaser.Sprite
	{
		Health: number;
		MaxHealth: number;
		ClassName: string = this.name;
		AnimatedSprite: AnimatedSprite;
		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, maxHealth?: number, currentHealth?: number)
		{
			super(game, x, y, key, frame);
			this.anchor.setTo(0.5, 0.5);
			game.physics.enable(this, Phaser.Physics.ARCADE);

			if (maxHealth !== null)
				this.MaxHealth = maxHealth;
			if (currentHealth !== null)
				this.Health = currentHealth;


			game.add.existing(this);

			this.AnimatedSprite = new AnimatedSprite(game, -0.5, -0.5, key, 0);
			game.add.existing(this.AnimatedSprite);
			this.addChild(this.AnimatedSprite);
		}

		OnHit()
		{

		}
	}
}