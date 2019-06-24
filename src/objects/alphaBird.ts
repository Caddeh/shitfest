import { GameScene } from "../scenes/game-scene";

export class AlphaBird extends Phaser.Physics.Arcade.Sprite{


    constructor(scene : GameScene){
        super(scene, Phaser.Math.Between(0,1440), Phaser.Math.Between(50,200), 'alphaDuif1')

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setGravityY(0)
    }

}