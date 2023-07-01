import Phaser from 'phaser';
import {env} from "@/env";

export default class Intro extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    preload() {
        this.load.setPath(env.assetPath);
        this.load.audio('shock', 'intro/shock.m4a');
        this.load.image('prelude', 'intro/prelude.jpg');
        this.load.bitmapFont('atari', 'intro/atari-smooth.png', 'intro/atari-smooth.xml');
        this.load.bitmapFont('desyrel', 'intro/desyrel.png', 'intro/desyrel.xml');
    }

    create() {
        this.sound.play('shock', {loop: false, volume: 0.20});
        this.add.image(80, 0, 'prelude').setOrigin(0.10, 0.10);

        /*
        const content = [
            "",
            "",
            "",
            "",
            "On a stormy night, lightning flashed across the sky, followed by a deafening thunderclap.",
            "At this moment, Linghu Chong was born into a martial arts family.",
            "Linghu Chong, his sword will split the sky, and his name will resound throughout the martial arts world!",
            "",
            "Class 6 -> Cosmos Chinese Training Phase II "
        ];

        this.scroller = this.add.dynamicBitmapText(16, 600, 'desyrel', content, 24);
        this.scroller.setSize(1000, 200);
   */
        const content = "在风雨交加的一个夜晚，\n天空中闪电划过，随后响起了一声震耳欲聋的雷鸣。\n就在这时，令狐冲降生于一个武林世家。\n令狐冲，\n他的剑将劈开苍穹，他的名字将响彻武林! \nCosmos中文培训二期六班!";
        this.introduce = this.add.text(0, 800, content,
            {fontFamily: 'Arial Black', fontSize: 20, color: '#d2b170', align: 'left', fontStyle: 'italic'})
            .setStroke('#555555', 20);

        this.time.addEvent({
            delay: 85, //随机延迟时间为 120 毫秒
            callback: this.moveIntroduce, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });

        //
        this.input.once('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('Game');
        });
    }

    //定时移动控件
    moveIntroduce() {
        //console.log('intro:x=', this.introduce.x, ',y=', this.introduce.y);
        this.introduce.y -= 2;
        if (this.introduce.y <= 530) {
            this.sound.stopAll();
            this.scene.start('Game');
        }
    }

    /*
    update (time, delta)
    {
        this.scroller.scrollY += 0.06 * delta;
        if (this.scroller.scrollY > 800)
        {
            this.sound.stopAll();
            this.scene.start('Game');
        }

    }
     */
};
