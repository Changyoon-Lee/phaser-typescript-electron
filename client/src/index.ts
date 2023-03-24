import Phaser from 'phaser';
import config from './config';
import LoadAssetes from './scenes/LoadAssetes';
import PlayingScene from './scenes/Playing';
// import Stage from './scenes/Stage';
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssetes, PlayingScene]
  })
);
