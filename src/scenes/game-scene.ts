import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Npc } from "../objects/npc"
import { Poop } from "../objects/poop"
import { MovingPlatform } from "../objects/movingplatform"
import { stringify } from "querystring";
import { Scene, Game } from "phaser";

export class GameScene extends Phaser.Scene {

    private age : number = 17
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private poops : Phaser.Physics.Arcade.Group
    private npc : Phaser.GameObjects.Group
    private text : string

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        this.registry.set("score", 0)

        this.physics.world.bounds.width = 1600
        this.physics.world.bounds.height = 600
    }

    

    create(): void {
        this.add.image(0, 0, 'background').setOrigin(0, 0)      

        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
    
        this.player = new Player(this)
        this.player.setGravity(0,0)
    
        // Add NPC
        this.npc = this.add.group ({runChildUpdate: true})
        this.npc.addMultiple([
            new Npc (this, 0, 125),
        ], true)
        

        // Add poop
        /*this.poops = this.add.group();

        this.poops.enableBody = true;
        this.poops.physicsBodyType*/


        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform (this, 0, 600, "ground"),
        ], true)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0,0,1600,600)
        this.cameras.main.startFollow(this.player)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++

        // TO DO check if we have all the stars, then go to the end scene
    if(this.registry.values.score == 4){
        console.log("4Stars!")
        player.setTexture("bmo")
    } if (this.registry.values.score == 11){
        console.log("Congrats")
        this.scene.start("EndScene")
    }
   }

    update(){
        this.player.update()
        
    }

}
