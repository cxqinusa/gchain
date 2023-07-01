import Track from './Track.js';
import Player from './Player.js';
import DataScene from './data.js'

export default class MainGame extends Phaser.Scene
{
    constructor ()
    {
        super('MainGame');

        this.player;
        this.tracks;

        this.score = 0;
        this.highscore = 0;
        this.infoPanel;

        this.scoreTimer;
        this.scoreText;
        this.highscoreText;
    }

    create ()
    {
        this.score = 0;
        this.highscore = this.registry.get('highscore');

        this.add.image(512, 384, 'background');

        this.tracks = [
            new Track(this, 0, 196),
            new Track(this, 1, 376),
            new Track(this, 2, 536),
            new Track(this, 3, 700)
        ];

        this.player = new Player(this, this.tracks[0]);

        this.add.image(0, 0, 'overlay').setOrigin(0);

        //this.add.image(16, 0, 'sprites', 'panel-score').setOrigin(0);
        //this.add.image(1024-16, 0, 'sprites', 'panel-best').setOrigin(1, 0);

        this.infoPanel = this.add.image(512, 384, 'sprites', 'controls');
        //this.scoreText = this.add.text(140, 2, this.score, { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        //this.highscoreText = this.add.text(820, 2, this.highscore, { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        this.input.keyboard.once('keydown-SPACE', this.start, this);
        //this.input.keyboard.once('keydown-UP', this.start, this);
        //this.input.keyboard.once('keydown-DOWN', this.start, this);

        //创建三个子场景，分别放在左上角和右上角
        this.scene.launch('DataScene');

        this.time.addEvent({
            delay: 1000, //随机延迟时间为 1000 毫秒
            callback: this.triggerChain, // 触发事件的回调函数
            callbackScope: this, // 回调函数的作用域
            loop: true // 设置为重复触发
        });
    }

    //定时调用数据上链
    triggerChain() {
        //10000毫秒调用一次
        window.snowParam.health -= 1;    //生命值：初始化100，每分钟自动减少60，捡到礼盒增加随机数
        window.snowParam.health = window.snowParam.health < 0 ? 0 : window.snowParam.health; //小于0就应该game over，这里为了测试，能够继续玩下去
        // 在父场景中调用子场景的方法，并传递数据
        // 这种调用不会阻塞父场景，是异步调用，父场景立马返回
        this.scene.get('DataScene').refreshData();
    }

    start ()
    {
        this.input.keyboard.removeAllListeners();

        this.tweens.add({
            targets: this.infoPanel,
            y: 700,
            alpha: 0,
            duration: 500,
            ease: 'Power2'
        });

        this.player.start();

        this.tracks[0].start(4000, 8000);
        this.tracks[1].start(500, 1000);
        this.tracks[2].start(5000, 9000);
        this.tracks[3].start(6000, 10000);
/*
        this.scoreTimer = this.time.addEvent({ delay: 1000, callback: () => {
            this.score++;
            this.scoreText.setText(this.score);
        }, callbackScope: this, repeat: -1 });
*/
    }

    gameOver ()
    {
        this.infoPanel.setTexture('gameover');

        this.tweens.add({
            targets: this.infoPanel,
            y: 384,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        this.tracks.forEach((track) => {
            track.stop();
        });

        this.sound.stopAll();
        this.sound.play('gameover');

        this.player.stop();

        this.scoreTimer.destroy();

        if (this.score > this.highscore)
        {
            this.highscoreText.setText('NEW!');

            this.registry.set('highscore', this.score);
        }

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MainMenu');
        }, this);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        }, this);
    }
}
