import { Scene } from "phaser";

export class Npc extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super (scene, x, y, "npc")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.setGravityY(200)
        this.setGravityX(200)
        this.setMaxVelocity(200)
        }

    public update() : void {
        let x : number
        function moveNpc(){

            function getRandoInt(){
               return Phaser.Math.Between(0, 1)
            }
            x = getRandoInt()
            console.log(x)

           if (x == 0){
               console.log("going left")
           } else{
               console.log("going right")
           }
    }
    moveNpc()

    }
}