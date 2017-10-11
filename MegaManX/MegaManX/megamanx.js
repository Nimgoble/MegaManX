var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var game = new MegaManX.Game();
};
var MegaManX;
(function (MegaManX) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'Content/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                //this.stage.scale.pageAlignHorizontally = true;
            }
            else {
                //  Same goes for mobile settings.
            }
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    MegaManX.Boot = Boot;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = 
            //TODO: Change to Phaser.AUTO
            _super.call(this, 800, 600, Phaser.CANVAS, 'content', null) || this;
            _this.state.add('Boot', MegaManX.Boot, false);
            _this.state.add('Preloader', MegaManX.Preloader, false);
            _this.state.add('MainMenu', MegaManX.MainMenu, false);
            _this.state.add('TestLevel', MegaManX.TestLevel, false);
            //this.state.add('Level1', Level1, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    MegaManX.Game = Game;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'mainmenu');
            this.background.alpha = 0;
            //this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            //this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.btnStartGame = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);
            //this.testSprite = this.game.add.sprite(34, 263, 'megamanx');
            //this.input.onDown.addOnce(this.fadeOut, this);
            //this.input.onDown.add(this.keyDown, this);
            this.nextButtonPress = this.game.time.now;
            this.testPlayer = new MegaManX.Player(this.game, 34, 263);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            //tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.actionOnClick = function () {
            var debugme = '';
        };
        MainMenu.prototype.update = function () {
            if (this.nextButtonPress < this.game.time.now) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) == true) {
                    //this.testSprite.y -= 50;
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) == true) {
                    //this.testSprite.y += 50;
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
            }
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    MegaManX.MainMenu = MainMenu;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, null, 0) || this;
            _this.anchor.setTo(0.5, 0.5);
            _this.nextShootTime = 0.0;
            _this.currentShootStanceTimeout = 0.0;
            game.physics.enable(_this, Phaser.Physics.ARCADE);
            //game.physics.enable(this, Phaser.Physics.NINJA);
            _this.body.collideWorldBounds = true;
            //this.body.gravity.x = 0;
            _this.body.gravity.y = Player.regularGravity;
            //this.body.gravity.clampY(0, 5);
            _this.body.allowGravity = true;
            //this.body.allowCollision.any = true;
            _this.body.setSize(30, 30, 0, 0);
            _this.body.bounce.setTo(0, 0);
            _this.canJump = true;
            _this.onGround = false;
            _this.jumped = false;
            _this.wallSliding = false;
            _this.teleporting = true;
            game.add.existing(_this);
            _this.animatedSprite = new MegaManX.AnimatedSprite(game, -0.5, -0.5, 'megamanx', 0);
            game.add.existing(_this.animatedSprite);
            _this.addChild(_this.animatedSprite);
            _this.animatedSprite.currentAnimation = _this.animatedSprite.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            _this.animatedSprite.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 3, '', 4), 1, true);
            _this.animatedSprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 25, true);
            _this.animatedSprite.animations.add('runShoot', Phaser.Animation.generateFrameNames('runshoot', 1, 10, '', 4), 25, true);
            _this.animatedSprite.animations.add('idleShoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 30, true);
            _this.animatedSprite.animations.add('jumpStart', Phaser.Animation.generateFrameNames('jump', 1, 3, '', 4), 30, false);
            _this.animatedSprite.animations.add('jumpInAir', Phaser.Animation.generateFrameNames('jump', 4, 4, '', 4), 15, false);
            _this.animatedSprite.animations.add('jumpFinish', Phaser.Animation.generateFrameNames('jump', 5, 7, '', 4), 30, false);
            _this.animatedSprite.animations.add('jumpStartShoot', Phaser.Animation.generateFrameNames('jumpshoot', 1, 3, '', 4), 30, false);
            _this.animatedSprite.animations.add('jumpInAirShoot', Phaser.Animation.generateFrameNames('jumpshoot', 4, 4, '', 4), 15, false);
            _this.animatedSprite.animations.add('jumpFinishShoot', Phaser.Animation.generateFrameNames('jumpshoot', 5, 7, '', 4), 30, false);
            //this.animations.add('fall', Phaser.Animation.generateFrameNames('misc', 2, 2, '', 4), 15, false);
            _this.animatedSprite.animations.add('wallSlide', Phaser.Animation.generateFrameNames('wallslide', 1, 1, '', 4), 15, false);
            _this.animatedSprite.animations.add('wallSlideShoot', Phaser.Animation.generateFrameNames('wallslideshoot', 1, 2, '', 4), 15, false);
            _this.animatedSprite.animations.add('teleportStart', Phaser.Animation.generateFrameNames('teleport', 1, 1, '', 4), 15, false);
            _this.animatedSprite.animations.add('teleportFinish', Phaser.Animation.generateFrameNames('teleport', 2, 8, '', 4), 30, false);
            return _this;
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
                this.body.velocity.y = -Player.jumpVelocty;
                //Jump away from the wall
                if (this.animatedSprite.getCurrentAnimationName() === 'wallSlide' || this.onGround === false) {
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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.canShoot()) {
                this.shoot();
            }
            if (this.animatedSprite.getCurrentAnimationName() === 'wallSlide') {
                this.body.gravity.y = Player.slidingGravity;
                //this.body.velocity.clampY(0, 25.0);
            }
            else {
                this.body.gravity.y = Player.regularGravity;
                //this.body.velocity.clampY(0, 75);
            }
            //this.frameVelocityX = this.body.velocity.x;
            //this.frameVelocityY = this.body.velocity.y;
        };
        Player.prototype.canShoot = function () {
            return this.nextShootTime <= this.game.time.totalElapsedSeconds();
        };
        Player.prototype.shoot = function () {
            //Play animation
            var currentAnimationName = this.animatedSprite.getCurrentAnimationName();
            if (this.animationHasShootCounterpart(currentAnimationName)) {
                var resetFrame = !(currentAnimationName.indexOf('jump') >= 0);
                var newAnimationName = this.animatedSprite.getCurrentAnimationName() + 'Shoot';
                this.animatedSprite.stopAnimation(null, resetFrame);
                this.animatedSprite.playAnimation(newAnimationName);
            }
            else if (this.isShootAnimation(currentAnimationName) === false)
                return;
            //Create the projectile
            var x = (this.body.x + ((this.body.width / 2) * this.scale.x));
            var y = this.body.y + (this.body.height / 2);
            var bullet = new MegaManX.Projectile(this.game, x, y, 'megamanx', 1, (750 * this.scale.x), 0);
            bullet.animations.add('default', Phaser.Animation.generateFrameNames('bullet', 1, 5, '', 4), 1, true);
            bullet.animations.play('default');
            //Update next shoot time
            this.nextShootTime = this.game.time.totalElapsedSeconds() + 0.25;
            this.currentShootStanceTimeout = this.game.time.totalElapsedSeconds() + 0.75;
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
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                //If we were wallsliding and then pressed the opposite direction, then we are no long wallsliding
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
                //If we're touching a wall and we're not on the ground and we're falling
                //Then we should be wallsliding
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
            //this.currentAnimation = this.animations.play('teleportStart');
            this.animatedSprite.playAnimation('teleportStart');
            this.body.gravity.y = Player.teleportGravity;
            //this.body.gravity.clampY(0, 150);
            //start off screen
            this.body.y = 0 - this.animatedSprite.currentAnimation.currentFrame.height;
        };
        Player.prototype.updateCurrentAnimation = function () {
            if (this.animatedSprite.currentAnimation === undefined)
                return;
            var currentAnimationName = this.animatedSprite.getCurrentAnimationName();
            var isShooting = this.isShootAnimation(currentAnimationName);
            currentAnimationName = this.getNonShootAnimation(currentAnimationName);
            if (currentAnimationName === 'teleportStart') {
                //console.log('current animation is teleportStart');
                if (this.teleporting === true) {
                    //console.log('we are teleporting. returning out of updateCurrentAnimation');
                    return;
                }
                else {
                    //console.log('we are no long teleporting. stopping teleportStart animation');
                    //this.animations.stop(this.getCurrentAnimationName(), true);
                    this.animatedSprite.stopAnimation(null, true);
                    //this.currentAnimation = this.animations.play('teleportFinish');
                    this.animatedSprite.playAnimation('teleportFinish');
                    this.body.gravity.y = Player.regularGravity;
                    return;
                }
            }
            else if (currentAnimationName === 'teleportFinish') {
                if (this.animatedSprite.currentAnimation.isFinished === false) {
                    //console.log('in teleportFinish animation. returning.');
                    return;
                }
                //else
                //console.log('teleportFinish animation is done.  continuing on.');
            }
            //console.log('current animation is not null: ' + this.getCurrentAnimationName());
            //this.animatedSprite.nextAnimation = this.animatedSprite.currentAnimation;
            var nextAnimation = currentAnimationName;
            if (this.wallSliding === true) {
                nextAnimation = 'wallSlide';
            }
            else if ((this.body.touching.down === false
                && currentAnimationName === 'run'
                && this.body.deltaY() > 1.0)
                || this.jumped === true) {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                //this.nextAnimation = 'jump';
                //If we've jumped and our jump animation is done playing and we're falling
                //Play the in-air animation
                if (currentAnimationName === 'jumpStart' &&
                    this.animatedSprite.currentAnimation.isFinished &&
                    this.body.velocity.y >= 0) {
                    nextAnimation = 'jumpInAir';
                }
                else if (this.body.velocity.y < 0 && currentAnimationName === 'jumpStart') {
                    //if we're going up and our animation isn't jump and we jumped
                    nextAnimation = 'jumpStart';
                }
                else if (this.jumped === false) {
                    //Regular falling animation goes here.
                    nextAnimation = 'jumpInAir';
                }
            }
            else if (this.body.velocity.x !== 0 && this.jumped === false) {
                //Wait until our jumpFinish animation is done to move.
                if (currentAnimationName === 'jumpFinish' ||
                    (currentAnimationName === 'jumpFinish' && this.animatedSprite.currentAnimation.isFinished)) {
                    if (this.body.velocity.x > 0) {
                        //this.animations.play('run');
                        nextAnimation = 'run';
                    }
                    else if (this.body.velocity.x < 0) {
                        //this.animations.play('run');
                        nextAnimation = 'run';
                    }
                }
            }
            else {
                //We should be idling.
                nextAnimation = 'idle';
            }
            //If we JUST got done jumping/falling: play the jumpFinish animation
            if (this.body.touching.down && this.body.deltaY() > 1.0) {
                nextAnimation = 'jumpFinish';
            }
            //Face the player in the correct direction
            if (this.body.velocity.x > 0 && this.scale.x === -1) {
                this.scale.x = 1;
            }
            else if (this.body.velocity.x < 0 && this.scale.x === 1) {
                this.scale.x = -1;
            }
            nextAnimation = this.getAppropriateAnimation(nextAnimation, isShooting);
            if (nextAnimation !== currentAnimationName) {
                //console.log('stopping animation: ' + this.getCurrentAnimationName());
                this.animatedSprite.stopAnimation(null, true);
                //this.animations.stop(this.getCurrentAnimationName(), true);
                //console.log('attempting to play new animation: ' + this.nextAnimation.name);
                //this.currentAnimation = this.animations.play(this.nextAnimation.name);
                this.animatedSprite.playAnimation(nextAnimation);
                //this.body.setSize(30, 30, 0, 0);
                //console.log('current animation after play attempt: ' + this.getCurrentAnimationName());
            }
        };
        Player.prototype.getAppropriateAnimation = function (nextAnimation, isShooting) {
            if (this.isShootAnimation(nextAnimation)) {
                if (!isShooting ||
                    this.currentShootStanceTimeout <= this.game.time.totalElapsedSeconds())
                    return this.getNonShootAnimation(nextAnimation);
            }
            else {
                if (isShooting) {
                }
            }
            if (!(this.animationHasShootCounterpart(nextAnimation)) ||
                this.currentShootStanceTimeout <= this.game.time.totalElapsedSeconds())
                return nextAnimation;
            return nextAnimation + 'Shoot';
        };
        Player.prototype.animationHasShootCounterpart = function (animation) {
            return animation.indexOf('jump') >= 0 ||
                animation.indexOf('run') >= 0 ||
                animation.indexOf('wallSlide') >= 0 ||
                animation.indexOf('idle') >= 0;
        };
        Player.prototype.isShootAnimation = function (animation) {
            return animation.indexOf('Shoot') >= 0;
        };
        Player.prototype.getNonShootAnimation = function (animation) {
            return (this.isShootAnimation(animation)) ? animation.replace('Shoot', '') : animation;
        };
        return Player;
    }(Phaser.Sprite));
    Player.airMovementSpeed = 15;
    Player.landMovementSpeed = 50;
    Player.maxSpeed = 150;
    Player.regularGravity = 7.5;
    Player.slidingGravity = 0.5;
    Player.teleportGravity = 150;
    Player.jumpVelocty = 150;
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
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
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.physics.startSystem(Phaser.Physics.NINJA);
            this.game.physics.arcade.gravity.y = 300;
            this.game.state.start('TestLevel', true, false);
        };
        return Preloader;
    }(Phaser.State));
    MegaManX.Preloader = Preloader;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var TestLevel = (function (_super) {
        __extends(TestLevel, _super);
        function TestLevel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestLevel.prototype.create = function () {
            this.tiles = this.game.add.group();
            this.tiles.enableBody = true;
            this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
            //this.tiles.physicsBodyType = Phaser.Physics.NINJA;
            //Floor
            var tileSprite = this.game.add.tileSprite(0, 352, (20 * 32), 32, 'genericTile', null, this.tiles);
            tileSprite.body.immovable = true;
            tileSprite.body.collideWorldBounds = false;
            tileSprite.body.allowGravity = false;
            //Left Wall
            tileSprite = this.game.add.tileSprite(0, 0, 32, (11 * 32), 'genericTile', null, this.tiles);
            tileSprite.body.immovable = true;
            tileSprite.body.collideWorldBounds = false;
            tileSprite.body.allowGravity = false;
            tileSprite.body.rotation = 90;
            //Slope?
            this.slope = this.game.add.group();
            this.slope.enableBody = true;
            this.slope.physicsBodyType = Phaser.Physics.ARCADE;
            //this.slope.physicsBodyType = Phaser.Physics.NINJA;
            for (var x = 0; x < 11; x++) {
                var tile = this.slope.create(32 * (11 + x), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
                //this.game.physics.ninja.enableAABB(tile);
            }
            this.slope.angle = -15;
            this.player = new MegaManX.Player(this.game, 64, 0);
            this.camera.follow(this.player);
            this.player.teleportToGround();
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        };
        TestLevel.prototype.update = function () {
            //this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            //console.log("player y velocity before physics collide: " + this.player.body.velocity.y);
            //this.game.physics.arcade.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.game.physics.arcade.collide(this.tiles, this.player, this.player.collisionCallback, null, this.player);
            //this.game.physics.ninja.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            //console.log("player y velocity after physics collide: " + this.player.body.velocity.y);
            //this.game.debug.body(this.player);
            this.player.updateCurrentAnimation();
        };
        TestLevel.prototype.render = function () {
            this.game.debug.spriteBounds(this.player, 'red', false);
            //this.game.debug.spriteInfo(this.player, 32, 32);
            //this.game.debug.renderSpriteBody(this.player, 'blue');
            //this.game.debug.renderSpriteCollision(this.player, 32, 160);
            //this.game.debug.renderSpriteInputInfo(this.player, 32, 320);
            /*
            this.game.debug.renderText('Current Animation: ' + this.player.currentAnimation, 32, 356);
            this.game.debug.renderText('Next Animation: ' + this.player.nextAnimation, 32, 372);

            this.game.debug.renderText('Frame Velocity X: ' + this.player.frameVelocityX.toString(), 32, 388);
            this.game.debug.renderText('Frame Velocity Y: ' + this.player.frameVelocityY.toString(), 32, 404);
            */
            //this.game.debug.renderText('Wall sliding: ' + (this.player.wallSliding ? 'Yes' : 'No'), 32, 400);
            //this.game.debug.renderText('Teleporting: ' + (this.player.teleporting ? 'Yes' : 'No'), 32, 416);
            //this.game.debug.renderText('Player Gravity: ' + this.player.body.gravity.toString(), 32, 432);
            this.game.debug.bodyInfo(this.player, 32, 32);
            for (var i = 0; i < this.tiles.length; i++) {
                this.game.debug.spriteBounds(this.tiles.getAt(i), 'purple', false);
                //this.game.debug.spriteCollision(this.tiles.getAt(i), 32, 32);
            }
            this.game.debug.text('Current Animation: ' + this.player.animatedSprite.getCurrentAnimationName(), 32, 128);
            this.game.debug.text('onFloor: ' + this.player.body.onFloor(), 32, 160);
            this.game.debug.text('body.touching.down: ' + this.player.body.touching.down, 32, 192);
            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        };
        return TestLevel;
    }(Phaser.State));
    MegaManX.TestLevel = TestLevel;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var AnimatedSprite = (function (_super) {
        __extends(AnimatedSprite, _super);
        function AnimatedSprite(game, x, y, key, frame) {
            var _this = _super.call(this, game, x, y, key, frame) || this;
            _this.anchor.setTo(0.5, 0.5);
            if (_this.body !== null) {
                _this.body.collideWorldBounds = false;
                //this.body.gravity.x = 0;
                _this.body.gravity.y = 0;
                //this.body.gravity.clampY(0, 5);
                _this.body.allowGravity = false;
                //this.body.allowCollision.any = true;
                _this.body.setSize(30, 30, 0, 0);
                _this.body.bounce.setTo(0, 0);
            }
            return _this;
        }
        AnimatedSprite.prototype.playAnimation = function (animation) {
            this.currentAnimation = this.animations.play(animation);
        };
        AnimatedSprite.prototype.stopAnimation = function (animation, resetFrame) {
            if (animation === null && this.currentAnimation !== null)
                animation = this.currentAnimation.name;
            this.animations.stop(animation, resetFrame);
        };
        AnimatedSprite.prototype.getCurrentAnimationName = function () {
            return (this.currentAnimation === null || this.currentAnimation === undefined) ? '' : this.currentAnimation.name;
        };
        return AnimatedSprite;
    }(Phaser.Sprite));
    MegaManX.AnimatedSprite = AnimatedSprite;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Projectile = (function (_super) {
        __extends(Projectile, _super);
        function Projectile(game, x, y, key, frame, xVelocity, yVelocity) {
            var _this = _super.call(this, game, x, y, key, frame) || this;
            game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.checkWorldBounds = true;
            _this.events.onOutOfBounds.add(_this.onOutOfBounds, _this);
            if (xVelocity !== null)
                _this.body.velocity.x = xVelocity;
            if (yVelocity !== null)
                _this.body.velocity.y = yVelocity;
            _this.body.allowGravity = false;
            game.add.existing(_this);
            return _this;
        }
        Projectile.prototype.onOutOfBounds = function (context) {
            context.destroy();
        };
        return Projectile;
    }(Phaser.Sprite));
    MegaManX.Projectile = Projectile;
})(MegaManX || (MegaManX = {}));
//# sourceMappingURL=megamanx.js.map