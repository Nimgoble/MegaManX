module MegaManX 
{
	export class HealthBar extends Phaser.Sprite 
	{
		maxHealth: number;
		currentHealth: number;
		group: Phaser.Group;
		health_top: Phaser.Sprite;
		health_bottom: Phaser.Sprite;
		health_slots: Phaser.Sprite[];
		constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, maxHealth?: number, currentHealth?: number)
		{
			super(game, x, y, key, frame);
			this.health_slots = [];
			//this.health_top = this.game.add.sprite(x, y, 'health_ui', 'health_top');
			this.health_top = this.game.add.sprite(x, y, 'health_top');
			var stop = (maxHealth == null ? 25 : maxHealth);
			y += this.health_top.height;
			for (var i = 0; i < stop; ++i)
			{
				//var health_item = this.game.add.sprite(x, y, 'health_ui', 'health_piece_full');
				var health_item = this.game.add.sprite(x, y, 'health_piece_full');
				this.health_slots.push(health_item);
				y += health_item.height;
			}
			//this.health_bottom = this.game.add.sprite(x, y, 'health_ui', 'health_bottom');
			this.health_bottom = this.game.add.sprite(x, y, 'health_bottom');
		}
	}
}