import '../objects/Arrow.ts';
import '../objects/components/HpBar.ts';
import Arrow from './Arrow';
import HpBar from './components/HpBar';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    public playerState
    public m_hpBar!: HpBar
    public shootArrowEvent!: Phaser.Time.TimerEvent;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "playerIdle")

        // scene에 추가
        this.scene = scene
        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.setCollideWorldBounds(true)
        this.setBodySize(16, 64, true)
        const offsetY = this.body.height / 2
        this.body.offset.y = this.body.offset.y + offsetY
        // 초기 세팅
        this.playerState = {
            onMove: false,
            onAttack: false,
            onHurt: false,
            speed: 4,
            power: 1,
        }
        this.alpha = 1// 캐릭터 투명도
        this.m_hpBar = this.scene.add.hpBar(this, 100);

        //주기적으로 아래 함수 실행
        this.shootArrowEvent = scene.time.addEvent({
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
        //death
        if (this.m_hpBar.m_currentHp <= 0) {
            // 게임오버
            this.scene.soundGroup.m_deadSound.play();
            this.scene.loseGame()
            return
        }
        this.playerState.onHurt = true
        this.alpha = 0.5
        // 1초 쿨타임
        this.scene.time.addEvent({
            delay: 1000, loop: false, callback: this.resetPlayer,
            callbackScope: this // callback 함수의 args 관련
        })
    }
    resetPlayer() {
        this.playerState.onHurt = false
        this.alpha = 1
    }
    shootArrow() {
        this.playerState.onAttack = true
        console.log("공격시작")
    }
}