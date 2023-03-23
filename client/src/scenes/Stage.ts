import Phaser from "phaser";
import Player from "./Player"
export default class Stage extends Phaser.Scene {
    constructor() {
        super("stage") // 이름 지정
    }

    preload() {
        this.load.image("background", "assets/background/Bridges1800x1200.jpg") //배경
        this.load.spritesheet("playerIdle", "assets/character/Samurai/Idle.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerWalk", "assets/character/Samurai/Walk.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerRun", "assets/character/Samurai/Run.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerAttack1", "assets/character/Samurai/Attack_1.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerAttack2", "assets/character/Samurai/Attack_2.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerAttack3", "assets/character/Samurai/Attack_3.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerDead", "assets/character/Samurai/Dead.png", { frameWidth: 128, frameHeight: 128 })//사진자르기
        this.load.spritesheet("playerHurt", "assets/character/Samurai/Hurt.png", { frameWidth: 128, frameHeight: 128 })//사진자르기

        this.load.audio("footstep", "assets/audio/footsteps.wav")
    }
    create() {
        const { x, y, width, height } = this.cameras.main;//main camera의 좌표,크기정보

        const center = {
            x: x + width / 2,
            y: y + height / 2
        }
        //background 설정
        const background = this.add.tileSprite(x, y, 1800, 1200, "background").setOrigin(0).setScale(width / 1800, height / 1200);


        //player

        const player = new Player(
            this,
            center.x, //x좌표
            center.y, //y좌표
            'playerIdle') //이미지 이름
        
        this.playerController = {
            matterSprite: this.matter.add.sprite(0, 0, 'player', 4),
            blocked: {
                left: false,
                right: false,
                bottom: false
            },
            numTouching: {
                left: 0,
                right: 0,
                bottom: 0
            },
            sensors: {
                bottom: null,
                left: null,
                right: null
            },
            time: {
                leftDown: 0,
                rightDown: 0
            },
            lastJumpedAt: 0,
            speed: {
                run: 7,
                jump: 10
            }
        };


    }

    update() {
        
    }
}