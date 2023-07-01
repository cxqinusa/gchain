import Phaser from 'phaser';
import {SpineTask} from "./task";
import {env} from "@/env";

export default class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('PuzzleScene');
    }

    taskIndex;

    preload() {
        this.load.setPath(env.assetPath);
        this.load.audio('got', 'treasure/got.m4a');
        this.load.audio('fail', 'treasure/fail.m4a');
        this.load.image('puzzle-1', 'puzzle/puzzle-1.png');
        this.load.image('puzzle-2', 'puzzle/puzzle-2.png');
    }

    create() {
        this.taskIndex = 0;
        SpineTask.taskArray.forEach((element, index) => {
            if (element.type === 'puzzle' && element.taskhandleStatus == SpineTask.USEStatus.USING) {
                this.taskIndex = index;
            }
        });
        //
        let puzzleName = '';
        if (SpineTask.taskArray[this.taskIndex].nft == '武器') {
            puzzleName = 'puzzle-1';
        } else if (SpineTask.taskArray[this.taskIndex].nft == '宝盒') {
            puzzleName = 'puzzle-2';
        }
        this.add.image(375, 125, puzzleName).setOrigin(0.10, 0.10);

        const keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        const keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        const keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //30秒钟答对谜题，算谜题失败，扣除智力值
        const timeId = setTimeout(() => {
            console.log('puzzle timeout.');
            this.sound.play('fail');
            this.scene.stop('PuzzleScene'); //关闭自己场景
            this.scene.resume('Game');        //将父场景恢复起来
        }, 30 * 1000);

        setTimeout(() => {
            //设置延迟的目的是因为父场景的A和D是左右走动的按键，一旦接入这个场景，A和D会被这个场景捕捉
            this.input.keyboard.on('keydown', (event) => {
                console.log('Key pressed:', event.key);
                let bCorrect = false;

                if ((event.key === 'a' || event.key === 'A') && keyA.isDown) {
                    if (SpineTask.taskArray[this.taskIndex].answer === 'A') {
                        bCorrect = true;
                    }
                    console.log('Key A is pressed, match:', bCorrect);
                } else if ((event.key === 'b' || event.key === 'B') && keyB.isDown) {
                    if (SpineTask.taskArray[this.taskIndex].answer === 'B') {
                        bCorrect = true;
                    }
                    console.log('Key B is pressed, match:', bCorrect);
                } else if ((event.key === 'c' || event.key === 'C') && keyC.isDown) {
                    if (SpineTask.taskArray[this.taskIndex].answer === 'C') {
                        bCorrect = true;
                    }
                    console.log('Key C is pressed, match:', bCorrect);
                } else if ((event.key === 'd' || event.key === 'D') && keyD.isDown) {
                    if (SpineTask.taskArray[this.taskIndex].answer === 'D') {
                        bCorrect = true;
                    }
                    console.log('Key D is pressed, match:', bCorrect);
                } else {
                    return;
                }
                if (bCorrect) {
                    SpineTask.taskArray[this.taskIndex].taskSuccessful = true;
                    this.sound.play('got');
                } else {
                    this.sound.play('fail');
                }
                clearTimeout(timeId);
                this.scene.stop('PuzzleScene'); //关闭自己场景
                this.scene.resume('Game');        //将父场景恢复起来
            });

        },5000);
    }
};
