var game: any;
var Phaser: any;


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
    }
        
    function create() {
        weapon = game.add.weapon(1, 'poop');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = -90;
        weapon.bulletSpeed = 400;
        
        cursors = this.input.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    function update() {
        if (fireButton.isDown)
        {
            weapon.fire();
        }
    }
    
    function render() {
        weapon.debug();
    }


