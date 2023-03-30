import '../objects/Arrow.ts';
import '../objects/components/HpBar.ts';
import HpBar from './components/HpBar';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    public playerState
    public m_hpBar!: HpBar
    public center!: { x: number, y: number }
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "playerIdle")
        // scene에 추가
        this.scene = scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.center = {
            x: x + 64,
            y: y + 64
        }
        this.setBodySize(16, 64)
        this.setOffset(128 / 2 - 16 / 2, 128 - 64)
        // 초기 세팅
        this.playerState = {
            onMove: false,
            onAttack: false,
            onHurt: false,
            speed: 4,
            power: 10,
        }
        this.alpha = 1// 공격당했을때 투명해지도록
        this.m_hpBar = this.scene.add.hpBar(this, 100);
        // this.setPosition(x, y)

        //주기적으로 아래 함수 실행
        scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.shootArrow()
            },
            loop: true
        })
    }

    // move player
    moveLeft() {
        this.x -= this.playerState.speed
        this.flipX = true
    }
    moveRight() {
        this.x += this.playerState.speed
        this.flipX = false
    }
    moveUp() {
        this.y -= this.playerState.speed
    }
    moveDown() {
        this.y += this.playerState.speed
    }

    hitByEnemy(damage: number) {
        if (this.alpha < 1) return;
        this.scene.soundGroup.m_hurtSound.play()
        this.m_hpBar.decrease(damage)
        if (this.m_hpBar.m_currentHp <= 0) {
            // 게임오버
            this.scene.soundGroup.m_deadSound.play();
            this.scene.scene.start("gameoverScene", {})
        }
        this.disableBody(false, false)
        this.alpha = 0.5
        // 1초 쿨타임
        this.scene.time.addEvent({
            delay: 1000, loop: false, callback: this.resetPlayer,
            callbackScope: this // callback 함수의 args 관련
        })
    }
    resetPlayer() {
        this.enableBody(true, this.x, this.y, true, true)
        this.alpha = 1
    }
    shootArrow() {
        this.playerState.onAttack = true
        setTimeout(() => {
            this.scene.add.arrow(this)
        })

        // setTimeout(() => { this.playerState.onAttack = false }, 1000)
    }

}