module MegaManX 
{
	export class Bunny extends BaseEnemy
	{
		nextHopTime: number;

		constructor(game: Phaser.Game, x: number, y: number)
		{
			super(game, x, y, 'bunny', null, 5, 5);
		}

		update()
		{
			if (this.nextHopTime <= this.game.time.totalElapsedSeconds())
				this.hop();
		}

		hop()
		{

		}
	}
}