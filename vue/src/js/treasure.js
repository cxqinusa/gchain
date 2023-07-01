import Phaser from 'phaser';
import {SpineTask} from "./task";
import {env} from "@/env";

// Overlay is Canvas Blend Modes
export default class TreasureScene extends Phaser.Scene {

    taskIndex;

    constructor() {
        super('TreasureScene');
    }

    preload() {
        this.load.setPath(env.assetPath);
        this.load.audio('got', 'treasure/got.m4a');
        this.load.audio('fail', 'treasure/fail.m4a');
        this.load.image('gold', ['treasure/gold.png', 'treasure/gold-n.png']);
        this.load.image('robot', ['treasure/equality-by-ragnarok.png', 'treasure/equality-by-ragnarok_n.png']);
        this.load.image('treasure-1', 'treasure/treasure-1.png');
        this.load.image('treasure-2', 'treasure/treasure-2.png');
        this.load.image('treasure-3', 'treasure/treasure-3.png');
    }

    create() {
        this.taskIndex = 0;
        SpineTask.taskArray.forEach((element, index) => {
            if (element.type === 'treasure' && element.taskhandleStatus == SpineTask.USEStatus.USING) {
                this.taskIndex = index;
            }
        });
        //  Enable lights and set a dark ambient color
        //this.lights.enable().setAmbientColor(0x333333);
        this.lights.enable().setAmbientColor(0x000011);

        //  Add an image and set it to use Lights2D
        let robotorgold = undefined;
        const rnd = Phaser.Math.Between(1, 100) % 2;
        if (rnd == 0) {
            robotorgold = this.add.image(0, 0, 'robot').setOrigin(0).setScale(0.75);
        } else {
            robotorgold = this.add.image(0, 0, 'gold').setOrigin(0).setScale(1.25);
        }
        robotorgold.setPipeline('Light2D');
        //  Our spotlight. 100px radius and white in color.
        const light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

        //
        const randomx = Phaser.Math.Between(0, 1000);
        const randomy = Phaser.Math.Between(0, 600);
        //
        let treasureName = '';
        if (SpineTask.taskArray[this.taskIndex].nft == '九阴真经') {
            treasureName = 'treasure-1';
        } else if (SpineTask.taskArray[this.taskIndex].nft == '葵花宝典') {
            treasureName = 'treasure-2';
        } else if (SpineTask.taskArray[this.taskIndex].nft == '黯然销魂掌') {
            treasureName = 'treasure-3';
        }
        this.treasure = this.add.image(randomx + 100, randomy + 100, treasureName).setScale(0.55);
        this.treasure.setPipeline('Light2D');
        console.log('treasure:name=', treasureName, ',x=', this.treasure.x, ',y=', this.treasure.y);

        //  Track the pointer
        this.input.on('pointermove', pointer => {
            light.x = pointer.x;
            light.y = pointer.y;
        });

        //30秒钟没有找到宝藏，算寻宝失败，扣除战斗力
        const timeId = setTimeout(() => {
            console.log('treasure timeout.');
            this.sound.play('fail');
            this.scene.stop('TreasureScene'); //关闭自己场景
            this.scene.resume('Game');        //将父场景恢复起来
        }, 30 * 1000);

        //没有点击到宝藏位置，不退出
        this.input.on('pointerdown', () => {
            const thresholdDistance = 60;
            const distance = Phaser.Math.Distance.Between(light.x, light.y, this.treasure.x, this.treasure.y);
            console.log('distinct=', distance, 'light.x=', light.x, ',light.y=', light.y, 'treasure.x=', this.treasure.x, ',treasure.y=', this.treasure.y);
            if (distance < thresholdDistance) {
                SpineTask.taskArray[this.taskIndex].taskSuccessful = true;
                clearTimeout(timeId);
                this.sound.play('got');
                this.scene.stop('TreasureScene'); //关闭自己场景
                this.scene.resume('Game');        //将父场景恢复起来
            }
        });
    }
};
