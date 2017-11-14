module MegaManX 
{
	export class ProjectileDefinition
	{
		creationAnimation?: AnimationArguments;
		flyingAnimation: AnimationArguments;
		deathAnimation?: AnimationArguments;
		public constructor(flyingAnimation: AnimationArguments, creationAnimation?: AnimationArguments, deathAnimation?: AnimationArguments)
		{
			this.creationAnimation = creationAnimation;
			this.flyingAnimation = flyingAnimation;
			this.deathAnimation = deathAnimation;
		}
	}
}