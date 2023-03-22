import Phaser from "phaser";

export default class Stage extends Phaser.Scene {
    constructor() {
        super("stage") // 이름 지정
    }

    preload() {
        this.load.image("background", "assets/background/Bridges1800x1200.jpg")
    }
    create() {
        const {x, y, width, height} = this.cameras.main;//main camera의 좌표,크기정보
        console.log(x,y,width,height);
        const center = {
            x: x+width/2,
            y: y+height/2
        }
        //background 설정
        const background = this.add.tileSprite(x,y,1800,1200, "background").setOrigin(0).setScale(width/1800,height/1200);
        //제목
        
    }
    
    update() {

    }
}