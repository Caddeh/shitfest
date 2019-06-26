import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { Arcade } from "../src/arcade/arcade"

const config: GameConfig = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, GameScene, EndScene],
    input: {
        keyboard: true,
        gamepad: true
    },
    physics: {
        default: "arcade",
        matter: {
            debug: false, 
            gravity: { y: 0 },
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            },
            plugins: { attractors : true }
        },
    },
    render: { pixelArt: true }
};

export class ShitGame extends Phaser.Game {
    public arcade:Arcade
    constructor(config: GameConfig) {
        super(config)
        this.arcade = new Arcade(this, false)
    }
}

window.addEventListener("load", () => new ShitGame(config))

