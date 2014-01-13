module MegaManX
{
    export class MainMenu extends Phaser.State
    {
        background: Phaser.Sprite;
        //logo: Phaser.Sprite;
        btnStartGame: Phaser.Button;
        testSprite: Phaser.Sprite;
        nextButtonPress: number;
        create()
        {

            this.background = this.add.sprite(0, 0, 'mainmenu');
            this.background.alpha = 0;

            //this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            //this.logo.anchor.setTo(0.5, 0.5);

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.btnStartGame = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);
            this.testSprite = this.game.add.sprite(34, 263, 'megamanx');
            this.testSprite.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.testSprite.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 2, '', 4), 1, true);
            this.testSprite.animations.play('idle');
            //this.input.onDown.addOnce(this.fadeOut, this);
            //this.input.onDown.add(this.keyDown, this);
            this.nextButtonPress = this.game.time.now;
        }

        fadeOut()
        {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

            //tween.onComplete.add(this.startGame, this);
        }

        actionOnClick()
        {
            var debugme = '';
        }

        update()
        {
            if (this.nextButtonPress < this.game.time.now)
            {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) == true)
                {
                    this.testSprite.y -= 50;
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) == true)
                {
                    this.testSprite.y += 50;
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
            }
        }

        startGame()
        {
            this.game.state.start('Level1', true, false);
        }
    }
} 