import Phaser from 'phaser';
import './Item.ts';
export default class Explosion extends Phaser.Physics.Arcade.Sprite {
    public speed!: number
    public hp!: number
    public m_events!: Phaser.Time.TimerEvent[]
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, "explosion");
        // this.setBodySize(16, 16, true)
        this.setOrigin()
        this.scale = 1;
        this.play("explosion", true)

        // this.on("overlapstart", (attack: any) => {
        //     this.hit(attack, 10);
        // });
        this.on('animationcomplete', () => {
            this.destroy()
        });
    }



}

Phaser.GameObjects.GameObjectFactory.register('explosion', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const explosion = new Explosion(this.scene, x, y)

    this.displayList.add(explosion)

    return explosion
})