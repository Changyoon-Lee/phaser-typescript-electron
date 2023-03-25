import Phaser from 'phaser';
import config from './config';
import LoadAssets from './scenes/LoadAssets';
import PlayingScene from './scenes/PlayingScene';
// import Stage from './scenes/Stage';
new Phaser.Game(
  Object.assign(config, {
    scene: [LoadAssets, PlayingScene]
  })
);
