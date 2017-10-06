var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.btnStartGame = this.game.add.button(this.game.world.centerX - 95, 400, 'button', this.actionOnClick, this, 2, 1, 0);
            this.nextButtonPress = this.game.time.now;
            this.testPlayer = new MegaManX.Player(this.game, 34, 263);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        };
        MainMenu.prototype.actionOnClick = function () {
            var debugme = '';
        };
        MainMenu.prototype.update = function () {
            if (this.nextButtonPress < this.game.time.now) {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) == true) {
                    this.nextButtonPress = this.game.time.now + 1.5;
                }
                else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) == true) {
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
