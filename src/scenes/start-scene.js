export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: "StartScene" });
    }
    init() {
    }
    preload() {
    }
    create() {
        this.add.image(0, 0, 'start_screen').setOrigin(0, 0);
        // add another image here
        // add text here
        this.add.text(400, 300, '', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
        // add code here to switch to the GameScene, after a mouse click
        this.input.once('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
