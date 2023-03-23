import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,//WebGL or Canvas
  physics: {//물리엔진
      default: 'matter',
      debug:true, // 디버깅 사용
  },
  scale: {
    mode: Phaser.Scale.FIT, //자동맞춤
    autoCenter: Phaser.Scale.CENTER_BOTH, //가로세로 모두 중앙 맞춤
    width: window.innerWidth,
    height: window.innerHeight,
  },
};
export default config;