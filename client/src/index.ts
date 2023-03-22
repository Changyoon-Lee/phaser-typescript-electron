import Phaser from 'phaser';
import config from './config';
import Loading from './scenes/Loading';
import Stage from './scenes/Stage';
new Phaser.Game(
  Object.assign(config, {
    scene: [/**Loading,*/ Stage]
  })
);
