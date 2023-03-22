import Phaser from "phaser";

export default class Loading extends Phaser.Scene {
    constructor() {
        super("loading") // 이름 지정
    }

    preload() {
        // this.load.image("background", "assets/background/Bridges1800x1200.jpg")
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