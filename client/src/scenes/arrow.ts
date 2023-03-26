import Phaser from 'phaser';
import Player from './Player';
import PlayingScene from './PlayingScene';
export default class Arrow extends Phaser.Physics.Arcade.Image {
    static SPEED = 200;
    static DURATION = 2000;

    constructor(scene: PlayingScene, player: Player) {
        const offsetX = 10
        const offsetY = 11.5
        const radius = 10

        const x = player.x - 10;
        const y = player.y + 11.5;
        super(scene, x, y, "arrow");
        this.scale = 1;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.flipX = player.flipX; // player의 flip 여부에 따라 화살 방향도 정해짐
        this.setCircle(radius, this.flipX ? offsetX - radius : this.width - radius - 5, offsetY + radius);// 이거 위치 중심부터로 계산하는게 좋을듯
        this.setVelocityX(this.flipX ? -Arrow.SPEED : +Arrow.SPEED);

        scene.m_attacks.add(this);
        scene.soundGroup.m_tap.play();

        setTimeout(() => this.destroy(), Arrow.DURATION);
    }

    update() {
    }
}