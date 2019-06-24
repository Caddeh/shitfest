import { Scene } from "phaser";

export class Npc extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super (scene, x, y, "npc")

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        this.setGravityY(200)
        this.setMaxVelocity(200)

        setInterval( ()=> {
            let x : number
            
                function getRandoInt(){
                  return Phaser.Math.Between(0, 1)
                } 
    
                x = getRandoInt()
                //console.log(x)
    
               if (x == 0){
                    this.setVelocityX(-125)
               } else{
                   this.setVelocityX(125)
               }
            } , Phaser.Math.Between(800, 1500) )
        
        
        }

    public update() : void {
    }
}
