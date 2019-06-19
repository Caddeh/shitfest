import { Poop } from "./poop";
import { Game, Scene } from "phaser";
import { GameScene } from "../scenes/game-scene";
import { platform } from "os";
import { deflate } from "zlib";
import { Arcade } from "../arcade/arcade";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private gamepad: Phaser.Input.Gamepad.Gamepad
    private poopListener: EventListener
    private arcade: Arcade
    public lives : number = 3
    public lastHurt = new Date().getTime()

    constructor(scene: GameScene) {
        super(scene, 650, 150, "duif1")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
       // this.poopListener = () => this.handlePoopButton()
        

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        
        document.addEventListener("joystick0button0", this.poopListener)

        this.setCollideWorldBounds(true)
        this.setBounce(0)
        this.setDragX(100)
        this.setDragY(600)
    }

    public update(): void {
        // keyboard controls
        this.keyboardInput()
        // gamepad controls
        this.gamepadInput()
    }

    //define gamepad controls
    private gamepadInput() : void {
        
    }

    //define keyboard controls
    private keyboardInput(): void {
        if (this.cursors.left.isDown){
            this.setVelocityX(-200)
            this.flipX = false
        } else if (this.cursors.right.isDown){
            this.setVelocityX(200)
            this.flipX = true
        }

        if (this.cursors.up.isDown){
            this.setVelocityY(-200)
        } else if (this.cursors.down.isDown){
            this.setVelocityY(200)
        }

        if(this.cursors.space.isDown){
            console.log("I pooped lol")
        }
    }
 }
 

    
        
    

