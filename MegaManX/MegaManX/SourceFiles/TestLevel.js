var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MegaManX;
(function (MegaManX) {
    var TestLevel = (function (_super) {
        __extends(TestLevel, _super);
        function TestLevel() {
            _super.apply(this, arguments);
        }
        TestLevel.prototype.create = function () {
            this.tiles = this.game.add.group();
            this.tiles.enableBody = true;
            this.tiles.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 20; x++) {
                var tile = this.tiles.create((x * 32), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
            }
            for (var x = 0; x < 11; x++) {
                var tile = this.tiles.create(0, 0 + (x * 32), 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.rotation = 90;
                tile.body.allowGravity = false;
            }
            //Slope?
            this.slope = this.game.add.group();
            this.slope.enableBody = true;
            this.slope.physicsBodyType = Phaser.Physics.ARCADE;
            for (var x = 0; x < 11; x++) {
                var tile = this.slope.create(32 * (11 + x), 352, 'genericTile');
                tile.body.setSize(32, 32);
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowGravity = false;
            }
            this.slope.angle = -15;
            this.player = new MegaManX.Player(this.game, 64, 0);
            this.camera.follow(this.player);
            this.player.teleportToGround();
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN]);
        };
        TestLevel.prototype.update = function () {
            //this.game.physics.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.game.physics.arcade.collide(this.player, this.tiles, this.player.collisionCallback, null, this.player);
            this.player.updateCurrentAnimation();
        };
        TestLevel.prototype.render = function () {
            this.game.debug.spriteBounds(this.player, 'red');
            this.game.debug.spriteInfo(this.player, 32, 32);
            for (var i = 0; i < this.tiles.length; i++) {
                this.game.debug.spriteBounds(this.tiles.getAt(i), 'purple');
            }
            //this.game.debug.renderQuadTree(this.game.physics.quadTree);
        };
        return TestLevel;
    })(Phaser.State);
    MegaManX.TestLevel = TestLevel;
})(MegaManX || (MegaManX = {}));
//# sourceMappingURL=TestLevel.js.map