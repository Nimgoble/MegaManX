module MegaManX
{
	export class AnimationArguments
	{
		public constructor(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean, spriteKey?: string)
		{
			this.name = name;
			this.frames = frames;
			this.frameRate = frameRate;
			this.loop = loop;
			this.useNumericIndex;
			this.spriteKey = spriteKey;
		}
		spriteKey?: string;
		name: string;
		frames?: number[] | string[];
		frameRate?: number;
		loop?: boolean;
		useNumericIndex?: boolean;

		addToAnimationManager(manager: Phaser.AnimationManager)
		{
			return manager.add(this.name, this.frames, this.frameRate, this.loop, this.useNumericIndex);
		}
	}
}