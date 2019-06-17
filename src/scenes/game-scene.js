import { Player } from "../objects/player";
import { Platform } from "../objects/platform";
import { Npc } from "../objects/npc";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameScene" });
        this.age = 17;
        this.groundY = 550;
    }
    init() {
        this.registry.set("score", 0);
        this.physics.world.bounds.width = 1440;
        this.physics.world.bounds.height = 900;
    }
    create() {
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        // 11 STARS
        //this.stars = this.physics.add.group({
        // key: 'star',
        // repeat: 11,
        //setXY: { x: 12, y: 30, stepX: 70 },
        // })
        // add animation
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
        // TODO add player
        this.player = new Player(this);
        this.player.setGravity(0, 0);
        this.player.setScale(0.5, 0.5);
        this.player.anims.play('fly');
        // Add NPC
        this.npc = this.add.group({ runChildUpdate: true });
        this.npc.addMultiple([
            new Npc(this, 400, this.groundY),
            new Npc(this, 500, this.groundY)
        ], true);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new Platform(this, 0, 750, "ground"),
            new Platform(this, 220, 750, "ground"),
            new Platform(this, 475, 750, "ground"),
            new Platform(this, 625, 750, "ground")
        ], true);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.npc, this.platforms);
        this.physics.add.collider(this.player, this.npc);
        this.cameras.main.setSize(1440, 800);
        this.cameras.main.setBounds(0, 0, 1440, 800);
        this.cameras.main.startFollow(this.player);
        this.physics.add.overlap(this.player, this.npc, this.die, null, this);
        //if NPC goes outside world, delete
    }
    die() {
        console.log("You died, idiot");
        this.scene.start("EndScene");
    }
    collectStar(player, star) {
        this.stars.remove(star, true, true);
        this.registry.values.score++;
        // TO DO check if we have all the stars, then go to the end scene
        if (this.registry.values.score == 4) {
            console.log("4Stars!");
            player.setTexture("bmo");
        }
        if (this.registry.values.score == 11) {
            console.log("Congrats");
            this.scene.start("EndScene");
        }
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
