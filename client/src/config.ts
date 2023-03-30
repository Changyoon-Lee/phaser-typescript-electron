import Phaser from 'phaser';
interface GameConfig extends Phaser.Types.Core.GameConfig {
  width: number
  height: number
}
const config: GameConfig = {
  type: Phaser.AUTO,//WebGL or Canvas
  width: 900,
  height: 600,
  physics: {//물리엔진
    default: 'arcade',
    arcade: {
      debug: true
    }, // 디버깅 사용
  },
  scale: {
    mode: Phaser.Scale.FIT, //자동맞춤
    autoCenter: Phaser.Scale.CENTER_BOTH, //가로세로 모두 중앙 맞춤
    // width: window.innerWidth,
    // height: window.innerHeight,
  },
};
export default config;