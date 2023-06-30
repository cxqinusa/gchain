import Phaser from 'phaser';
/*
import spaceURL from '../assets/boot/space.png'
import yellowURL from '../assets/boot/yellow.png'
import earthURL from '../assets/boot/earth+sword.png'
import musicURL from '../assets/boot/music.mp3'
import despngURL from '../assets/font/bitmap/desyrel.png'
import desxmlURL from '../assets/font/bitmap/desyrel.xml'
*/
let sprites = [];
// Overlay is Canvas Blend Modes
export default class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //this.load.setPath("../assets/");
        this.load.setPath("http://104.129.180.42/assets/");
        this.load.image('space', 'boot/space.png');
        this.load.image('yellow', 'boot/yellow.png');
        this.load.image('earth', 'boot/earth+sword.png');
        this.load.audio('music', 'boot/music.mp3');
        this.load.bitmapFont('desyrel', 'font/bitmap/desyrel.png', 'font/bitmap/desyrel.xml');
    }

    create ()
    {
        this.sound.play('music', { loop: true, volume: 0.05});
        this.add.image(0, 0, 'space').setScale(3.0);

        //  Create the particles
        for (var i = 0; i < 100; i++)
        {
            var x = Phaser.Math.Between(-64, 1200);
            var y = Phaser.Math.Between(-64, 800);

            var image = this.add.image(x, y, 'yellow');

            // image.setBlendMode(Phaser.BlendModes.OVERLAY);
            image.setBlendMode(Phaser.BlendModes.ADD);

            sprites.push({ s: image, r: 2 + Math.random() * 6 });
        }

        this.add.bitmapText(0, 0, 'desyrel', 'cosmos MVP, Click to connect and start.', 40);
        this.add.image(600, 350, 'earth').setBlendMode(Phaser.BlendModes.DIFFERENCE);

        //
        this.input.once('pointerdown', () => {
            this.sound.stopAll();
            this.scene.start('Intro');
        });
    }

    update ()
    {
        for (var i = 0; i < sprites.length; i++)
        {
            var sprite = sprites[i].s;

            sprite.y -= sprites[i].r;

            if (sprite.y < 0)
            {
                sprite.y = 800;
            }
        }
    }
};
