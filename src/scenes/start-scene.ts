import { Arcade } from "../arcade/arcade"
import { Game } from "../app"

export class StartScene extends Phaser.Scene {

    private arcade : Arcade
    private nextGameListener : EventListener

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        let g = this.game as Game
        this.arcade = g.arcade

        //this.nextGameListener = () => this.nextGame()

        this.add.image(0, 0, 'start_screen').setOrigin(0,0)
        
        // add another image here

        // add text here

        this.add.text(400, 300, '', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', () => {
            this.scene.start('GameScene')
        })
    }
}

