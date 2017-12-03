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
			this.load.atlasXML('player_shoot', 'Content/shoot_sheet2.png', 'Content/shoot_sheet2.xml', null);
			this.load.atlasXML('wallEffects', 'Content/wallEffects_sheet.png', 'Content/wallEffects_sheet.xml', null);
			this.load.atlasXML('bat', 'Content/bat_sheet.png', 'Content/bat_sheet.xml', null);
			this.load.atlasXML('bunny', 'Content/bunny_sheet.png', 'Content/bunny_sheet.xml', null);
			this.load.atlasXML('explosion', 'Content/explosion_sheet.png', 'Content/explosion_sheet.xml', null);
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
			this.load.audio('shotCharge_Start', 'Content/Sounds/MMX02 - Charge Start.wav');
			this.load.audio('shotCharge_Loop', 'Content/Sounds/MMX02A - Charge Loop.wav');
			this.load.audio('shot_Medium', 'Content/Sounds/MMX03 - Charged Shot Small.wav');
			this.load.audio('shot_Large', 'Content/Sounds/MMX04 - Charged Shot Big.wav');
			this.load.audio('sfx', 'Content/Sounds/mmx_sfx.mp3');
			//this.load.audiosprite('shoot', 'Content/Sounds/mmx_sfx.mp3', 'Content/Sounds/sounds.json');

			EffectLibrary.Instance.Init(this.game);
			EffectLibrary.Instance.AddEffect('wallKick', new AnimationArguments('wallKick', ['wallEffects0001'], 15, false, null, 'wallEffects'));
			EffectLibrary.Instance.AddEffect('wallSlideSmoke', new AnimationArguments('wallSlideSmoke', Phaser.Animation.generateFrameNames('wallEffects', 2, 7, '', 4), 15, false, null, 'wallEffects'));
			EffectLibrary.Instance.AddEffect('explosion', new AnimationArguments('explosion', Phaser.Animation.generateFrameNames('explosion', 1, 8, '', 4), 15, false, null, 'explosion'));
			SoundEffectLibrary.Instance.Init(this.game, 'sfx');
			SoundEffectLibrary.Instance.AddSoundEffect('enemyKilled', 64.5, 0.5);
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
