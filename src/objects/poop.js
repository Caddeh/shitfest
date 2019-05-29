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
var Poop = /** @class */ (function (_super) {
    __extends(Poop, _super);
    function Poop(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "poop") || this;
        _this.scene.physics.add.existing(_this);
        _this.setGravityY(200);
        _this.setCollideWorldBounds(true);
        return _this;
    }
    return Poop;
}(Phaser.Physics.Arcade.Sprite));
exports.Poop = Poop;
