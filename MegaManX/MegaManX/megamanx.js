window.onload = () => {
    var game = new MegaManX.Game();
};
var MegaManX;
(function (MegaManX) {
    class AnimatedSprite extends Phaser.Sprite {
        constructor(game, x, y, key, frame) {
            super(game, x, y, key, frame);
            this.anchor.setTo(0.5, 0.5);
            if (this.body !== null) {
                this.body.collideWorldBounds = false;
                //this.body.gravity.x = 0;
                this.body.gravity.y = 0;
                //this.body.gravity.clampY(0, 5);
                this.body.allowGravity = false;
                //this.body.allowCollision.any = true;
                this.body.setSize(30, 30, 0, 0);
                this.body.bounce.setTo(0, 0);
            }
        }
        playAnimation(animation) {
            this.currentAnimation = this.animations.play(animation);
        }
        stopAnimation(animation, resetFrame) {
            if (animation === null && this.currentAnimation !== null)
                animation = this.currentAnimation.name;
            this.animations.stop(animation, resetFrame);
        }
        getCurrentAnimationName() {
            return (this.currentAnimation === null || this.currentAnimation === undefined) ? '' : this.currentAnimation.name;
        }
    }
    MegaManX.AnimatedSprite = AnimatedSprite;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar', 'Content/loader.png');
        }
        create() {
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
        }
    }
    MegaManX.Boot = Boot;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class Game extends Phaser.Game {
        constructor() {
            //TODO: Change to Phaser.AUTO
            super(800, 600, Phaser.CANVAS, 'content', null);
            this.state.add('Boot', MegaManX.Boot, false);
            this.state.add('Preloader', MegaManX.Preloader, false);
            this.state.add('MainMenu', MegaManX.MainMenu, false);
            this.state.add('TestLevel', MegaManX.TestLevel, false);
            //this.state.add('Level1', Level1, false);
            this.state.start('Boot');
            this.projectiles = [];
        }
        addProjectile(projectile) {
            this.projectiles.push(projectile);
        }
        removeProjectile(projectile) {
            const index = this.projectiles.indexOf(projectile);
            if (index !== -1) {
                this.projectiles.splice(index, 1);
            }
        }
    }
    MegaManX.Game = Game;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class HealthBar extends Phaser.Sprite {
        constructor(game, x, y, key, frame, maxHealth, currentHealth) {
            super(game, x, y, key, frame);
            this.health_slots = [];
            this.group = game.add.group();
            //this.health_top = this.game.add.sprite(x, y, 'health_ui', 'health_top');
            this.health_top = this.game.add.sprite(x, y, 'health_top');
            this.group.add(this.health_top);
            var stop = (maxHealth == null ? 25 : maxHealth);
            y += this.health_top.height;
            for (var i = 0; i < stop; ++i) {
                //var health_item = this.game.add.sprite(x, y, 'health_ui', 'health_piece_full');
                var health_item = this.game.add.sprite(x, y, 'health_piece_full');
                //this.health_slots.push(health_item);
                this.group.add(health_item);
                y += health_item.height;
            }
            //this.health_bottom = this.game.add.sprite(x, y, 'health_ui', 'health_bottom');
            this.health_bottom = this.game.add.sprite(x, y, 'health_bottom');
            this.group.add(this.health_bottom);
            this.group.fixedToCamera = true;
        }
    }
    MegaManX.HealthBar = HealthBar;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class MainMenu extends Phaser.State {
        create() {
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
        }
        fadeOut() {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            //tween.onComplete.add(this.startGame, this);
        }
        actionOnClick() {
            var debugme = '';
        }
        update() {
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
        }
        startGame() {
            this.game.state.start('Level1', true, false);
        }
    }
    MegaManX.MainMenu = MainMenu;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    var ShootTypes;
    (function (ShootTypes) {
        ShootTypes[ShootTypes["Regular"] = 0] = "Regular";
        ShootTypes[ShootTypes["Medium"] = 1] = "Medium";
        ShootTypes[ShootTypes["Large"] = 2] = "Large";
    })(ShootTypes || (ShootTypes = {}));
    class Player extends Phaser.Sprite {
        constructor(game, x, y) {
            super(game, x, y, null, 0);
            this.anchor.setTo(0.5, 0.5);
            this.chargeStartTime = 0.0;
            this.currentShootStanceTimeout = 0.0;
            this.lastChargeShotCallbackTime = 0.0;
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.shootSounds = new Array(3);
            this.shootSounds[ShootTypes.Regular] = game.add.audio('shoot');
            this.shootSounds[ShootTypes.Regular].allowMultiple = true;
            this.shootSounds[ShootTypes.Medium] = game.add.audio('shot_Medium');
            this.shootSounds[ShootTypes.Medium].allowMultiple = true;
            this.shootSounds[ShootTypes.Large] = game.add.audio('shot_Large');
            this.shootSounds[ShootTypes.Large].allowMultiple = true;
            this.projectileDefinitions = new Array(3);
            this.projectileDefinitions[ShootTypes.Regular] = new MegaManX.ProjectileDefinition(new MegaManX.AnimationArguments('default', Phaser.Animation.generateFrameNames('bullet', 1, 1, '', 4), 1, true), null, new MegaManX.AnimationArguments('death', Phaser.Animation.generateFrameNames('bullet', 2, 3, '', 4), 30, false));
            this.projectileDefinitions[ShootTypes.Medium] = new MegaManX.ProjectileDefinition(new MegaManX.AnimationArguments('default', Phaser.Animation.generateFrameNames('medium', 5, 6, '', 4), 2, true), new MegaManX.AnimationArguments('creation', Phaser.Animation.generateFrameNames('medium', 1, 4, '', 4), 15, false), new MegaManX.AnimationArguments('death', Phaser.Animation.generateFrameNames('medium', 8, 12, '', 4), 15, false));
            this.projectileDefinitions[ShootTypes.Large] = new MegaManX.ProjectileDefinition(new MegaManX.AnimationArguments('default', Phaser.Animation.generateFrameNames('large', 4, 4, '', 4), 1, true), new MegaManX.AnimationArguments('creation', Phaser.Animation.generateFrameNames('large', 1, 3, '', 4), 15, false), new MegaManX.AnimationArguments('death', Phaser.Animation.generateFrameNames('large', 6, 10, '', 4), 15, false));
            this.chargeStartSound = game.add.audio('shotCharge_Start');
            this.chargeLoopSound = game.add.audio('shotCharge_Loop');
            this.chargeLoopSound.loop = true;
            //this.shootSound.addMarker('shoot', 0.75, 1.0);
            //game.physics.enable(this, Phaser.Physics.NINJA);
            this.body.collideWorldBounds = false;
            //this.body.gravity.x = 0;
            this.body.gravity.y = Player.regularGravity;
            //this.body.gravity.clampY(0, 5);
            this.body.allowGravity = true;
            //this.body.allowCollision.any = true;
            this.body.setSize(30, 30, 0, 0);
            this.body.bounce.setTo(0, 0);
            this.canJump = true;
            this.onGround = false;
            this.jumped = false;
            this.wallSliding = false;
            this.teleporting = true;
            this.shootReleased = true;
            this.shotCharge = 0;
            this.hasShot = false;
            game.add.existing(this);
            this.animatedSprite = new MegaManX.AnimatedSprite(game, -0.5, -0.5, 'megamanx', 0);
            game.add.existing(this.animatedSprite);
            this.addChild(this.animatedSprite);
            this.animatedSprite.currentAnimation = this.animatedSprite.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 1, 1, '', 4), 1, true);
            this.animatedSprite.animations.add('idleBlink', Phaser.Animation.generateFrameNames('idle', 2, 3, '', 4), 1, true);
            this.animatedSprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 1, 11, '', 4), 25, true);
            this.animatedSprite.animations.add('runShoot', Phaser.Animation.generateFrameNames('runshoot', 1, 10, '', 4), 25, true);
            this.animatedSprite.animations.add('idleShoot', Phaser.Animation.generateFrameNames('shoot', 1, 2, '', 4), 30, true);
            this.animatedSprite.animations.add('jumpStart', Phaser.Animation.generateFrameNames('jump', 1, 3, '', 4), 30, false);
            this.animatedSprite.animations.add('jumpInAir', Phaser.Animation.generateFrameNames('jump', 4, 4, '', 4), 15, false);
            this.animatedSprite.animations.add('jumpFinish', Phaser.Animation.generateFrameNames('jump', 5, 7, '', 4), 30, false);
            this.animatedSprite.animations.add('jumpStartShoot', Phaser.Animation.generateFrameNames('jumpshoot', 1, 3, '', 4), 30, false);
            this.animatedSprite.animations.add('jumpInAirShoot', Phaser.Animation.generateFrameNames('jumpshoot', 4, 4, '', 4), 15, false);
            this.animatedSprite.animations.add('jumpFinishShoot', Phaser.Animation.generateFrameNames('jumpshoot', 5, 7, '', 4), 30, false);
            //this.animations.add('fall', Phaser.Animation.generateFrameNames('misc', 2, 2, '', 4), 15, false);
            this.animatedSprite.animations.add('wallSlide', Phaser.Animation.generateFrameNames('wallslide', 1, 1, '', 4), 15, false);
            this.animatedSprite.animations.add('wallSlideShoot', Phaser.Animation.generateFrameNames('wallslideshoot', 1, 2, '', 4), 15, false);
            this.animatedSprite.animations.add('teleportStart', Phaser.Animation.generateFrameNames('teleport', 1, 1, '', 4), 15, false);
            this.animatedSprite.animations.add('teleportFinish', Phaser.Animation.generateFrameNames('teleport', 2, 8, '', 4), 30, false);
            this.healthBar = new MegaManX.HealthBar(game, 0, 50, null, null, 25, 10);
            game.add.existing(this.healthBar);
            this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.jumpKey.onDown.add(this.jump, this);
            this.shootKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.shootKey.onDown.add(this.tryShoot, this);
            this.shootKey.onUp.add(this.onShootReleased, this);
            this.shootKey.onHoldCallback = this.onChargingShot;
            this.shootKey.onHoldContext = this;
        }
        create() {
            console.log('creating player');
        }
        update() {
            //Don't allow input while teleporting
            if (this.teleporting === true)
                return;
            this.checkMovement();
            //Jump
            //         if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.canJump)
            //         {
            //}
            //if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.canShoot())
            //{
            //	this.shoot();
            //}
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
        }
        jump() {
            if (!this.canJump)
                return;
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
        canShoot() {
            return this.shootReleased;
            //return this.nextShootTime <= this.game.time.totalElapsedSeconds();
        }
        tryShoot() {
            if (!this.canShoot())
                return;
            this.shoot(ShootTypes.Regular);
        }
        shoot(type) {
            this.hasShot = true;
            this.shootReleased = false;
            //Play animation
            var currentAnimationName = this.animatedSprite.getCurrentAnimationName();
            var isShooting = this.isShootAnimation(currentAnimationName);
            if (!isShooting) {
                if (this.animationHasShootCounterpart(currentAnimationName)) {
                    var resetFrame = !(currentAnimationName.indexOf('jump') >= 0);
                    var newAnimationName = this.animatedSprite.getCurrentAnimationName() + 'Shoot';
                    this.animatedSprite.stopAnimation(null, resetFrame);
                    this.animatedSprite.playAnimation(newAnimationName);
                }
                else
                    return;
            }
            var direction = this.scale.x * (this.wallSliding ? -1 : 1);
            //Create the projectile
            var x = (this.body.x + ((this.body.width / 2) * direction));
            var y = (this.body.y + (this.body.height / 2) - 5);
            var projectileArguments = new MegaManX.ProjectileArguments(this.projectileDefinitions[type], (750 * direction), 0);
            projectileArguments.xScale = direction;
            var bullet = new MegaManX.Projectile(this.game, x, y, projectileArguments, 'player_shoot');
            var convertedGame = this.game.addProjectile(bullet);
            //bullet.animations.add('default', Phaser.Animation.generateFrameNames('bullet', 1, 1, '', 4), 1, false);
            //bullet.animations.add('death', Phaser.Animation.generateFrameNames('bullet', 2, 3, '', 4), 30, true);
            //bullet.deathAnimation = 'death';
            //bullet.animations.play('default');
            bullet.initProjectile();
            this.playShootSound(type);
            //Update next shoot time
            this.chargeStartTime = this.game.time.totalElapsedSeconds() + Player.chargeDelayTime;
            this.currentShootStanceTimeout = this.game.time.totalElapsedSeconds() + Player.shootStanceTimeout;
        }
        onShootReleased() {
            this.shootReleased = true;
            this.hasShot = false;
            if (this.chargeStartSound.isPlaying)
                this.chargeStartSound.stop();
            if (this.chargeLoopSound.isPlaying)
                this.chargeLoopSound.stop();
            if (this.shotCharge > 0) {
                var type = ShootTypes.Regular;
                if (this.shotCharge > 1 && this.shotCharge < 50)
                    type = ShootTypes.Medium;
                else if (this.shotCharge >= 50)
                    type = ShootTypes.Large;
                this.shoot(type);
                this.shootReleased = true;
                this.hasShot = false;
            }
            this.shotCharge = 0;
        }
        onChargingShot() {
            if (!this.hasShot) {
                this.shoot(ShootTypes.Regular);
                return;
            }
            if (this.chargeStartTime > this.game.time.totalElapsedSeconds() || this.shootReleased)
                return;
            if (this.shotCharge <= 0 && !this.chargeStartSound.isPlaying)
                this.chargeStartSound.play();
            this.shotCharge = (this.chargeStartSound.currentTime / this.chargeStartSound.duration) / 10;
            if (!this.chargeStartSound.isPlaying && !this.chargeLoopSound.isPlaying)
                this.chargeLoopSound.play();
        }
        playShootSound(type) {
            this.shootSounds[type].play();
        }
        checkMovement() {
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
        }
        collisionCallback(obj1, obj2) {
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
        }
        teleportToGround() {
            this.teleporting = true;
            //this.currentAnimation = this.animations.play('teleportStart');
            this.animatedSprite.playAnimation('teleportStart');
            this.body.gravity.y = Player.teleportGravity;
            //this.body.gravity.clampY(0, 150);
            //start off screen
            this.body.y = 0 - this.animatedSprite.currentAnimation.currentFrame.height;
        }
        updateCurrentAnimation() {
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
                && currentAnimationName !== 'run')
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
                else if (this.body.velocity.y < 0 && currentAnimationName !== 'jumpStart') {
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
                if (currentAnimationName !== 'jumpFinish' ||
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
            if (isShooting &&
                (this.currentShootStanceTimeout <= this.game.time.totalElapsedSeconds()) &&
                (this.isShootAnimation(nextAnimation) ||
                    nextAnimation === currentAnimationName)) {
                nextAnimation = this.getNonShootAnimation(nextAnimation);
                currentAnimationName = this.animatedSprite.getCurrentAnimationName();
            }
            if (nextAnimation !== currentAnimationName) {
                nextAnimation = this.getAppropriateAnimation(nextAnimation, isShooting);
                if (nextAnimation === '') {
                    var stopHere = 1;
                    var anotherStopHere = 'We should stop here';
                    nextAnimation = 'WHYISTHISLIKETHIS?!';
                }
                //console.log('stopping animation: ' + this.getCurrentAnimationName());
                this.animatedSprite.stopAnimation(null, true);
                //this.animations.stop(this.getCurrentAnimationName(), true);
                //console.log('attempting to play new animation: ' + this.nextAnimation.name);
                //this.currentAnimation = this.animations.play(this.nextAnimation.name);
                this.animatedSprite.playAnimation(nextAnimation);
                //this.body.setSize(30, 30, 0, 0);
                //console.log('current animation after play attempt: ' + this.getCurrentAnimationName());
            }
        }
        getAppropriateAnimation(nextAnimation, isShooting) {
            if (this.isShootAnimation(nextAnimation)) {
                if (!isShooting ||
                    this.currentShootStanceTimeout <= this.game.time.totalElapsedSeconds())
                    return this.getNonShootAnimation(nextAnimation);
                else
                    return nextAnimation;
            }
            else {
                if (isShooting && this.currentShootStanceTimeout > this.game.time.totalElapsedSeconds())
                    return nextAnimation + 'Shoot';
                else
                    return nextAnimation;
            }
            //if
            //(
            //	!(this.animationHasShootCounterpart(nextAnimation)) ||
            //	this.currentShootStanceTimeout <= this.game.time.totalElapsedSeconds()
            //)
            //	return nextAnimation;
            //return nextAnimation + 'Shoot';
        }
        animationHasShootCounterpart(animation) {
            return animation.indexOf('jump') >= 0 ||
                animation.indexOf('run') >= 0 ||
                animation.indexOf('wallSlide') >= 0 ||
                animation.indexOf('idle') >= 0;
        }
        isShootAnimation(animation) {
            return animation.indexOf('Shoot') >= 0;
        }
        getNonShootAnimation(animation) {
            return (this.isShootAnimation(animation)) ? animation.replace('Shoot', '') : animation;
        }
    }
    Player.airMovementSpeed = 15;
    Player.landMovementSpeed = 50;
    Player.maxSpeed = 150;
    Player.regularGravity = 7.5;
    Player.slidingGravity = 0.5;
    Player.teleportGravity = 150;
    Player.jumpVelocty = 150;
    Player.chargeDelayTime = 0.5;
    Player.shootStanceTimeout = 0.75;
    MegaManX.Player = Player;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class Preloader extends Phaser.State {
        preload() {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('mainmenu', 'Content/mainmenu.jpg');
            this.load.atlasXML('megamanx', 'Content/megamanx_base.png', 'Content/megamanx_base.xml', null);
            this.load.atlasXML('player_shoot', 'Content/shoot_sheet2.png', 'Content/shoot_sheet2.xml', null);
            //this.healthLoader = this.load.atlasXML('health_ui', 'Content/health_sheet.png', 'Content/health_sheet.json');
            //			this.healthLoader = this.load.atlasJSONArray('health_ui', 'Content/health_sheet.png', 'Content/health_sheet.json');
            this.load.image('health_top', 'Content/health_top.png');
            this.load.image('health_bottom', 'Content/health_bottom.png');
            this.load.image('health_piece_empty', 'Content/health_piece_empty.png');
            this.load.image('health_piece_full', 'Content/health_piece_full.png');
            this.load.image('genericTile', 'Content/testTile.png');
            //this.load.spritesheet('button', 'Content/button.png', 185, 52, 3);
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');
            this.load.audio('shoot', 'Content/Sounds/MMX00 - Shoot.wav');
            this.load.audio('jumpLand1', 'Content/Sounds/MMX05 - Jump Land 1.wav');
            this.load.audio('jumpLand2', 'Content/Sounds/MMX06 - Jump Land 2.wav');
            this.load.audio('shotCharge_Start', 'Content/Sounds/MMX02 - Charge Start.wav');
            this.load.audio('shotCharge_Loop', 'Content/Sounds/MMX02A - Charge Loop.wav');
            this.load.audio('shot_Medium', 'Content/Sounds/MMX03 - Charged Shot Small.wav');
            this.load.audio('shot_Large', 'Content/Sounds/MMX04 - Charged Shot Big.wav');
            //this.load.audiosprite('shoot', 'Content/Sounds/mmx_sfx.mp3', 'Content/Sounds/sounds.json');
        }
        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }
        startMainMenu() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //this.game.physics.startSystem(Phaser.Physics.NINJA);
            this.game.physics.arcade.gravity.y = 300;
            this.game.state.start('TestLevel', true, false);
        }
    }
    MegaManX.Preloader = Preloader;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class ProjectileArguments {
        constructor(definition, xVelocity, yVelocity) {
            this.definition = definition;
            this.xVelocity = xVelocity;
            this.yVelocity = yVelocity;
        }
    }
    MegaManX.ProjectileArguments = ProjectileArguments;
    class Projectile extends Phaser.Sprite {
        constructor(game, x, y, projectileArguments, key, frame) {
            super(game, x, y, key, frame);
            this.isDying = false;
            this.isDead = false;
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.checkWorldBounds = true;
            this.events.onOutOfBounds.add(this.onOutOfBounds, this);
            if (projectileArguments.xVelocity !== null)
                this.body.velocity.x = projectileArguments.xVelocity;
            if (projectileArguments.yVelocity !== null)
                this.body.velocity.y = projectileArguments.yVelocity;
            this.body.allowGravity = false;
            this.projectileArguments = projectileArguments;
            this.scale.x = projectileArguments.xScale;
            this.flyingAnimation = this.projectileArguments.definition.flyingAnimation.addToAnimationManager(this.animations);
            if (this.projectileArguments.definition.creationAnimation !== null && this.projectileArguments.definition.creationAnimation !== undefined) {
                this.creationAnimation = this.projectileArguments.definition.creationAnimation.addToAnimationManager(this.animations);
                this.creationAnimation.onComplete.add(this.onCreationCompleted, this);
            }
            if (this.projectileArguments.definition.deathAnimation !== null && this.projectileArguments.definition.deathAnimation !== undefined) {
                this.deathAnimation = this.projectileArguments.definition.deathAnimation.addToAnimationManager(this.animations);
            }
            game.add.existing(this);
        }
        initProjectile() {
            if (this.creationAnimation !== null && this.creationAnimation !== undefined) {
                this.creationAnimation.play();
            }
            else
                this.flyingAnimation.play();
        }
        onCreationCompleted() {
            this.flyingAnimation.play();
        }
        collisionCallback(obj1, obj2) {
            if (this.isDead || this.isDying)
                return;
            this.isDying = true;
            if (this.deathAnimation !== null && this.deathAnimation !== undefined)
                this.deathAnimation.play();
            else
                this.isDead = true;
        }
        update() {
            if (this.isDying && this.animations.currentAnim !== null && this.animations.currentAnim.isFinished && !this.isDead) {
                this.isDead = true;
            }
        }
        onOutOfBounds(context) {
            context.destroy();
        }
    }
    MegaManX.Projectile = Projectile;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class TestLevel extends Phaser.State {
        create() {
            this.game.world.setBounds(0, 0, 1920, 1920);
            this.tiles = this.game.add.group();
            this.tiles.enableBody = true;
            this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
            //this.tiles.physicsBodyType = Phaser.Physics.NINJA;
            //Floor
            var tileSprite = this.game.add.tileSprite(0, 352, (50 * 32), 32, 'genericTile', null, this.tiles);
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
            this.game.camera.follow(this.player);
            this.player.teleportToGround();
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        }
        update() {
            var index = 0;
            var castedGame = this.game;
            while (index < castedGame.projectiles.length) {
                var projectile = castedGame.projectiles[index];
                if (projectile === null || projectile.isDead) {
                    projectile.destroy();
                    castedGame.removeProjectile(projectile);
                }
                else
                    index++;
            }
            //this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            //console.log("player y velocity before physics collide: " + this.player.body.velocity.y);
            //this.game.physics.arcade.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.game.physics.arcade.collide(this.tiles, this.player, this.player.collisionCallback, null, this.player);
            for (var i = 0; i < castedGame.projectiles.length; ++i) {
                var projectile = castedGame.projectiles[i];
                this.game.physics.arcade.collide(this.tiles, projectile, projectile.collisionCallback, null, projectile);
            }
            for (var i = 0; i < castedGame.projectiles.length; ++i) {
                var projectile = castedGame.projectiles[i];
                if (projectile.isDead) {
                    projectile.destroy();
                    castedGame.removeProjectile(projectile);
                }
            }
            //this.game.physics.ninja.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            //console.log("player y velocity after physics collide: " + this.player.body.velocity.y);
            //this.game.debug.body(this.player);
            this.player.updateCurrentAnimation();
        }
        render() {
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
            this.game.debug.text('shot charge: ' + this.player.shotCharge, 32, 192);
            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        }
    }
    MegaManX.TestLevel = TestLevel;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class AnimationArguments {
        constructor(name, frames, frameRate, loop, useNumericIndex) {
            this.name = name;
            this.frames = frames;
            this.frameRate = frameRate;
            this.loop = loop;
            this.useNumericIndex;
        }
        addToAnimationManager(manager) {
            return manager.add(this.name, this.frames, this.frameRate, this.loop, this.useNumericIndex);
        }
    }
    MegaManX.AnimationArguments = AnimationArguments;
})(MegaManX || (MegaManX = {}));
var MegaManX;
(function (MegaManX) {
    class ProjectileDefinition {
        constructor(flyingAnimation, creationAnimation, deathAnimation) {
            this.creationAnimation = creationAnimation;
            this.flyingAnimation = flyingAnimation;
            this.deathAnimation = deathAnimation;
        }
    }
    MegaManX.ProjectileDefinition = ProjectileDefinition;
})(MegaManX || (MegaManX = {}));
//# sourceMappingURL=megamanx.js.map