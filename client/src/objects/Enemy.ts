import Phaser from 'phaser';
import './Item.ts';
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    public speed!: number
    public hp!: number
    public m_events!: Phaser.Time.TimerEvent[]
    constructor(scene: Phaser.Scene, x: number, y: number) {

        super(scene, x, y, "enemy");
        scene.physics.world.enableBody(this);
        // this.setPosition(x, y)
        this.setBodySize(16, 64, true)
        this.setOffset(128 / 2 - 16 / 2, 128 - 64)
        this.setCollideWorldBounds(true) // 설정한 범위만 움직이도록
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
    damageText(x:number,y:number, damage:number) {
        const textbox = this.scene.add.text(x,y,`${damage}`)
        this.scene.tweens.add({
            targets:textbox,
            alpha:0,//밝기 0%
            duration:1000,//지속시간(ms)
            repeat:0,//반복(무한)
            yoyo:false,//요요처리
            ease:'Linear',//타이밍함수
            y:'-=10',//y위치 10 감소
            onComplete:(e,target)=>{
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

Phaser.GameObjects.GameObjectFactory.register('enemy', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    const enemy = new Enemy(this.scene, x, y)

    this.displayList.add(enemy)
    // this.updateList.add(enemy) // preupdate 할게 있으면 추가

    return enemy
})