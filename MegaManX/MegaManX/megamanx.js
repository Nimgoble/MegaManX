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
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -150;
            }

            this.frameVelocityX = this.body.velocity.x;
            this.frameVelocityY = this.body.velocity.y;

            this.nextAnimation = this.currentAnimation;

            //Display appropriate animation
            if (this.body.velocity.y !== 0) {
                //This isn't techically true, but it'll do for now
                //this.animations.play('jump');
                this.nextAnimation = 'jump';
            } else if (this.body.velocity.x !== 0) {
                if (this.body.velocity.x > 0) {
                    if (this.scale.x === -1) {
                        this.scale.x = 1;
                    }

                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                } else if (this.body.velocity.x < 0) {
                    if (this.scale.x === 1) {
                        this.scale.x = -1;
                    }

                    //this.animations.play('run');
                    this.nextAnimation = 'run';
                }
            } else {
                //this.animations.play('idle');
                this.nextAnimation = 'idle';
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
var MegaManX;
(function (MegaManX) {
    var TestLevel = (function (_super) {
        __extends(TestLevel, _super);
        function TestLevel() {
            _super.apply(this, arguments);
        }
        TestLevel.prototype.create = function () {
            this.tiles = this.game.add.group();
            for (var x = 0; x < 20; x++) {
                var tile = this.tiles.create((x * 32), 300, 'genericTile');
                tile.bounds.height = tile.bounds.width = 32;
                tile.body.immovable = true;
                tile.body.collideWorldBounds = true;
                tile.body.allowCollision.any = true;
                tile.body.collideWorldBounds = true;
            }

            this.player = new MegaManX.Player(this.game, 34, 263);

            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        };

        TestLevel.prototype.update = function () {
            this.game.physics.collide(this.player, this.tiles);
        };

        TestLevel.prototype.render = function () {
            this.game.debug.renderSpriteBounds(this.player, 'red');
            this.game.debug.renderSpriteInfo(this.player, 32, 32);
            this.game.debug.renderSpriteBody(this.player, 'blue');
            this.game.debug.renderSpriteCollision(this.player, 32, 160);

            //this.game.debug.renderSpriteInputInfo(this.player, 32, 320);
            this.game.debug.renderText('Current Animation: ' + this.player.currentAnimation, 32, 356);
            this.game.debug.renderText('Next Animation: ' + this.player.nextAnimation, 32, 372);

            this.game.debug.renderText('Frame Velocity X: ' + this.player.frameVelocityX.toString(), 32, 388);
            this.game.debug.renderText('Frame Velocity Y: ' + this.player.frameVelocityY.toString(), 32, 404);

            for (var i = 0; i < this.tiles.length; i++) {
                this.game.debug.renderSpriteBounds(this.tiles.getAt(i), 'purple');
                //this.game.debug.renderSpriteCollision(this.tiles.getAt(i), 32, 32);
            }

            this.game.debug.renderQuadTree(this.game.physics.quadTree);
        };
        return TestLevel;
    })(Phaser.State);
    MegaManX.TestLevel = TestLevel;
})(MegaManX || (MegaManX = {}));
window.onload = function () {
    var game = new MegaManX.Game();
};
//# sourceMappingURL=megamanx.js.map