var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.animations.add('wallSlide', Phaser.Animation.generateFrameNames('wallslide', 1, 1, '', 4), 15, false);
            this.animations.add('teleportStart', Phaser.Animation.generateFrameNames('teleport', 1, 1, '', 4), 15, false);
            this.animations.add('teleportFinish', Phaser.Animation.generateFrameNames('teleport', 2, 8, '', 4), 30, false);
            this.anchor.setTo(0.5, 0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            this.body.gravity.y = Player.regularGravity;
            this.body.allowGravity = true;
            this.body.setSize(30, 30, 0, 0);
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
            if (this.teleporting === true)
                return;
            this.checkMovement();
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump) {
                this.body.y -= 1;
                this.body.velocity.y = -Player.jumpVelocty;
                if (this.currentAnimation.name === 'wallSlide' || this.onGround === false) {
                    console.log('jump while sliding');
                    this.body.velocity.x = (Player.jumpVelocty * -(this.scale.x));
                    this.wallSliding = false;
                }
                else
                    console.log('jump while not sliding');
                this.canJump = false;
                this.jumped = true;
                this.onGround = false;
            }
            if (this.currentAnimation.name === 'wallSlide') {
                this.body.gravity.y = Player.slidingGravity;
            }
            else {
                this.body.gravity.y = Player.regularGravity;
            }
        };
        Player.prototype.checkMovement = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.scale.x === 1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;
                if (this.body.velocity.x > -Player.maxSpeed) {
                    if (this.onGround === true)
                        this.body.velocity.x -= (this.body.velocity.x - Player.landMovementSpeed < -Player.maxSpeed) ? (-Player.maxSpeed - this.body.velocity.x) : Player.landMovementSpeed;
                    else
                        this.body.velocity.x -= (this.body.velocity.x - Player.airMovementSpeed < -Player.maxSpeed) ? (-Player.maxSpeed - this.body.velocity.x) : Player.airMovementSpeed;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.scale.x === -1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;
                if (this.body.velocity.x < Player.maxSpeed) {
                    if (this.onGround === true)
                        this.body.velocity.x += (this.body.velocity.x + Player.landMovementSpeed > Player.maxSpeed) ? (Player.maxSpeed - this.body.velocity.x) : Player.landMovementSpeed;
                    else
                        this.body.velocity.x += (this.body.velocity.x + Player.airMovementSpeed > Player.maxSpeed) ? (Player.maxSpeed - this.body.velocity.x) : Player.airMovementSpeed;
                }
            }
            else {
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
                if ((this.body.touching.left || this.body.touching.right) &&
                    this.onGround === false &&
                    this.body.velocity.y > 0)
                    this.wallSliding = true;
                else
                    this.wallSliding = false;
            }
        };
        Player.prototype.teleportToGround = function () {
            this.teleporting = true;
            this.currentAnimation = this.animations.play('teleportStart');
            this.body.gravity.y = Player.teleportGravity;
            this.body.y = 0 - this.currentAnimation.currentFrame.height;
        };
        Player.prototype.updateCurrentAnimation = function () {
            if (this.currentAnimation === undefined)
                return;
            if (this.currentAnimation.name === 'teleportStart') {
                if (this.teleporting === true) {
                    return;
                }
                else {
                    this.animations.stop(this.currentAnimation.name, true);
                    this.currentAnimation = this.animations.play('teleportFinish');
                    this.body.gravity.y = Player.regularGravity;
                    return;
                }
            }
            else if (this.currentAnimation.name === 'teleportFinish') {
                if (this.currentAnimation.isFinished === false) {
                    return;
                }
            }
            this.nextAnimation = this.currentAnimation;
            if (this.wallSliding === true) {
                this.nextAnimation = this.animations.getAnimation('wallSlide');
            }
            else if (this.body.onFloor() === false || this.jumped === true) {
                if (this.currentAnimation.name == 'jumpStart' &&
                    this.currentAnimation.isFinished &&
                    this.body.velocity.y >= 0) {
                    this.nextAnimation = this.animations.getAnimation('jumpInAir');
                }
                else if (this.body.velocity.y < 0 && this.currentAnimation.name !== 'jumpStart') {
                    this.nextAnimation = this.animations.getAnimation('jumpStart');
                }
                else if (this.jumped === false) {
                    this.nextAnimation = this.animations.getAnimation('jumpInAir');
                }
            }
            else if (this.body.velocity.x !== 0 && this.jumped === false) {
                if (this.currentAnimation.name !== 'jumpFinish' ||
                    (this.currentAnimation.name === 'jumpFinish' && this.currentAnimation.isFinished)) {
                    if (this.body.velocity.x > 0) {
                        this.nextAnimation = this.animations.getAnimation('run');
                    }
                    else if (this.body.velocity.x < 0) {
                        this.nextAnimation = this.animations.getAnimation('run');
                    }
                }
            }
            else {
                this.nextAnimation = this.animations.getAnimation('idle');
            }
            if (this.body.onFloor() && this.body.deltaY() > 0) {
                this.nextAnimation = this.animations.getAnimation('jumpFinish');
            }
            if (this.body.velocity.x > 0 && this.scale.x === -1) {
                this.scale.x = 1;
            }
            else if (this.body.velocity.x < 0 && this.scale.x === 1) {
                this.scale.x = -1;
            }
            if (this.nextAnimation.name !== this.currentAnimation.name) {
                this.animations.stop(this.currentAnimation.name, true);
                this.currentAnimation = this.animations.play(this.nextAnimation.name);
            }
        };
        Player.airMovementSpeed = 15;
        Player.landMovementSpeed = 50;
        Player.maxSpeed = 150;
        Player.regularGravity = 7.5;
        Player.slidingGravity = 0.5;
        Player.teleportGravity = 150;
        Player.jumpVelocty = 150;
        return Player;
    }(Phaser.Sprite));
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
