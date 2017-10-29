module MegaManX
{
    export class Game extends Phaser.Game
	{
		projectiles: Projectile[];

        constructor()
        {
            //TODO: Change to Phaser.AUTO
            super(800, 600, Phaser.CANVAS, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('TestLevel', TestLevel, false);

            //this.state.add('Level1', Level1, false);

			this.state.start('Boot');
			this.projectiles = [];
		}

		addProjectile(projectile: Projectile)
		{
			this.projectiles.push(projectile);
		}

		removeProjectile(projectile: Projectile)
		{
			const index: number = this.projectiles.indexOf(projectile);
			if (index !== -1)
			{
				this.projectiles.splice(index, 1);
			} 
		}
    }
} 