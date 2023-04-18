import Phaser from 'phaser';
import Player from '../objects/Player';
import Config from '../config'
import '../objects/Enemy.ts'
import '../objects/Arrow.ts';
import '../objects/Item.ts';
import { getRandomPosition } from '../utils/math';
import Enemy from '../objects/Enemy';
import Item from '../objects/Item';
import Arrow from '../objects/Arrow';



export default class PlayingScene extends Phaser.Scene {
    public cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    public soundGroup!: { [key: string]: Phaser.Sound.BaseSound }
    public m_UIs!: Phaser.GameObjects.Group
    public m_background!: Phaser.GameObjects.TileSprite
    public m_player!: Player
    public m_attacks!: Phaser.GameObjects.Group
    public m_enemies!: Phaser.GameObjects.Group
    public m_items!: Phaser.GameObjects.Group
    public m_itemCount!: { [key: string]: number };
    public timer!: Phaser.GameObjects.BitmapText
    public enemyLevel!: number;
    public arrowLevel!: number;
    public addEnemyEvent!: Phaser.Time.TimerEvent;
    public gameOver!: boolean;
    public timedEvent!: Phaser.Time.TimerEvent;
    constructor() {
        super("playGame");
    }

    create() {
        const { x, y, width, height } = this.cameras.main;//main camera의 좌표,크기정보

        const center = {
            x: Config.width / 2,
            y: Config.height / 2
        }
        //timer
        this.timedEvent = new Phaser.Time.TimerEvent({ delay: 5 * 60 * 1000 })//5분이내에 깨야함
        this.timer = this.add.bitmapText(300, 32, "pixelFont", "00", 40).setOrigin(0.5).setDepth(999)
        this.timer.setScrollFactor(0);
        this.time.addEvent(this.timedEvent);
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
        this.m_background = this.add.tileSprite(0, 0, 900, 600, "background").setOrigin(0, 0).setTileScale(0.5);
        // this.m_background = this.add.image(x, y, "background").setOrigin(0).setScale(width / 1800, height / 1200);
        this.physics.world.setBounds(0, 200, 900, 290, false, false);
        //player sprite object
        this.m_player = new Player(this, center.x, center.y)

        //itemCount set
        this.m_itemCount = {}
        this.resetItemCount()
        this.m_UIs = this.add.group();
        this.drawItemUI()
        // 메인 카메라 이동
        this.cameras.main.startFollow(this.m_player)
        this.cameras.main.setLerp(1, 0); //y축으로는 안움직이게 

        //object group
        this.m_attacks = this.add.group(); //그룹으로 관리
        this.m_enemies = this.physics.add.group(); //그룹으로 관리
        this.m_items = this.add.group(); //그룹으로 관리

        // enemy
        this.enemyLevel = 1;
        this.arrowLevel = 1;
        this.addEnemy()
        // collisions
        // 공격(여기선 화살)과 적 충돌시
        this.physics.add.overlap(this.m_attacks, this.m_enemies, (attack, enemy): void => {
            (enemy as Enemy).hit((attack as Arrow), this.m_player.playerState.power)
        }, undefined, this);
        //플레이어와 적 충돌시
        this.physics.add.overlap(this.m_player, this.m_enemies, (player, enemy): void => {
            const enemy_ = enemy as Enemy // 이거 이렇게 밖에 못해?
            (player as Player).hitByEnemy(enemy_.damage);
        }, undefined, this);
        //플레이어와 아이템 충돌시
        this.physics.add.overlap(this.m_player, this.m_items, (player, item): void => {
            (item as Item).collected(player as Player);
        }, undefined, this);

        //에니메이션이 끝나는 시점에 화살발사, state변경해주기
        this.m_player.on("animationcomplete-shot", () => {
            this.add.arrow(this.m_player, Arrow.arrowStatList[this.arrowLevel])
            this.m_player.playerState.onAttack = false;
        })
    }


    update(time: number, delta: number) {
        // 게임 새로 시작할때 타임 0으로 안돼는 버그 있음
        if (!this.gameOver) {
            const timeLeft = this.timedEvent.getRemainingSeconds();
            this.timer.setText('Timer: ' + Math.round(timeLeft).toString())
            this.handlePlayerMove()
            this.m_background.setX(this.m_player.x - Config.width / 2) // 플레이어가 중앙이되는 배경위치설정
            this.m_background.tilePositionX = this.m_player.x * 2 // 타일의 시작지점이 플레이어의 위치에따라변경
        }

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
            this.m_player.anims.play("shot", true);

        }
        else {
            if (!isMove) {
                this.m_player.play('idle', true);
            } else {
                this.m_player.play('walk', true)
            }
        }
    }

    addEnemy() {
        this.addEnemyEvent = this.time.addEvent({
            delay: 2000,
            callback: () => {
                let [x, y] = getRandomPosition(this.m_player.x, this.m_player.y);
                this.m_enemies.add(this.add.enemy(x, y, Enemy.enemyStat[this.enemyLevel]));
            },
            loop: true,
        });
    }
    getItem(item: Item) {
        console.log(item.name);
    }
    resetItemCount() {
        for (let item of Item.itemList) {
            this.m_itemCount[item] = 0
            //.forEach((item)=> {.m_itemCount[item]=0})
        }
    }
    upgradeEnemy() {
        if (this.enemyLevel < 10) {
            this.enemyLevel += 1
        }
    }
    upgradeArrow() {
        if (this.arrowLevel < 10) {
            this.arrowLevel += 1
        }
    }
    upgradeDamage() {
        this.m_player.playerState.power += 0.2
    }
    upgradePet() { }
    drawItemUI() {
        this.m_UIs.clear(true)
        let x = 500
        let y = 15
        const xDist = 50
        const yDist = 20
        for (let item of Item.itemList) {
            this.m_UIs.add(this.add.image(x, y, item).setOrigin(0.5).setScale(0.5).setScrollFactor(0))
            this.m_UIs.add(this.add.bitmapText(x + xDist, y, "pixelFont", `x ${this.m_itemCount[item]}`, 20).setOrigin(0.5).setScrollFactor(0));
            y += yDist
        }
        console.log(this.m_itemCount)
    }
    winGame() {
        // 적 모두 제거, 승리bgm 재생, 플레이어 공격 중지, 5초 후 점수 창으로 이동
        this.gameOver = true
        this.time.removeAllEvents() // 모든 timer이벤트 삭제
        this.time.clearPendingEvents() //pending 중인 이벤트가 있으면 오류 생기기때문에 같이 제거해주어야한다
        this.m_enemies.destroy(true, true)//그룹내 오브젝트 모두 삭제
        this.m_player.play("idle")
        this.soundGroup.m_completeSound.play()// win 브금 재생

        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.goToGameOverScene(true)
            },//.bind(this),
            loop: true,
        })

    }
    loseGame() {
        // 적 모두 제거, 승리bgm 재생, 플레이어 공격 중지, 5초 후 점수 창으로 이동
        this.gameOver = true
        this.time.removeAllEvents()
        // this.addEnemyEvent.remove(false)// 적 더이상 나오지 않게하기, false를 주어 삭제할때 이벤트 작동안하도록 함(true면 삭제할때 이벤트발동)
        // this.m_enemies.destroy(true) //그룹내 오브젝트 모두 삭제
        // this.m_player.shootArrowEvent.remove(false) // 플레이어도 공격 멈추기
        this.m_player.playerState.onAttack = false
        this.m_player.play("dead", true)
        this.soundGroup.m_completeSound.play()// win 브금 재생
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.goToGameOverScene(false)
            },//.bind(this),
            loop: true,
        })
    }
    goToGameOverScene(isWin: boolean) {
        this.scene.start("gameoverScene", { itemCount: this.m_itemCount, timer: this.timer.text, isWin })
    }
}