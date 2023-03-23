import Phaser from 'phaser'

class SmoothedHorionztalControl {
    msSpeed:number
    value:number
    constructor(speed:number) {
        this.msSpeed = speed;
        this.value = 0;
    }

    moveLeft(delta:number) {
        if (this.value > 0) { this.reset(); }
        this.value -= this.msSpeed * delta;
        if (this.value < -1) { this.value = -1; }
    }

    moveRight(delta:number) {
        if (this.value < 0) { this.reset(); }
        this.value += this.msSpeed * delta;
        if (this.value > 1) { this.value = 1; }
    }

    reset() {
        this.value = 0;
    }
}


interface MoveKey {
    up: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
    down: Phaser.Input.Keyboard.Key
    left: Phaser.Input.Keyboard.Key
    attack: Phaser.Input.Keyboard.Key
    run: Phaser.Input.Keyboard.Key
}
export default class Player extends Phaser.Physics.Matter.Sprite {
    private key: MoveKey
    private keys:string[]
    private speed: number
    private moveState:number
    private soundSample :Phaser.Sound.BaseSound
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);

        // 장면 저장
        this.scene = scene;
        // player 설정
        this.setInteractive();//input manager에서 접근할수있도록,
        this.setDepth(5); // z-index
        this.speed = 2 //속도 설정
        this.moveState = 0
        
        // 이동키 설정
        this.key = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            attack: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            run: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        }
        scene.add.existing(this);//장면 추가-stage를 의미
        scene.physics.add.existing(this);//물리엔진
        this.setCollideWorldBounds(true);//화면밖으로 못나가도록,

        // animation 설정
        this.keys = ['idle', 'walk', 'run', 'attack1', 'attack2', 'attack3', 'dead', 'hurt'];
        this.anims.create({ key: "idle", frames: this.anims.generateFrameNumbers('playerIdle', { frames: [0, 1, 2, 3] }), frameRate: 6, repeat: -1 })
        this.anims.create({ key: "walk", frames: this.anims.generateFrameNumbers('playerWalk', {}), frameRate: 8, repeat: -1 })
        this.anims.create({ key: "run", frames: this.anims.generateFrameNumbers('playerRun', {}), frameRate: 8, repeat: -1 })
        this.anims.create({ key: "attack1", frames: this.anims.generateFrameNumbers('playerAttack1', {}), frameRate: 8 })
        this.anims.create({ key: "attack2", frames: this.anims.generateFrameNumbers('playerAttack2', {}), frameRate: 8})
        this.anims.create({ key: "attack3", frames: this.anims.generateFrameNumbers('playerAttack3', {}), frameRate: 8})
        this.anims.create({ key: "dead", frames: this.anims.generateFrameNumbers('playerDead', {}), frameRate: 8})
        this.anims.create({ key: "hurt", frames: this.anims.generateFrameNumbers('playerHurt', {}), frameRate: 8})
        this.play(this.keys[0])

        this.soundSample =scene.sound.add("footstep", {loop:true, });
        
    }
    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        //이렇게 각 방향별로 각각 지정해줘야 대각선이동이가능하다고 함
        if (this.key.up.isDown) {
            this.y -= this.speed
            this.moveState = 1
        };
        if (this.key.right.isDown) {
            this.x += this.speed;
            this.play(this.keys[this.moveState],true).setFlipX(false)
            this.moveState = 1
        };
        if (this.key.down.isDown) {
            this.y += this.speed
        };
        if (this.key.left.isDown) {
            this.x -= this.speed;
            this.play(this.keys[this.moveState],true).setFlipX(true)
            this.moveState = 1
        };
        if (this.key.run.isDown) {
            this.moveState = 2;
        };
        if (this.key.run.isUp){this.moveState=1}
        if (this.key.attack.isDown){this.moveState=3
        this.speed=0}
        if (keyPress(Phaser.Input.Keyboard.KeyCodes.K)) {
            this.moveState = 1
            this.soundSample.play()
        }
    }
}