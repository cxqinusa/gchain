import Phaser from 'phaser';
import {env} from "@/env";
import gchain from "../config/gchain";
import {SigningStargateClient} from "@cosmjs/stargate";

/*
import spaceURL from '../assets/boot/space.png'
import yellowURL from '../assets/boot/yellow.png'
import earthURL from '../assets/boot/earth+sword.png'
import musicURL from '../assets/boot/music.mp3'
import despngURL from '../assets/font/bitmap/desyrel.png'
import desxmlURL from '../assets/font/bitmap/desyrel.xml'
*/
let sprites = [];

async function tryToConnectKeplr() {
    console.log('begin tryToConnectKeplr');

    if(!window.keplr){
        alert('Please install keplr extension.')
    }else{
        const chainId = gchain.chainId;

        console.log('step1');
        await window.keplr.experimentalSuggestChain(gchain);
        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);

        console.log('step2');
        const offlineSigner = window.keplr.getOfflineSigner(chainId);

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();

        const client = await SigningStargateClient.connectWithSigner(gchain.rpc,offlineSigner);
        console.log('keplr address:'+accounts[0].address);
        window.keplrClient.address = accounts[0].address;
        window.keplrClient.client = client;
    }
    return window.keplrClient.client==null?false:true;
}

// Overlay is Canvas Blend Modes
export default class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.setPath(env.assetPath);
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
        this.input.on('pointerdown', async () => {

            //连接钱包
            const keplrConnected = await tryToConnectKeplr();
            console.log('tryToConnectKeplr:'+keplrConnected);
            if(keplrConnected){

                //调用后台获取令狐冲生命值

                this.sound.stopAll();
                this.scene.start('Intro');
            }
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
