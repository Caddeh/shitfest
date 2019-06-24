//var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.load.image('poop', 'assets/poop.png')
}

var weapon;
var cursors;
var fireButton

export class Poop extends Phaser.Physics.Arcade.Sprite{
    constructor (scene, x: number, y: number){
        super(scene, x, y, "poop")

        this.scene.physics.add.existing(this)
        this.setGravityY(200)
        this.setCollideWorldBounds(true)
            
        }
        
    public create() {
        weapon = game.add.weapon(1, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = -90;
        weapon.bulletSpeed = 400;
        
        cursors = this.input.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    }

    public update() {
        if (fireButton.isDown)
        {
            weapon.fire();
        }
    }
    
    public render() {
        weapon.debug();
    }


