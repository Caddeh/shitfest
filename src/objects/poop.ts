export class Poop extends Phaser.Physics.Arcade.Sprite{

    constructor (scene, x: number, y: number){
        super(scene, x, y, "poop")

        this.scene.physics.add.existing(this)
        this.setGravityY(200)
        this.setCollideWorldBounds(true)
            
        }
}


