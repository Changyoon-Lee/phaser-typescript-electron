import Phaser from 'phaser';
import Player from './Player';
import PlayingScene from '../scenes/PlayingScene';
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    public speed!: number
    public hp!: number
    public m_events!: Phaser.Time.TimerEvent[]
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, 128, 128, "enemy");
        scene.physics.world.enableBody(this);
        this.setPosition(x, y)
        this.setBodySize(16, 64, true)
        this.setOffset(128 / 2 - 16 / 2, 128 - 64)
        this.speed = 100
        this.hp = 10
        this.scale = 1;
        this.play("enemyWalk", true)

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
    hit(attack: any, damage: number) {
        attack.destroy();
        this.hp -= damage
        this.scene.soundGroup.m_hurtSound.play();

        if (this.hp <= 0) {
            this.disableBody();
            this.play("enemyDead")
            this.scene.time.removeEvent(this.m_events)
            this.setVelocity(0, 0)
            setTimeout(() => this.destroy(), 1000)

        }
    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta)
        if (this.body.velocity.x > 0) {
            this.setFlipX(false)
        } else {
            this.setFlipX(true)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('enemy', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y)

    this.displayList.add(enemy)
    // this.updateList.add(enemy) // preupdate 할게 있으면 추가

    return enemy
})