import { Poop } from "./poop";
import { Game, Scene } from "phaser";
import { GameScene } from "../scenes/game-scene";
import { platform } from "os";
import { deflate } from "zlib";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 100, 450, "duif")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        

        this.setCollideWorldBounds(true)
        this.setBounce(0)
        this.setDragX(600)
        this.setDragY(600)
        
    }
    public update(): void {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = false
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = true
        } 
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
            this.flipY = false
        } else (this.setVelocityY (0)
        )
        if (this.cursors.down.isDown){
            this.setVelocityY (200)
            }
            /*function dropPoop() {
                if(this.time.now > shootTime){
                    this.poop = poops.getFirst
                }*/
        if (this.cursors.space.isDown){
           //this.dropPoop()
           
            console.log("i pooped lmao")
       }
       

        }

        }
        // jump when the body is touching the floor
        //let grounded = this.body.touching.down 
        //if (this.cursors.up.isDown && grounded) {
            //this.setVelocityY(-400)
        
    

