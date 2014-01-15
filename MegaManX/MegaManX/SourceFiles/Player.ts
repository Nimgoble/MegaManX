module MegaManX 
{
    export class Player extends Phaser.Sprite
    {
        currentAnimation: Phaser.Animation;
        nextAnimation: Phaser.Animation;
        frameVelocityX: number;
        frameVelocityY: number;
        onGround: boolean;
        canJump: boolean;
        jumped: boolean;

        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'megamanx', 0);

            this.currentAnimation = this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 3, '', 4), 1, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 15, true);
            this.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 15, true);
            this.animations.add('jumpStart', Phaser.Animation.generateFrameNames('jump', 1, 3, '', 4), 15, false);
            this.animations.add('jumpInAir', Phaser.Animation.generateFrameNames('jump', 4, 4, '', 4), 15, false);
            this.animations.add('jumpFinish', Phaser.Animation.generateFrameNames('jump', 5, 7, '', 4), 15, false);
            this.anchor.setTo(0.5, 0.5);

            this.body.collideWorldBounds = true;
            //this.body.gravity.x = 0;
            this.body.gravity.y = 5;
            this.body.allowGravity = true;
            this.body.allowCollision.any = true;
            this.body.setSize(32, 32, 0, 0);
            this.body.bounce.setTo(0, 0);

            this.canJump = true;
            this.onGround = false;
            this.jumped = false;

            game.add.existing(this);
        }

        create()
        {
            this.currentAnimation = this.animations.play('idle');
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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump)
            {
                this.body.y -= 1;
                this.body.velocity.y = -150;
                this.canJump = false;
                this.jumped = true;
            }

            this.frameVelocityX = this.body.velocity.x;
            this.frameVelocityY = this.body.velocity.y;
        }

        collisionCallback(obj1: Phaser.Sprite, obj2: Phaser.Sprite)
        {
            if (obj1 === this)
            {
                if(obj1.body.touching.down)
                    this.onGround = true;

                this.canJump = true;
                this.jumped = false;
            }
        }

        updateCurrentAnimation()
        {
            if (this.currentAnimation === undefined)
                return;

            //console.log('current animation is not null: ' + this.currentAnimation.name);
            this.nextAnimation = this.currentAnimation;

            //Display appropriate animation
            if (this.body.velocity.y !== 0 || this.jumped === true)
            {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                //this.nextAnimation = 'jump';

                //If we've jumped and our jump animation is done playing and we're falling
                //Play the in-air animation
                if (this.currentAnimation.name == 'jumpStart' &&
                    this.currentAnimation.isFinished &&
                    this.body.velocity.y >= 0)
                {
                    this.nextAnimation = this.animations.getAnimation('jumpInAir');
                }
                else if (this.body.velocity.y < 0 && this.currentAnimation.name !== 'jumpStart')
                {
                    //if we're going up and our animation isn't jump and we jumped
                    this.nextAnimation = this.animations.getAnimation('jumpStart');
                }
                else
                {
                    //Regular falling animation goes here.
                }
            }
            else if (this.body.velocity.x !== 0 && this.jumped === false)
            {
                //Wait until our jumpFinish animation is done to move.
                if (this.currentAnimation.name !== 'jumpFinish' ||
                    (this.currentAnimation.name === 'jumpFinish' && this.currentAnimation.isFinished))
                {
                    if (this.body.velocity.x > 0)
                    {
                        //this.animations.play('run');
                        this.nextAnimation = this.animations.getAnimation('run');
                    }
                    else if (this.body.velocity.x < 0)
                    {
                        //this.animations.play('run');
                        this.nextAnimation = this.animations.getAnimation('run');
                    }
                }
            }
            else
            {
                //We should be idling.
                this.nextAnimation = this.animations.getAnimation('idle');
            }

            //If we JUST got done jumping/falling: play the jumpFinish animation
            if (this.body.velocity.y === 0 && this.body.deltaY() > 0)
            {
                this.nextAnimation = this.animations.getAnimation('jumpFinish');
            }

            //Face the player in the correct direction
            if (this.body.velocity.x > 0)
            {
                if (this.scale.x === -1)
                {
                    this.scale.x = 1;
                }
            }
            else if (this.body.velocity.x < 0)
            {
                if (this.scale.x === 1)
                {
                    this.scale.x = -1;
                }
            }

            if (this.nextAnimation.name !== this.currentAnimation.name)
            {
                console.log('stopping animation: ' + this.currentAnimation.name);
                this.animations.stop(this.currentAnimation.name, true);
                console.log('attempting to play new animation: ' + this.nextAnimation.name);
                this.currentAnimation = this.animations.play(this.nextAnimation.name);
                console.log('current animation after play attempt: ' + this.currentAnimation.name);
            }
        }
    }
}