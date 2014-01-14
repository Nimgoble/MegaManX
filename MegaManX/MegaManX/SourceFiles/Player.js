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

            this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 2, '', 4), 1, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 15, true);
            this.animations.add('shoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 15, true);
            this.animations.add('jump', Phaser.Animation.generateFrameNames('jump', 1, 7, '', 4), 15, true);
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

            game.add.existing(this);
        }
        Player.prototype.create = function () {
            this.animations.play('idle');
            this.currentAnimation = 'idle';
        };

        Player.prototype.update = function () {
            this.body.velocity.x = 0;

            //Move left/right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
            }

            //Jump
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump) {
                this.body.y -= 1;
                this.body.velocity.y = -150;
                this.canJump = false;
            }

            this.frameVelocityX = this.body.velocity.x;
            this.frameVelocityY = this.body.velocity.y;
        };

        Player.prototype.collisionCallback = function (obj1, obj2) {
            if (obj1 === this) {
                if (obj1.body.touching.down)
                    this.onGround = true;

                this.canJump = true;
            }
        };

        Player.prototype.updateCurrentAnimation = function () {
            this.nextAnimation = this.currentAnimation;

            //Display appropriate animation
            if (this.body.velocity.y !== 0) {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                this.nextAnimation = 'jump';
            } else if (this.body.velocity.x !== 0) {
                if (this.body.velocity.x > 0) {
                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                } else if (this.body.velocity.x < 0) {
                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                }
            } else {
                //this.animations.play('idle');
                this.nextAnimation = 'idle';
            }

            //Face the player in the correct direction
            if (this.body.velocity.x > 0) {
                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            } else if (this.body.velocity.x < 0) {
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }

            if (this.nextAnimation !== this.currentAnimation)
                this.animations.stop(this.currentAnimation);

            this.animations.play(this.nextAnimation);
            this.currentAnimation = this.nextAnimation;
        };
        return Player;
    })(Phaser.Sprite);
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
//# sourceMappingURL=Player.js.map
