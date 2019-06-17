export class Poop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "poop");
        this.scene.physics.add.existing(this);
        this.setGravityY(200);
        this.setCollideWorldBounds(true);
    }
}
