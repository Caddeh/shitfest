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
            plugins: { attractors : true }
        },
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {
    public arcade:Arcade
    public joystickListener : EventListener
    constructor(config: GameConfig) {
        super(config)
        //this.arcade = new Arcade(this, false)

        //this.joystickListener = (e: Event) => this.initJoystick as CustomEvent
        document.addEventListener("joystickcreated", this.joystickListener)
    }
}

window.addEventListener("load", () => new Game(config))

