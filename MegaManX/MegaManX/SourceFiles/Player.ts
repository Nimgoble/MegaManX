module MegaManX 
{
    export class Player extends Phaser.Sprite
    {
        currentAnimation: string;
        nextAnimation: string;
        frameVelocityX: number;
        frameVelocityY: number;
        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'megamanx', 0);

            this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 2, '', 4), 1, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 15, true);
            this.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 15, true);
            this.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 1, 7, '', 4), 15, true);
            this.anchor.setTo(0.5, 0);

            this.body.collideWorldBounds = true;
            this.body.gravity.x = 0;
            this.body.gravity.y = 5;
            this.body.allowGravity = true;
            this.body.allowCollision.any = true;
            this.body.setSize(32, 32, 0, 0);

            game.add.existing(this);
        }

        create()
        {
            this.animations.play('idle');
            this.currentAnimation = 'idle';
        }

        update()
        {
            this.body.velocity.x = 0;

            //Move left/right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {   
                this.body.velocity.x = -150;
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.body.velocity.x = 150;
            }

            //Jump
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                this.body.velocity.y = -150;
            }

            this.frameVelocityX = this.body.velocity.x;
            this.frameVelocityY = this.body.velocity.y;

            this.nextAnimation = this.currentAnimation;

            //Display appropriate animation
            if (this.body.velocity.y !== 0)
            {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                this.nextAnimation = 'jump';
            }
            else if(this.body.velocity.x !== 0)
            {
                if (this.body.velocity.x > 0)
                {
                    if (this.scale.x === -1)
                    {
                        this.scale.x = 1;
                    }
                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                }
                else if (this.body.velocity.x < 0)
                {
                    if (this.scale.x === 1)
                    {
                        this.scale.x = -1;
                    }
                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                }
            }
            else
            {
                //this.animations.play('idle');
                this.nextAnimation = 'idle';
            }

            if (this.nextAnimation !== this.currentAnimation)
                this.animations.stop(this.currentAnimation);

            this.animations.play(this.nextAnimation);
            this.currentAnimation = this.nextAnimation;

        }
    }
}