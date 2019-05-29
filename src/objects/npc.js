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
var Npc = /** @class */ (function (_super) {
    __extends(Npc, _super);
    function Npc(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "npc") || this;
        _this.scene.add.existing(_this);
        _this.scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.setGravityY(200);
        _this.setGravityX(200);
        _this.setMaxVelocity(200);
        return _this;
    }
    Npc.prototype.update = function () {
        var x;
        function moveNpc() {
            function getRandoInt() {
                return Phaser.Math.Between(0, 1);
            }
            x = getRandoInt();
            console.log(x);
            if (x == 0) {
                console.log("going left");
            }
            else {
                console.log("going right");
            }
        }
        moveNpc();
    };
    return Npc;
}(Phaser.Physics.Arcade.Sprite));
exports.Npc = Npc;
