import Phaser from 'phaser';
import './Item.ts';
import './Explosion.ts'
import Arrow from './Arrow';
export interface EnemyStat {
    hp: number
    scale: number
    texture: string
    speed: number
    damage: number
}
interface EnemyLevelStat {
    [key: number]: EnemyStat
}
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    static enemyStat: EnemyLevelStat = {
        1: { hp: 10, scale: 1, texture: "enemy", speed: 100, damage: 10 },
        2: { hp: 20, scale: 1.1, texture: "enemy", speed: 100, damage: 11 },
        3: { hp: 40, scale: 1.2, texture: "enemy", speed: 100, damage: 12 },
        4: { hp: 80, scale: 1.3, texture: "enemy", speed: 100, damage: 13 },
        5: { hp: 160, scale: 1.4, texture: "enemy", speed: 100, damage: 14 },
        6: { hp: 320, scale: 1.5, texture: "enemy", speed: 100, damage: 16 },
        7: { hp: 640, scale: 1.6, texture: "enemy", speed: 100, damage: 20 },
        8: { hp: 1280, scale: 1.7, texture: "enemy", speed: 100, damage: 25 },
        9: { hp: 2560, scale: 1.8, texture: "enemy", speed: 100, damage: 30 },
        10: { hp: 51200, scale: 3, texture: "enemy", speed: 25, damage: 100 },
    }

    public speed!: number
    public damage!: number
    public hp!: number
    public m_events!: Phaser.Time.TimerEvent[]
    constructor(scene: Phaser.Scene, x: number, y: number, enemyStat: EnemyStat) {

        super(scene, x, y, enemyStat.texture);
        scene.physics.world.enableBody(this);
        this.setBodySize(16, 64, true)
        this.setOffset(128 / 2 - 16 / 2, 128 - 64)
        this.setCollideWorldBounds(true) // 설정한 범위만 움직이도록
        this.speed = enemyStat.speed
        this.hp = enemyStat.hp
        this.scale = enemyStat.scale;
        this.damage = enemyStat.damage
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
    hit(attack: Arrow, power: number) {//화살에 한번에 여러 오브젝트와 다으면 에러생기는듯?
        if (!attack.body) return
        this.scene.add.explosion(attack.body.x, attack.body.y)
        const damage = attack.arrowStat.damage * power
        attack.destroy();
        this.hp -= damage
        this.scene.soundGroup.m_hurtSound.play();
        this.damageText(this.x, this.y, damage)


        //death
        if (this.hp <= 0) {
            this.disableBody();
            this.play("enemyDead")
            this.scene.time.removeEvent(this.m_events)
            this.setVelocity(0, 0)
            setTimeout(() => {
                this.scene.add.item(this)
                this.destroy()
            }, 1000)

        }
    }
    damageText(x: number, y: number, damage: number) {
        const textbox = this.scene.add.text(x, y, `${damage}`)
        this.scene.tweens.add({
            targets: textbox,
            alpha: 0,//밝기 0%
            duration: 1000,//지속시간(ms)
            repeat: 0,//반복(무한)
            yoyo: false,//요요처리
            ease: 'Linear',//타이밍함수
            y: '-=10',//y위치 10 감소
            onComplete: (e, target) => {
                target[0].destroy();//완료된 텍스트 제거
            }
        });

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

Phaser.GameObjects.GameObjectFactory.register('enemy', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, enemyStat: EnemyStat) {
    const enemy = new Enemy(this.scene, x, y, enemyStat)

    this.displayList.add(enemy)
    // this.updateList.add(enemy) // preupdate 할게 있으면 추가

    return enemy
})