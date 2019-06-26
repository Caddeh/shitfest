import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Npc } from "../objects/npc"
import { Poop } from "../objects/poop"
import { stringify } from "querystring";
import { Scene, Game } from "phaser";
import { Arcade } from "../arcade/arcade"
import { Joystick } from "../arcade/input/joystick"
import { AlphaBird } from "../objects/alphaBird"
import { threadId } from "worker_threads";
import { ShitGame } from "../app"
import { Z_BEST_SPEED } from "zlib";

export class GameScene extends Phaser.Scene {

    private player: Player
    private arcade: Arcade
    private joystickListener: EventListener
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private poopGroup: Phaser.GameObjects.Group
    private npcGroup: Phaser.GameObjects.Group
    private text: string
    private groundY: number = 675
    private alphaBird: AlphaBird
    private score : number = 0
    private scoreText : Phaser.GameObjects.Text

    constructor() {
        super({ key: "GameScene" })

        setInterval(() => {
           this.npcGroup.add (new Npc(this, Phaser.Math.Between(10, 1400), this.groundY))
        }, Phaser.Math.Between(10000, 20000))
    }

    init(): void {
        this.registry.set("score", 0)
        this.physics.world.bounds.width = 800
    }



    create(): void {
        
        this.physics.world.bounds.height = 900
        let background = this.add.image(0, 0, 'background').setOrigin(0, 0)

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
        })

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
        })

        this.scoreText =  this.add.text(16,16, 'score: 0', { fontSize: '32px', fill: '#000'})

        // add player
        this.player = new Player(this)
        this.player.setGravity(0, 0)
        this.player.setScale(0.5, 0.5)
        this.player.anims.play('fly')
        

        /*let sun = this.player.game(650, 150, 'duif1', null, {
            plugin: {
                attractors: [
                    function (bodyA, bodyB) {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                            y: (bodyA.position.y - bodyB.position.y) * 0.000001
                        }
                    }
                ]
            }
        }) */
        // Add alphabird
        /*this.alphaBird = new AlphaBird(this)
        this.alphaBird.setScale(0.5, 0.5)
        this.alphaBird.anims.play('alphaFly')*/

        // Add NPC
        this.npcGroup = this.add.group({ runChildUpdate: true })
        this.npcGroup.addMultiple([
            new Npc(this, 400, this.groundY),
            new Npc(this, 500, this.groundY)
        ], true)

        this.poopGroup = this.add.group({ runChildUpdate: true })

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 0, 750, "ground"),
            new Platform(this, 400, 750, "ground"),
            new Platform(this, 800, 750, "ground"),
            new Platform(this, 1200, 750, "ground")
        ], true)



        // define collisions for bouncing, and overlaps for pickups
        this.physics.world.setBoundsCollision(false, false, true, true)

        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.npcGroup, this.platforms)
        this.physics.add.collider(this.player, this.npcGroup)
        this.physics.add.collider(this.player, this.alphaBird)

        this.physics.add.overlap(this.poopGroup, this.npcGroup, this.poopHitsEnemy, null, this)
        this.physics.add.overlap(this.poopGroup, this.platforms, )

        this.cameras.main.setSize(1440, 800)
        this.cameras.main.setBounds(0, 0, 1440, 800)
        this.cameras.main.startFollow(this.player)

        this.physics.add.overlap(this.player, this.npcGroup, this.loseLife, null, this)
        this.physics.add.overlap(this.player, this.alphaBird, this.loseLife, null, this)

        //if NPC goes outside world, delete

    }

    public friendlyBullet() {
        this.poopGroup.add(new Poop(this, this.player.x + 20, this.player.y), true)
    }

   /* private enemyRun(npc : Npc) {
        let x : number
        function getRandomInt() {
            return Phaser.Math.Between(0,1)
        }
        x = getRandomInt()

        if (x == 1){
            this.Npc.speedX = 275
        }
    } */

    private loseLife(): void {
        let d = new Date().getTime()
        if (d > this.player.lastHurt + 1000) {
            this.player.lives -= 1
            this.player.lastHurt = d
            console.log(this.player.lives)
            if (this.player.lives < 0) {
                this.die()
            }
        }
    }
    private die(): void {
        console.log("You died, idiot")
        this.scene.start("EndScene")
    }

    private poopHitsEnemy(p: Poop, e: Npc) {
        console.log("poop hits enemy")
        this.score += 1
        this.scoreText.setText('Score: ' + this.score)
        console.log(this.score)
        this.poopGroup.remove(p, true, true)
    }

    update() {
        this.player.update()
    }
}

