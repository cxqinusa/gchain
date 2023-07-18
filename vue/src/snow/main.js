import Phaser from "phaser";

import Boot from './Boot.js';
import Preloader from './Preloader.js';
import MainGame from './Game.js';
import {SnowParams} from "./param.js";
import DataScene from './data.js';
import {KeplrClient} from "@/lhc/task";

export function initGame(){
    console.log('initGame snow...');
    // 创建全局变量并实例化 CustomParams
    window.snowParam = new SnowParams(0,0);
    window.keplrClient = new KeplrClient(null,'');
    const config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 768,
        backgroundColor: '#3366b2',
        parent: 'game-container',
        scene: [ Boot, Preloader, MainGame, DataScene],
        physics: {
            default: 'arcade',
            arcade: { debug: false }
        }
    };

    let game = new Phaser.Game(config);
    return game;
}

export function stopGame(game){
    console.log('stopGame snow...');
    game.destroy(true);
}



