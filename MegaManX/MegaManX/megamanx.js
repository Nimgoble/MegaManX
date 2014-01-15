var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MegaManX;
(function (MegaManX) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            //TODO: Change to Phaser.AUTO
            _super.call(this, 800, 600, Phaser.CANVAS, 'content', null);

            this.state.add('Boot', MegaManX.Boot, false);
            this.state.add('Preloader', MegaManX.Preloader, false);
            this.state.add('MainMenu', MegaManX.MainMenu, false);
            this.state.add('TestLevel', MegaManX.TestLevel, false);

            //this.state.add('Level1', Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    MegaManX.Game = Game;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
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
                this.stage.scale.pageAlignHorizontally = true;
            } else {
                //  Same goes for mobile settings.
            }

            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    MegaManX.Boot = Boot;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
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
            this.game.state.start('TestLevel', true, false);
        };
        return Preloader;
    })(Phaser.State);
    MegaManX.Preloader = Preloader;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
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
                } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) == true) {
                    //this.testSprite.y += 50;
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
            }
        };

        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    MegaManX.MainMenu = MainMenu;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'megamanx', 0);

            this.currentAnimation = this.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 3, '', 4), 1, true);
            this.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 30, true);
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
            this.body.allowGravity = true;
            this.body.allowCollision.any = true;
            this.body.setSize(32, 32, 0, 0);
            this.body.bounce.setTo(0, 0);

            this.canJump = true;
            this.onGround = false;
            this.jumped = false;
            this.wallSliding = false;
            this.teleporting = false;

            game.add.existing(this);
        }
        Player.prototype.create = function () {
            this.teleporting = true;
            this.currentAnimation = this.animations.play('teleportStart');
        };

        Player.prototype.update = function () {
            //Move left/right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                //If we were wallsliding and then pressed the opposite direction, then we are no long wallsliding
                if (this.scale.x === 1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;

                this.body.velocity.x = -150;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                //If we were wallsliding and then pressed the opposite direction, then we are no long wallsliding
                if (this.scale.x === -1 && this.wallSliding === true)
                    this.canJump = this.wallSliding = false;

                this.body.velocity.x = 150;
            } else {
                this.wallSliding = false;
                this.body.velocity.x = 0;
            }

            //Jump
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump) {
                //Move the body up a hair so we can jump
                this.body.y -= 1;

                //Jump
                this.body.velocity.y = -150;
                this.canJump = false;
                this.jumped = true;
                this.onGround = false;

                //Jump away from the wall
                if (this.wallSliding === true) {
                    this.body.velocity.x = (450 * -(this.scale.x));
                    this.wallSliding = false;
                }
            }

            if (this.wallSliding === true)
                this.body.gravity.y = 2.5;
            else
                this.body.gravity.y = 5;

            this.frameVelocityX = this.body.velocity.x;
            this.frameVelocityY = this.body.velocity.y;
        };

        Player.prototype.collisionCallback = function (obj1, obj2) {
            if (obj1 === this) {
                if (obj1.body.touching.down && this.teleporting === true) {
                    this.teleporting = false;
                }
                if (obj1.body.touching.down)
                    this.onGround = true;
                else
                    this.onGround = false;

                this.canJump = true;
                this.jumped = false;

                if ((this.body.touching.left || this.body.touching.right) && this.onGround === false)
                    this.wallSliding = true;
                else
                    this.wallSliding = false;
            }
        };

        Player.prototype.updateCurrentAnimation = function () {
            if (this.currentAnimation === undefined)
                return;

            if (this.currentAnimation.name === 'teleportStart') {
                if (this.teleporting === true)
                    return;
                else {
                    this.animations.stop(this.currentAnimation.name, true);
                    this.currentAnimation = this.animations.play('teleportFinish');
                }
            } else if (this.currentAnimation.name === 'teleportFinish') {
                if (this.currentAnimation.isFinished === false)
                    return;
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
                console.log('stopping animation: ' + this.currentAnimation.name);
                this.animations.stop(this.currentAnimation.name, true);
                console.log('attempting to play new animation: ' + this.nextAnimation.name);
                this.currentAnimation = this.animations.play(this.nextAnimation.name);
                console.log('current animation after play attempt: ' + this.currentAnimation.name);
            }
        };
        return Player;
    })(Phaser.Sprite);
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var TestLevel = (function (_super) {
        __extends(TestLevel, _super);
        function TestLevel() {
            _super.apply(this, arguments);
        }
        TestLevel.prototype.create = function () {
            this.tiles = this.game.add.group();

            //Floor
            var tile = this.tiles.create(0, 352, 'genericTile');
            tile.body.immovable = true;
            tile.body.allowCollision.up = true;
            tile.body.width = (20 * 32);

            for (var x = 1; x < 20; x++) {
                var tile = this.tiles.create((x * 32), 352, 'genericTile');
                tile.bounds.height = tile.bounds.width = 32;
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowCollision.none = true;
            }

            //Left wall
            var otherTile = this.tiles.create(0, 0, 'genericTile');
            otherTile.body.immovable = true;
            otherTile.body.allowCollision.right = true;
            otherTile.body.width = 32;
            otherTile.body.height = 332;

            for (var x = 1; x < 10; x++) {
                var tile = this.tiles.create(0, 0 + (x * 32), 'genericTile');
                tile.bounds.height = tile.bounds.width = 32;
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowCollision.none = true;
                tile.body.rotation = 90;
            }

            this.player = new MegaManX.Player(this.game, 64, 0);

            this.camera.follow(this.player);

            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        };

        TestLevel.prototype.update = function () {
            this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);

            this.player.updateCurrentAnimation();
        };

        TestLevel.prototype.render = function () {
            this.game.debug.renderSpriteBounds(this.player, 'red');
            this.game.debug.renderSpriteInfo(this.player, 32, 32);

            //this.game.debug.renderSpriteBody(this.player, 'blue');
            this.game.debug.renderSpriteCollision(this.player, 32, 160);

            //this.game.debug.renderSpriteInputInfo(this.player, 32, 320);
            /*
            this.game.debug.renderText('Current Animation: ' + this.player.currentAnimation, 32, 356);
            this.game.debug.renderText('Next Animation: ' + this.player.nextAnimation, 32, 372);
            
            this.game.debug.renderText('Frame Velocity X: ' + this.player.frameVelocityX.toString(), 32, 388);
            this.game.debug.renderText('Frame Velocity Y: ' + this.player.frameVelocityY.toString(), 32, 404);
            */
            this.game.debug.renderText('Wall sliding: ' + (this.player.wallSliding ? 'Yes' : 'No'), 32, 388);

            for (var i = 0; i < this.tiles.length; i++) {
                this.game.debug.renderSpriteBounds(this.tiles.getAt(i), 'purple');
                //this.game.debug.renderSpriteCollision(this.tiles.getAt(i), 32, 32);
            }
            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        };
        return TestLevel;
    })(Phaser.State);
    MegaManX.TestLevel = TestLevel;
})(MegaManX || (MegaManX = {}));
window.onload = function () {
    var game = new MegaManX.Game();
};
//# sourceMappingURL=megamanx.js.map
