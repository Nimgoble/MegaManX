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
		public PlayEffect(x: number, y: number, effectName: string)
		{
			var effect = this.CreateEffect(x, y, effectName);
			effect.Play();
		}
	}
	export class SoundEffectArguments
	{
		name: string;
		startTime: number;
		duration: number;
	}
	export class SoundEffectLibrary
	{
		private static _instance: SoundEffectLibrary;
		private constructor()
		{
			this.soundFXLibrary = new Map<string, SoundEffectArguments>();
		}
		public static get Instance()
		{
			return this._instance || (this._instance = new this());
		}

		private game: Phaser.Game;
		private soundFX: Phaser.Sound;
		private soundFXLibrary: Map<string, SoundEffectArguments>;
		private soundFXName: string;
		public Init(game: Phaser.Game, soundFXName: string)
		{
			this.game = game;
			this.soundFXName = soundFXName;
		}
		public AddSoundEffect(effectName: string, startTime: number, duration: number)
		{
			var args = new SoundEffectArguments();
			args.name = effectName;
			args.startTime = startTime;
			args.duration = duration;
			this.soundFXLibrary.set(effectName, args);
		}
		public PlaySoundEffect(effectName: string)
		{
			var soundFX = this.GetSoundFX();
			if (soundFX.markers !== null && !soundFX.markers[effectName])
			{
				var arg = this.soundFXLibrary.get(effectName);
				soundFX.addMarker(arg.name, arg.startTime, arg.duration);
			}
			soundFX.play(effectName);
		}

		private GetSoundFX()
		{
			if (!this.soundFX || !this.soundFX.context)
			{
				this.soundFX = this.game.add.audio(this.soundFXName);
				this.soundFX.allowMultiple = true;
			}
			return this.soundFX;
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