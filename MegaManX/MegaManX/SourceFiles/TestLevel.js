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

            for (var x = 1; x < 11; x++) {
                var tile = this.tiles.create(0, 0 + (x * 32), 'genericTile');
                tile.bounds.height = tile.bounds.width = 32;
                tile.body.immovable = true;
                tile.body.collideWorldBounds = false;
                tile.body.allowCollision.none = true;
                tile.body.rotation = 90;
            }

            this.player = new MegaManX.Player(this.game, 64, 0);

            this.camera.follow(this.player);
            this.player.teleportToGround();

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
            this.game.debug.renderText('Wall sliding: ' + (this.player.wallSliding ? 'Yes' : 'No'), 32, 400);
            this.game.debug.renderText('Teleporting: ' + (this.player.teleporting ? 'Yes' : 'No'), 32, 416);
            this.game.debug.renderText('Player Gravity: ' + this.player.body.gravity.toString(), 32, 432);

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
//# sourceMappingURL=TestLevel.js.map
