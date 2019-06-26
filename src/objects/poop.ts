export class Poop extends Phaser.Physics.Arcade.Sprite {

    private particles:Phaser.GameObjects.Particles.ParticleEmitterManager

    constructor(scene: Phaser.Scene, x:number, y:number) {
        super(scene, x, y, "poop")       
        
        this.setScale(0.6) 

        this.scene.physics.add.existing(this) 
        this.setSize(this.displayWidth + 20, this.displayHeight + 20)

        this.setVelocityY(200)
        this.setAcceleration(0, 1000)
    }

    public update(): void {
        if (this.y > 750) {
            this.destroy()
        }
    }

}
