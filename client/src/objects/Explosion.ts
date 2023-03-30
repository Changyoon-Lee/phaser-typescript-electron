import Phaser from 'phaser';
import './Item.ts';
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    public speed!: number
    public hp!: number
    public m_events!: Phaser.Time.TimerEvent[]
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, "explosion");
        // this.setPosition(x, y)
        this.setBodySize(16, 16, true)
        this.setOrigin()
        this.setCollideWorldBounds(true) // 설정한 범위만 움직이도록
        this.speed = 100
        this.hp = 10
        this.scale = 1;
        this.play("explosion", true)

        // this.on("overlapstart", (attack: any) => {
        //     this.hit(attack, 10);
        // });

        this.m_events = [];
        this.m_events.push(this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                scene.physics.moveToObject(this, scene.m_player, this.speed);
            },
            loop: true,
        }));
    }



}

Phaser.GameObjects.GameObjectFactory.register('enemy', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y)

    this.displayList.add(enemy)
    // this.updateList.add(enemy) // preupdate 할게 있으면 추가

    return enemy
})