import './Arrow.ts';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    public playerState
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "playerIdle")


        // 초기 세팅
        this.playerState = {
            onMove: false,
            onAttack: false,
            onHurt: false,
            speed: 4,

        }

        // this.setPosition(x, y)
        // scene에 추가
        this.scene = scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

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
    }
    shootArrow() {
        this.playerState.onAttack = true
        setTimeout(() => {
            this.scene.add.arrow(this)
        })

        // setTimeout(() => { this.playerState.onAttack = false }, 1000)
    }

}