export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 650, 150, "duif1");
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        // this.poopListener = () => this.handlePoopButton()
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        document.addEventListener("joystick0button0", this.poopListener);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setDragX(100);
        this.setDragY(600);
    }
    update() {
        // keyboard controls
        this.keyboardInput();
        // gamepad controls
        this.gamepadInput();
    }
    gamepadInput() {
    }
    keyboardInput() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = false;
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(200);
            this.flipX = true;
        }
        if (this.cursors.up.isDown) {
            this.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityY(200);
        }
        if (this.cursors.space.isDown) {
            console.log("I pooped lol");
        }
    }
}
