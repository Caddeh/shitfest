import { Player } from "../objects/player";
import { Platform } from "../objects/platform";
import { Npc } from "../objects/npc";
import { AlphaBird } from "../objects/alphaBird";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.groundY = 550;
    }
    init() {
        this.registry.set("score", 0);
        this.physics.world.bounds.width = 1440;
        this.physics.world.bounds.height = 900;
    }
    create() {
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        // add animations
        // alphabird animation
        this.anims.create({
            key: 'alphaFly',
            frames: [
                { key: 'alphaDuif1', frame: 1 },
                { key: 'alphaDuif2', frame: 2 },
                { key: 'alphaDuif3', frame: 3 }
            ],
            frameRate: 10,
            repeat: -1
        });
        //player animation
        this.anims.create({
            key: 'fly',
            frames: [
                { key: 'duif1', frame: 1 },
                { key: 'duif2', frame: 2 },
                { key: 'duif3', frame: 3 }
            ],
            frameRate: 10,
            repeat: -1
        });
        // add player
        this.player = new Player(this);
        this.player.setGravity(0, 0);
        this.player.setScale(0.5, 0.5);
        this.player.anims.play('fly');
        let sun = this.player.game(650, 150, 'duif1', null, {
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.000001
                        };
                    }
                ]
            }
        });
        // Add alphabird
        this.alphaBird = new AlphaBird(this);
        this.alphaBird.setScale(0.5, 0.5);
        this.alphaBird.anims.play('alphaFly');
        // Add NPC
        this.npc = this.add.group({ runChildUpdate: true });
        this.npc.addMultiple([
            new Npc(this, 400, this.groundY),
            new Npc(this, 500, this.groundY)
        ], true);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new Platform(this, 0, 750, "ground"),
            new Platform(this, 400, 750, "ground"),
            new Platform(this, 800, 750, "ground"),
            new Platform(this, 1200, 750, "ground")
        ], true);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.npc, this.platforms);
        this.physics.add.collider(this.player, this.npc);
        this.physics.add.collider(this.player, this.alphaBird);
        this.cameras.main.setSize(1440, 800);
        this.cameras.main.setBounds(0, 0, 1440, 800);
        this.cameras.main.startFollow(this.player);
        this.physics.add.overlap(this.player, this.npc, this.loseLife, null, this);
        this.physics.add.overlap(this.player, this.alphaBird, this.loseLife, null, this);
        //if NPC goes outside world, delete
    }
    loseLife() {
        let d = new Date().getTime();
        if (d > this.player.lastHurt + 1000) {
            this.player.lives -= 1;
            this.player.lastHurt = d;
            console.log(this.player.lives);
            if (this.player.lives < 0) {
                this.die();
            }
        }
    }
    die() {
        console.log("You died, idiot");
        this.scene.start("EndScene");
    }
    gameLoop() {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update();
            // example: read directions as true / false
            if (joystick.Left)
                console.log('LEFT');
            if (joystick.Right)
                console.log('RIGHT');
            if (joystick.Up)
                console.log('UP');
            if (joystick.Down)
                console.log('Down');
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    update() {
        this.player.update();
    }
}
