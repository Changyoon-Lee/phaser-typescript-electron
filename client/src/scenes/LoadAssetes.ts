import Phaser from "phaser";

export default class Loading extends Phaser.Scene {
    constructor() {
        super("loading") // 이름 지정
    }

    preload() {
        //background
        this.load.image("background", "assets/background/Bridges1800x1200.jpg")

        //effect
        this.load.spritesheet("explosion", "/assets/effect/explosion_1.png", {frameWidth:55, frameHeight:55})

        //item
        this.load.image("itemKey","/assets/item/Icons/Icons_07.png")

        //player
        this.load.spritesheet("player", "/assets/character/Samurai_Archer/Idle.png")
        this.load.spritesheet("playerWalk", "/assets/character/Samurai_Archer/Walk.png")
        this.load.spritesheet("playerDead", "/assets/character/Samurai_Archer/Dead.png")
        this.load.spritesheet("playerShot", "/assets/character/Samurai_Archer/Shot.png")

    }
    create() {
        const { x, y, width, height } = this.cameras.main;//main camera의 좌표,크기정보
        console.log(x, y, width, height);
        const center = {
            x: x + width / 2,
            y: y + height / 2
        }
        //background 설정
        // const background = this.add.tileSprite(x,y,1800,1200, "background").setOrigin(0).setScale(width/1800,height/1200);
        //제목
        const title = this.add.text(center.x, height * 2 / 5, 'vampireSurviver').setFill("#fff").setFontSize(100).setOrigin(0.5).setDepth(999).setAlign('center')
        const startMessage = this.add.text(center.x, height * 3 / 5, 'press any Key to Enter').setFill("#fff").setFontSize(50).setOrigin(0.5).setDepth(999).setAlign('center')
        this.input.once("pointerdown", () => {
            this.scene.transition({ target: "stage", duration: 1000 })
        })
    }

    update() {

    }
}