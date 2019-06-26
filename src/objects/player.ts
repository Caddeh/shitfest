import { Poop } from '../objects/poop'
import { Game, Scene } from "phaser";
import { GameScene } from "../scenes/game-scene";
import { platform } from "os";
import { deflate } from "zlib";
import { Arcade } from "../arcade/arcade"
import { ShitGame } from "../app"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private gamepad: Phaser.Input.Gamepad.Gamepad
    private poopListener: EventListener
    private arcade: Arcade
    public lives: number = 1
    public lastHurt = new Date().getTime()
    public lastPoop = new Date().getTime()
    private gameScene: GameScene
    private game: ShitGame

    constructor(scene: GameScene) {
        super(scene, 650, 150, "duif1")

        this.gameScene = scene

        console.log("creating player");
        let g = this.scene.game as ShitGame
        this.arcade = g.arcade
        console.log(this.arcade);
        
        

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        this.poopListener = () => this.gameScene.friendlyBullet()


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
    private gamepadInput(): void {

        for (let joystick of this.arcade.Joysticks) {
            joystick.update()

            // example: read directions as true / false
            if (joystick.Left) this.setVelocityX(-200) , this.flipX = false
            if (joystick.Right) this.setVelocityX(200) , this.flipX = true
            if (joystick.Up) this.setVelocityY(-200)
            if (joystick.Down) this.setVelocityY(200)
        }
    }

    //define keyboard controls
    private keyboardInput(): void {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-250)
            this.flipX = false
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(250)
            this.flipX = true
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(200)
        }

        if (this.cursors.space.isDown) {
            // console.log("I pooped lol")
        }

        // SPATIEBALK
        if (this.scene.input.keyboard.checkDown(this.cursors.space, 500)) {
            this.gameScene.friendlyBullet()
        }
    }
}








