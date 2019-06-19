export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: "BootScene" });
    }
    init() {
    }
    preload() {
        this.load.image('start_screen', require('../assets/start_screen.png'));
        this.load.image('background', require('../assets/background.png'));
        this.load.image('ground', require('../assets/platform_ground.png'));
        this.load.image('duif1', require('../assets/player_1.png'));
        this.load.image('duif2', require('../assets/player_2.png'));
        this.load.image('duif3', require('../assets/player_3.png'));
        this.load.image('alphaDuif1', require('../assets/enemy_1.png'));
        this.load.image('alphaDuif2', require('../assets/enemy_2.png'));
        this.load.image('alphaDuif3', require('../assets/enemy_3.png'));
        //this.load.image('borrus', require ('../assets/borrus.png'))
        this.load.image('poop', require('../assets/poop.png'));
        this.load.image('npc', require('../assets/npc1.png'));
        this.load.on('complete', () => {
            console.log("everything is loaded");
            // add code here to switch to the start scene
            this.scene.start("StartScene");
        });
    }
}
