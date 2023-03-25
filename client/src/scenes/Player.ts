export default class Player extends Phaser.Physics.Arcade.Sprite {

    public playerState
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 128, 128, "playerIdle")


        // 초기 세팅
        this.playerState = {
            onMove: false,
            onAttack: false,
            onHurt: false,
            speed: 4,

        }

        this.setPosition(x, y)
        // scene에 추가
        scene.add.existing(this);
        scene.physics.add.existing(this);

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
    shotArrow() {

    }

}