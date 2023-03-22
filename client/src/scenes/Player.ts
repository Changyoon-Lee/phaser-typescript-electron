import Phaser from 'phaser'

interface MoveKey {
    up: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
    down: Phaser.Input.Keyboard.Key
    left: Phaser.Input.Keyboard.Key
}
export default class Player extends Phaser.GameObjects.Sprite {
    private key: MoveKey
    private speed: number
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        // 장면 저장
        this.scene = scene;
        // player 설정
        this.setInteractive();//input manager에서 접근할수있도록,
        // this.setPosition(x, y); //초기위치 설정
        this.setDepth(5); // z-index
        this.speed = 2 //속도 설정

        // 이동키 설정
        this.key = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        }
        scene.add.existing(this);//장면 추가-stage를 의미
        scene.physics.add.existing(this);//물리엔진
        // this.setCollideWorldBounds(true);//화면밖으로 못나가도록,

        // animation 설정


    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        //이렇게 각 방향별로 각각 지정해줘야 대각선이동이가능하다고 함
        if (this.key.up.isDown) this.y -= this.speed;
        if (this.key.right.isDown) this.x += this.speed;
        if (this.key.down.isDown) this.y += this.speed;
        if (this.key.left.isDown) this.x -= this.speed;
    }
}