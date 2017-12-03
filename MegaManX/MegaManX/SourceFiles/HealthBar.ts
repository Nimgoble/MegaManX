module MegaManX 
{
	export class HealthSprite extends Phaser.Sprite
	{
		private filled: boolean;
		constructor(game: Phaser.Game, x: number, y: number)
		{
			super(game, x, y, 'health_ui', 'health_piece_full');
			this.animations.add('filled', ['health_piece_full'], 1, false, null);
			this.animations.add('empty', ['health_piece_empty'], 1, false, null);
			this.SetFilled(true);
			this.game.add.existing(this);
		}
		SetFilled(filled: boolean)
		{
			if (this.filled === filled)
				return;
			if (filled)
				this.animations.play('filled');
			else
				this.animations.play('empty');
			this.filled = filled;
		}
	}
	export class HealthBar extends Phaser.Sprite 
	{
		maxHealth: number;
		currentHealth: number;
		group: Phaser.Group;
		health_top: Phaser.Sprite;
		health_bottom: Phaser.Sprite;
		health_slots: HealthSprite[];
		target: Player;
		constructor(game: Phaser.Game, x: number, y: number, target: Player, key?: any, frame?: any)
		{
			super(game, x, y, key, frame);
			this.target = target;
			this.health_slots = [];
			this.group = game.add.group();
			//this.health_top = this.game.add.sprite(x, y, 'health_ui', 'health_top');
			this.health_top = this.game.add.sprite(x, y, 'health_top');
			this.group.add(this.health_top);
			var stop = (this.target.maxHealth == null ? 25 : this.target.maxHealth);
			y += this.health_top.height;
			for (var i = 0; i < stop; ++i)
			{
				//var health_item = this.game.add.sprite(x, y, 'health_ui', 'health_piece_full');
				//var health_item = this.game.add.sprite(x, y, 'health_piece_full');
				var health_item = new HealthSprite(this.game, x, y);
				//this.health_slots.push(health_item);
				this.group.add(health_item);
				y += health_item.height;
			}
			//this.health_bottom = this.game.add.sprite(x, y, 'health_ui', 'health_bottom');
			this.health_bottom = this.game.add.sprite(x, y, 'health_bottom');
			this.group.add(this.health_bottom);
			this.group.fixedToCamera = true;
		}

		update()
		{
			if (this.currentHealth !== this.target.health)
			{
				this.updateHealthBar();
			}
		}

		updateHealthBar()
		{
			this.currentHealth = this.target.health;
			var i = (this.group.children.length - 2);
			for (i; i > 1; --i)
			{
				var item = this.group.children[i] as HealthSprite;
				item.SetFilled((i + 1) < this.currentHealth);
			}
		}
	}
}