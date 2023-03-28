export default class Button extends Phaser.GameObjects.Text {
    constructor(x: number, y: number, label: string, scene: Phaser.Scene, callback: any) {
        super(scene, x, y, label, { backgroundColor: '#8aacc8' });

        this
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#8aacc8' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback()) // 콜백함수 실행
            .on('pointerover', () => this.setStyle({ fill: '#000' })) // 마우스 호버링 효과 주기
            .on('pointerout', () => this.setStyle({ fill: '#fff' })); // 마우스 호버링 효과 주기

        scene.add.existing(this);
    }
}