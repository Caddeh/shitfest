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
var player_1 = require("../objects/player");
var platform_1 = require("../objects/platform");
var npc_1 = require("../objects/npc");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, { key: "GameScene" }) || this;
        _this.age = 17;
        return _this;
    }
    GameScene.prototype.init = function () {
        this.registry.set("score", 0);
        this.physics.world.bounds.width = 1600;
        this.physics.world.bounds.height = 600;
    };
    GameScene.prototype.create = function () {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        });
        // TODO add player
        this.player = new player_1.Player(this);
        this.player.setGravity(0, 0);
        // Add NPC
        this.npc = this.add.group({ runChildUpdate: true });
        this.npc.addMultiple([
            new npc_1.Npc(this, 0, 125),
        ], true);
        // Add poop
        /*this.poops = this.add.group();

        this.poops.enableBody = true;
        this.poops.physicsBodyType*/
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new platform_1.Platform(this, 0, 600, "ground"),
        ], true);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.cameras.main.setSize(800, 600);
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.player);
    };
    GameScene.prototype.collectStar = function (player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        // TO DO check if we have all the stars, then go to the end scene
        if (this.registry.values.score == 4) {
            console.log("4Stars!");
            player.setTexture("bmo");
        }
        if (this.registry.values.score == 11) {
            console.log("Congrats");
            this.scene.start("EndScene");
        }
    };
    GameScene.prototype.update = function () {
        this.player.update();
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
