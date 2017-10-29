module MegaManX
{
    export class Preloader extends Phaser.State
    {
		preloadBar: Phaser.Sprite;
		healthLoader: Phaser.Loader;

        preload()
		{
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('mainmenu', 'Content/mainmenu.jpg');
			this.load.atlasXML('megamanx', 'Content/megamanx_base.png', 'Content/megamanx_base.xml', null);
			this.load.atlasXML('player_shoot', 'Content/shoot_sheet.png', 'Content/shoot_sheet.xml', null);
			//this.healthLoader = this.load.atlasXML('health_ui', 'Content/health_sheet.png', 'Content/health_sheet.json');
//			this.healthLoader = this.load.atlasJSONArray('health_ui', 'Content/health_sheet.png', 'Content/health_sheet.json');
			this.load.image('health_top', 'Content/health_top.png');
			this.load.image('health_bottom', 'Content/health_bottom.png');
			this.load.image('health_piece_empty', 'Content/health_piece_empty.png');
			this.load.image('health_piece_full', 'Content/health_piece_full.png');
            this.load.image('genericTile', 'Content/testTile.png');
            //this.load.spritesheet('button', 'Content/button.png', 185, 52, 3);
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
			//this.load.image('level1', 'assets/level1.png');
			this.load.audio('shoot', 'Content/Sounds/MMX00 - Shoot.wav');
			this.load.audio('jumpLand1', 'Content/Sounds/MMX05 - Jump Land 1.wav');
			this.load.audio('jumpLand2', 'Content/Sounds/MMX06 - Jump Land 2.wav');
			//this.load.audiosprite('shoot', 'Content/Sounds/mmx_sfx.mp3', 'Content/Sounds/sounds.json');
        }

        create()
        {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu()
        {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.physics.startSystem(Phaser.Physics.NINJA);
            this.game.physics.arcade.gravity.y = 300;
            this.game.state.start('TestLevel', true, false);
        }
    }
} 
