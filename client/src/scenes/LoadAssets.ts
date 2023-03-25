import Phaser from "phaser";

export default class Loading extends Phaser.Scene {
    constructor() {
        super("loading") // 이름 지정
    }

    preload() {
        //background
        this.load.image("background", "/assets/background/Bridges1800x1200.jpg")

        //effect
        this.load.spritesheet("explosion", "/assets/effect/explosion_1.png", { frameWidth: 55, frameHeight: 55 })

        //item
        this.load.image("itemKey", "/assets/item/Icons/Icons_07.png")

        //player
        this.load.spritesheet("playerIdle", "/assets/character/Samurai_Archer/Idle.png", { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet("playerWalk", "/assets/character/Samurai_Archer/Walk.png", { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet("playerHurt", "/assets/character/Samurai_Archer/Hurt.png", { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet("playerDead", "/assets/character/Samurai_Archer/Dead.png", { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet("playerShot", "/assets/character/Samurai_Archer/Shot.png", { frameWidth: 128, frameHeight: 128 })

        //audio
        this.load.audio("audio_tap", "/assets/audio/ball-tap.wav")
        this.load.audio("audio_bonus", "/assets/audio/bonus-earned-in-video-game.wav")
        this.load.audio("audio_hurt", "/assets/audio/boxer-getting-hit.wav")
        this.load.audio("audio_complete", "/assets/audio/completion-of-a-level.wav")
        this.load.audio("audio_footstep", "/assets/audio/footsteps.wav")
        this.load.audio("audio_background", "/assets/audio/game-level-music.wav")
        this.load.audio("audio_losing", "/assets/audio/player-losing.wav")
    }
    create() {
        this.scene.start("playGame")

        //animation 설정
        this.anims.create({ key: "idle", frames: this.anims.generateFrameNumbers('playerIdle', {}), frameRate: 20, repeat: -1 })
        this.anims.create({ key: "walk", frames: this.anims.generateFrameNumbers('playerWalk', {}), frameRate: 8, repeat: -1 })
        this.anims.create({ key: "shot", frames: this.anims.generateFrameNumbers('playerShot', {}), frameRate: 8 })
        this.anims.create({ key: "dead", frames: this.anims.generateFrameNumbers('playerDead', {}), frameRate: 8 })
        this.anims.create({ key: "hurt", frames: this.anims.generateFrameNumbers('playerHurt', {}), frameRate: 8 })
        this.anims.create({ key: "explosion", frames: this.anims.generateFrameNumbers('explosion', {}), frameRate: 8 })

        //
        const { x, y, width, height } = this.cameras.main;//main camera의 좌표,크기정보
        const center = {
            x: x + width / 2,
            y: y + height / 2
        }
        // const background = this.add.tileSprite(x, y, 1800, 1200, "background").setOrigin(0).setScale(width / 1800, height / 1200);
        //제목
        // const title = this.add.text(center.x, height * 2 / 5, 'vampireSurviver').setFill("#fff").setFontSize(100).setOrigin(0.5).setDepth(999).setAlign('center')
        // const startMessage = this.add.text(center.x, height * 3 / 5, 'press any Key to Enter').setFill("#fff").setFontSize(50).setOrigin(0.5).setDepth(999).setAlign('center')
        // this.input.once("pointerdown", () => {
        //     this.scene.transition({ target: "stage", duration: 1000 })
        // })
    }

    update() {

    }
}