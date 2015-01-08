module MegaManX
{
    export class Preloader extends Phaser.State
    {
        preloadBar: Phaser.Sprite;

        preload()
        {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('mainmenu', 'Content/mainmenu.jpg');
            this.load.atlasXML('megamanx', 'Content/megamanx_base.png', 'Content/megamanx_base.xml', null);
            this.load.image('genericTile', 'Content/testTile.png');
            //this.load.spritesheet('button', 'Content/button.png', 185, 52, 3);
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');

        }

        create()
        {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu()
        {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 300;
            this.game.state.start('TestLevel', true, false);
        }
    }
} 