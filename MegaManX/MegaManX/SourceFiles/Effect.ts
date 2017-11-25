module MegaManX 
{
	export class EffectLibrary
	{
		private static _instance: EffectLibrary;
		private constructor()
		{
			this.AnimationLibrary = new Map<string, AnimationArguments>();
		}
		public static get Instance()
		{
			return this._instance || (this._instance = new this());
		}

		private game: Phaser.Game;
		public Init(game: Phaser.Game)
		{
			this.game = game;
		}
		private AnimationLibrary: Map<string, AnimationArguments>;
		public AddEffect(effectName: string, animationArguments: AnimationArguments)
		{
			this.AnimationLibrary.set(effectName, animationArguments);
		}
		public CreateEffect(x: number, y: number, effectName: string)
		{
			var animationArgument = this.AnimationLibrary.get(effectName);
			return new Effect(this.game, x, y, animationArgument);
		}
	}
	export class Effect extends Phaser.Sprite 
	{
		animation: Phaser.Animation;
		constructor(game: Phaser.Game, x: number, y: number, animationArguments: AnimationArguments)
		{
			super(game, x, y, animationArguments.spriteKey);
			this.anchor.setTo(0.5, 0.5);
			this.animation = animationArguments.addToAnimationManager(this.animations);
			this.game.add.existing(this);
		}

		public Play()
		{
			this.animation.onComplete.add(this.OnDonePlaying, this);
			this.animation.play();
		}

		OnDonePlaying()
		{
			this.destroy();
		}
	}
}