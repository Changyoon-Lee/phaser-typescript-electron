import Phaser from 'phaser';
import Player from './Player';
import Config from '../config'
import Enemy from './enemy'
import Arrow from './arrow';
export default class PlayingScene extends Phaser.Scene {
    public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    public soundGroup!: { [key: string]: Phaser.Sound.BaseSound }
    public m_background!: Phaser.GameObjects.TileSprite
    public m_player!: Player
    public m_attacks!: Phaser.GameObjects.Group
    public m_enemies!: Phaser.GameObjects.Group
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

        // 메인 카메라 이동
        this.cameras.main.startFollow(this.m_player)
        this.cameras.main.setLerp(1, 0); //y축으로는 안움직이게 

        //object group
        this.m_attacks = this.add.group(); //그룹으로 관리
        this.m_enemies = this.physics.add.group(); //그룹으로 관리

        // enemy
        this.m_enemies = this.physics.add.group();
        this.m_enemies.add(new Enemy(this, Config.width / 2 - 200, Config.height / 2,));

        // collisions
        // this.physics.add.overlap(this.m_attacks, this.m_enemies, (attack, enemy) => {
        //     enemy.hit(attack, 10);
        // }, null, this);
    }


    update(time: number, delta: number) {
        this.handlePlayerMove()
        this.m_background.setX(this.m_player.x - Config.width) // 플레이어가 중앙이되는 배경위치설정
        this.m_background.tilePositionX = this.m_player.x - Config.height // 타일의 시작지점이 플레이어의 위치에따라변경
        // console.log(this.m_player.x, this.m_player.y)
    }

    handlePlayerMove() {
        // cursorkey 와 플레이어 이동관련 사항을 여기 scene에 적는것이 좋을지.. 플레이어 객체 안에 구현하는 것이 좋을 지.. 
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
        if (this.m_player.playerState.onAttack === true) {
            this.m_player.play('shot', true)
        } else {
            if (!isMove) {
                this.m_player.play('idle', true);
            } else {
                this.m_player.play('walk', true)
            }
        }
    }
}