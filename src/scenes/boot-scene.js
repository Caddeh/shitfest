"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene() {
        return _super.call(this, { key: "BootScene" }) || this;
    }
    BootScene.prototype.init = function () {
    };
    BootScene.prototype.preload = function () {
        var _this = this;
        this.load.image('sky', require('../assets/background.png'));
        this.load.image('background', require('../assets/background.png'));
        //this.load.image('star', require('../assets/star.png'))
        //this.load.image('bomb', require('../assets/bomb.png'))
        //this.load.image('bmo', require('../assets/bmo.png'))
        this.load.image('ice', require('../assets/platform_ice.png'));
        //this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/platform_ground.png'));
        this.load.image('duif', require('../assets/player_2.png'));
        this.load.image('lastation_night', require('../assets/lastation_night.png'));
        this.load.multiatlas('sprites', require('../assets/spritesheet.json'));
        this.load.image('borrus', require('../assets/borrus.png'));
        this.load.image('poop', require('../assets/poop.png'));
        this.load.image('npc', require('../assets/npc1.png'));
        this.load.spritesheet('duifsheet', require('../assets/duifsheet.png'), {
            frameWidth: 309, frameHeight: 306
        });
        this.load.on('complete', function () {
            console.log("everything is loaded");
            // add code here to switch to the start scene
            _this.scene.start("StartScene");
        });
    };
    return BootScene;
}(Phaser.Scene));
exports.BootScene = BootScene;
