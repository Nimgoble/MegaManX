var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MegaManX;
(function (MegaManX) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'megamanx', 0);

            this.currentAnimation = this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 3, '', 4), 1, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 25, true);
            this.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 30, true);
            this.animations.add('jumpStart', Phaser.Animation.generateFrameNames('jump', 1, 3, '', 4), 30, false);
            this.animations.add('jumpInAir', Phaser.Animation.generateFrameNames('jump', 4, 4, '', 4), 15, false);
            this.animations.add('jumpFinish', Phaser.Animation.generateFrameNames('jump', 5, 7, '', 4), 30, false);

            //this.animations.add('fall', Phaser.Animation.generateFrameNames('misc', 2, 2, '', 4), 15, false);
            this.animations.add('wallSlide', Phaser.Animation.generateFrameNames('wallslide', 1, 1, '', 4), 15, false);
            this.animations.add('teleportStart', Phaser.Animation.generateFrameNames('teleport', 1, 1, '', 4), 15, false);
            this.animations.add('teleportFinish', Phaser.Animation.generateFrameNames('teleport', 2, 8, '', 4), 30, false);
            this.anchor.setTo(0.5, 0.5);

            this.body.collideWorldBounds = true;

            //this.body.gravity.x = 0;
            this.body.gravity.y = 5;

            //this.body.gravity.clampY(0, 5);
            this.body.allowGravity = true;
            this.body.allowCollision.any = true;
            this.body.setSize(32, 32, 0, 0);
            this.body.bounce.setTo(0, 0);

            this.canJump = true;
            this.onGround = false;
            this.jumped = false;
            this.wallSliding = false;
            this.teleporting = true;

            game.add.existing(this);
        }
        Player.prototype.create = function () {
            console.log('creating player');
        };

        Player.prototype.update = function () {
            //Don't allow input while teleporting
            if (this.teleporting === true)
                return;

            this.checkMovement();

            //Jump
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump) {
                //Move the body up a hair so we can jump
                this.body.y -= 1;

                //Jump
                //this.body.gravity.clampY(-150, 0);
                this.body.velocity.y = -150;

                //Jump away from the wall
                if (this.currentAnimation.name === 'wallSlide' || this.onGround === false) {
                    console.log('jump while sliding');
                    this.body.velocity.x = (150 * -(this.scale.x));
                    this.wallSliding = false;
                } else
                    console.log('jump while not sliding');

                this.canJump = false;
                this.jumped = true;
                this.onGround = false;
            }

            if (this.currentAnimation.name === 'wallSlide') {
                this.body.gravity.y = 0.5;
                //this.body.velocity.clampY(0, 25.0);
            } else {
                this.body.gravity.y = 5;
                //this.body.velocity.clampY(0, 75);
            }
            //this.frameVelocityX = this.body.velocity.x;
            //this.frameVelocityY = this.body.velocity.y;
        };

        Player.prototype.checkMovement = function () {
            //Move left/right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                //If we were wallsliding and then pressed the opposite direction, then we are no long wallsliding
                if (this.scale.x === 1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;

                if (this.body.velocity.x > -Player.maxSpeed) {
                    if (this.onGround === true)
                        this.body.velocity.x -= (this.body.velocity.x - Player.landMovementSpeed < -Player.maxSpeed) ? (-Player.maxSpeed - this.body.velocity.x) : Player.landMovementSpeed;
                    else
                        this.body.velocity.x -= (this.body.velocity.x - Player.airMovementSpeed < -Player.maxSpeed) ? (-Player.maxSpeed - this.body.velocity.x) : Player.airMovementSpeed;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                //If we were wallsliding and then pressed the opposite direction, then we are no long wallsliding
                if (this.scale.x === -1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;

                if (this.body.velocity.x < 150) {
                    if (this.onGround === true)
                        this.body.velocity.x += (this.body.velocity.x + Player.landMovementSpeed > Player.maxSpeed) ? (Player.maxSpeed - this.body.velocity.x) : Player.landMovementSpeed;
                    else
                        this.body.velocity.x += (this.body.velocity.x + Player.airMovementSpeed > Player.maxSpeed) ? (Player.maxSpeed - this.body.velocity.x) : Player.airMovementSpeed;
                }
            } else {
                this.wallSliding = false;
                this.body.velocity.x = 0;
            }
        };

        Player.prototype.collisionCallback = function (obj1, obj2) {
            if (obj1 === this) {
                if (obj1.body.touching.down && this.teleporting === true)
                    this.teleporting = false;

                if (obj1.body.touching.down)
                    this.onGround = true;
                else
                    this.onGround = false;

                this.canJump = true;
                this.jumped = false;

                //If we're touching a wall and we're not on the ground and we're falling
                //Then we should be wallsliding
                if ((this.body.touching.left || this.body.touching.right) && this.onGround === false && this.body.velocity.y > 0)
                    this.wallSliding = true;
                else
                    this.wallSliding = false;
            }
        };

        Player.prototype.teleportToGround = function () {
            this.teleporting = true;
            this.currentAnimation = this.animations.play('teleportStart');
            this.body.gravity.y = 150;

            //this.body.gravity.clampY(0, 150);
            //start off screen
            this.body.y = 0 - this.currentAnimation.currentFrame.height;
        };

        Player.prototype.updateCurrentAnimation = function () {
            if (this.currentAnimation === undefined)
                return;

            if (this.currentAnimation.name === 'teleportStart') {
                //console.log('current animation is teleportStart');
                if (this.teleporting === true) {
                    //console.log('we are teleporting. returning out of updateCurrentAnimation');
                    return;
                } else {
                    //console.log('we are no long teleporting. stopping teleportStart animation');
                    this.animations.stop(this.currentAnimation.name, true);
                    this.currentAnimation = this.animations.play('teleportFinish');
                    this.body.gravity.y = 5;

                    return;
                }
            } else if (this.currentAnimation.name === 'teleportFinish') {
                if (this.currentAnimation.isFinished === false) {
                    //console.log('in teleportFinish animation. returning.');
                    return;
                }
                //else
                //console.log('teleportFinish animation is done.  continuing on.');
            }

            //console.log('current animation is not null: ' + this.currentAnimation.name);
            this.nextAnimation = this.currentAnimation;

            if (this.wallSliding === true) {
                this.nextAnimation = this.animations.getAnimation('wallSlide');
            } else if (this.body.velocity.y !== 0 || this.jumped === true) {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                //this.nextAnimation = 'jump';
                //If we've jumped and our jump animation is done playing and we're falling
                //Play the in-air animation
                if (this.currentAnimation.name == 'jumpStart' && this.currentAnimation.isFinished && this.body.velocity.y >= 0) {
                    this.nextAnimation = this.animations.getAnimation('jumpInAir');
                } else if (this.body.velocity.y < 0 && this.currentAnimation.name !== 'jumpStart') {
                    //if we're going up and our animation isn't jump and we jumped
                    this.nextAnimation = this.animations.getAnimation('jumpStart');
                } else if (this.jumped === false) {
                    //Regular falling animation goes here.
                    this.nextAnimation = this.animations.getAnimation('jumpInAir');
                }
            } else if (this.body.velocity.x !== 0 && this.jumped === false) {
                //Wait until our jumpFinish animation is done to move.
                if (this.currentAnimation.name !== 'jumpFinish' || (this.currentAnimation.name === 'jumpFinish' && this.currentAnimation.isFinished)) {
                    if (this.body.velocity.x > 0) {
                        //this.animations.play('run');
                        this.nextAnimation = this.animations.getAnimation('run');
                    } else if (this.body.velocity.x < 0) {
                        //this.animations.play('run');
                        this.nextAnimation = this.animations.getAnimation('run');
                    }
                }
            } else {
                //We should be idling.
                this.nextAnimation = this.animations.getAnimation('idle');
            }

            //If we JUST got done jumping/falling: play the jumpFinish animation
            if (this.body.velocity.y === 0 && this.body.deltaY() > 0) {
                this.nextAnimation = this.animations.getAnimation('jumpFinish');
            }

            //Face the player in the correct direction
            if (this.body.velocity.x > 0 && this.scale.x === -1) {
                this.scale.x = 1;
            } else if (this.body.velocity.x < 0 && this.scale.x === 1) {
                this.scale.x = -1;
            }

            if (this.nextAnimation.name !== this.currentAnimation.name) {
                //console.log('stopping animation: ' + this.currentAnimation.name);
                this.animations.stop(this.currentAnimation.name, true);

                //console.log('attempting to play new animation: ' + this.nextAnimation.name);
                this.currentAnimation = this.animations.play(this.nextAnimation.name);
                //console.log('current animation after play attempt: ' + this.currentAnimation.name);
            }
        };
        Player.airMovementSpeed = 15;
        Player.landMovementSpeed = 50;
        Player.maxSpeed = 150;
        return Player;
    })(Phaser.Sprite);
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
//# sourceMappingURL=Player.js.map
