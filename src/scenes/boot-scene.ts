import { Bomb } from "../objects/bomb";

export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('start_screen', require('../assets/start_screen.png'))
        this.load.image('background', require('../assets/background.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))
        this.load.image('duif1', require('../assets/player_1.png'))
        this.load.image('duif2', require('../assets/player_2.png'))
        this.load.image('duif3', require('../assets/player_3.png'))
        //this.load.image('borrus', require ('../assets/borrus.png'))
        this.load.image('poop', require ('../assets/poop.png'))
        this.load.image('npc', require ('../assets/npc1.png'))
        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}