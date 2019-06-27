import { Scene } from "phaser";

export class Npc extends Phaser.Physics.Arcade.Sprite{

    public speedX : number = 125

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
                    this.setVelocityX(-this.speedX)
               } else{
                    this.setVelocityX(this.speedX)
               }
            } , Phaser.Math.Between(750, 1750) )
        
        
        }
    public runAway() : void {
        function getRandomNumber() {
            return Phaser.Math.Between (0,1)
        }
        if (getRandomNumber() == 1){
            this.speedX = 250
        } else {
            this.speedX = -250
        }
    }

    public update() : void {
    }
}
