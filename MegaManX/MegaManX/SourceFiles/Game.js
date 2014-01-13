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
//# sourceMappingURL=Game.js.map
