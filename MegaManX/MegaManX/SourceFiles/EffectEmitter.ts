module MegaManX 
{
	export class EffectEmitter extends Phaser.Sprite
	{
		effectName: string;
		frequency: number;
		nextFireTime: number;
		enabled: boolean;
		constructor(game: Phaser.Game, x: number, y: number, effectName: string, frequency: number)
		{
			super(game, x, y);
			this.anchor.setTo(0.5, 0.5);
			this.effectName = effectName;
			this.frequency = frequency;
			this.nextFireTime = 0.0;
			this.enabled = false;
		}

		update()
		{
			if (!this.enabled)
				return;

			if (this.nextFireTime < this.game.time.totalElapsedSeconds())
				this.fire();
		}

		private fire()
		{
			var effect = EffectLibrary.Instance.CreateEffect(this.worldPosition.x, this.worldPosition.y, this.effectName);
			this.game.add.existing(effect);
			effect.Play();
			this.nextFireTime = this.game.time.totalElapsedSeconds() + this.frequency;
		}

		isEnabled() { return this.enabled; }

		start()
		{
			this.enabled = true;
		}

		stop()
		{
			this.enabled = false;
		}
	}
}