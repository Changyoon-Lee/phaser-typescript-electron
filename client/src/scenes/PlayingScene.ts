import Phaser from 'phaser';
import Player from './Player';

export default class PlayingScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private soundGroup: { [key: string]: Phaser.Sound.BaseSound } | null = null
    private m_background!: Phaser.GameObjects.TileSprite
    private m_player!: Player
    constructor() {
        super("playGame");
        console.log("playScene loaded")
    }

    create() {
        const { x, y, width, height } = this.cameras.main;//main camera의 좌표,크기정보
        const center = {
            x: x + width / 2,
            y: y + height / 2
        }
        // sound
        this.sound.pauseOnBlur = false; // 게임화면 벗어났을때 소리 끄기
        this.soundGroup = {
            m_tap: this.sound.add("audio_tap"),
            m_pickupSound: this.sound.add("audio_bonus"),
            m_hurtSound: this.sound.add("audio_hurt"),
            m_completeSound: this.sound.add("audio_complete"),
            m_footstepSound: this.sound.add("audio_footstep"),
            m_backgroundBGM: this.sound.add("audio_background"),
            m_deadSound: this.sound.add("audio_losing")
        }
        this.cursors = this.input.keyboard.createCursorKeys();

        // background
        this.m_background = this.add.tileSprite(x, y, 1800, 1200, "background").setOrigin(0).setTileScale(0.5);
        // this.m_background = this.add.image(x, y, "background").setOrigin(0).setScale(width / 1800, height / 1200);

        //player sprite object
        this.m_player = new Player(this, center.x, center.y)


    }


    update(time: number, delta: number) {
        this.handlePlayerMove()
    }

    handlePlayerMove() {
        let isMove = false;
        if (this.cursors.left.isDown) {
            isMove = true;
            this.m_player.moveLeft();
        } else if (this.cursors.right.isDown) {
            isMove = true;
            this.m_player.moveRight();
        }
        if (this.cursors.up.isDown) {
            isMove = true;
            this.m_player.moveUp();
        } else if (this.cursors.down.isDown) {
            isMove = true;
            this.m_player.moveDown();
        }
        this.m_player.playerState.onMove = isMove;
        if (!isMove) {
            this.m_player.play('idle', true);
        } else {
            this.m_player.play('walk', true)
        }
    }
}