import Phaser from 'phaser';
import {env} from "@/env";
import gchain from "../config/gchain";
import {SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";

/*
import spaceURL from '../assets/boot/space.png'
import yellowURL from '../assets/boot/yellow.png'
import earthURL from '../assets/boot/earth+sword.png'
import musicURL from '../assets/boot/music.mp3'
import despngURL from '../assets/font/bitmap/desyrel.png'
import desxmlURL from '../assets/font/bitmap/desyrel.xml'
*/
let sprites = [];

function showAlert(message) {
    const alertElement = document.createElement('div');
    alertElement.className = 'centered-alert';
    alertElement.textContent = message;
    document.body.appendChild(alertElement);

    setTimeout(() => {
        alertElement.remove();
    }, 1000);
}

async function tryToConnectKeplr() {
    console.log('begin tryToConnectKeplr');

    if (!window.keplr) {
        alert('Please install keplr extension.')
    } else {
        const chainId = gchain.chainId;

        await window.keplr.experimentalSuggestChain(gchain);
        // Enabling before using the Keplr is recommended.
        // This method will ask the user whether to allow access if they haven't visited this website.
        // Also, it will request that the user unlock the wallet if the wallet is locked.
        await window.keplr.enable(chainId);

        const offlineSigner = window.keplr.getOfflineSigner(chainId);

        // You can get the address/public keys by `getAccounts` method.
        // It can return the array of address/public key.
        // But, currently, Keplr extension manages only one address/public key pair.
        // XXX: This line is needed to set the sender address for SigningCosmosClient.
        const accounts = await offlineSigner.getAccounts();
        console.log('keplr address:' + accounts[0].address);

        const signingClient = await SigningStargateClient.connectWithSigner(gchain.rpc, offlineSigner);
        window.keplrClient.signingClient = signingClient;
        window.keplrClient.address = accounts[0].address;
    }
    return window.keplrClient.signingClient == null ? false : true;
}

async function tryToReadPlayStatus() {

    //调用后台获取令狐冲生命值
    // 调用 queryReadPlayerStatus 方法
    const queryPath = "/gchain/player/read_player_status/{address}";

   // window.keplrClient.address = "cgt1y5mfkqj9lckv6qsvk7ls6dm32qnjat0w54wz5r";
    // 构造完整的请求 URL
    const requestURL = `${gchain.rest}${queryPath.replace("{address}", encodeURIComponent(window.keplrClient.address))}`;

    let lhcResult;
    // 发起 GET 请求并获取数据
    axios.get(requestURL)
        .then(response => {
            // 在这里对返回的数据进行处理或者输出
            //console.dir("play-status:"+JSON.stringify(response));
            console.dir("play-status:"+JSON.stringify(response.data));
            // 处理响应数据
            lhcResult = response.data.lhc;

            if(lhcResult==null){
                showAlert('温馨提示：令狐冲没有生命值，请先购买！');
            }else{
                const healthString = response.data.lhc.health;
                const intelligenceString = response.data.lhc.intelligence;
                const fightingString = response.data.lhc.fighting;
                const healthInt = parseInt(healthString, 10); // 转换为十进制整数
                const intelligenceInt = parseInt(intelligenceString, 10);
                const fightingInt = parseInt(fightingString, 10);

                if(healthInt<=0 || intelligenceInt<=0 || fightingInt<=0){
                    showAlert('温馨提示：令狐冲的生命值不够，请先购买！');
                }else{
                    window.customParam.health = healthInt;
                    window.customParam.intelligence = intelligenceInt;
                    window.customParam.fighting = fightingInt;
                    //
                    this.sound.stopAll();
                    this.scene.start('Intro');
                }
            }
        })
        .catch(error => {
            // 处理请求错误
            console.error("Failed to fetch data:", error);
        });
    return lhcResult;
}

// Overlay is Canvas Blend Modes
export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.setPath(env.assetPath);
        this.load.image('space', 'boot/space.png');
        this.load.image('yellow', 'boot/yellow.png');
        this.load.image('earth', 'boot/earth+sword.png');
        this.load.audio('music', 'boot/music.mp3');
        this.load.bitmapFont('desyrel', 'font/bitmap/desyrel.png', 'font/bitmap/desyrel.xml');

    }

    create() {
        this.sound.play('music', {loop: true, volume: 0.05});
        this.add.image(0, 0, 'space').setScale(3.0);

        //  Create the particles
        for (var i = 0; i < 100; i++) {
            var x = Phaser.Math.Between(-64, 1200);
            var y = Phaser.Math.Between(-64, 800);

            var image = this.add.image(x, y, 'yellow');

            // image.setBlendMode(Phaser.BlendModes.OVERLAY);
            image.setBlendMode(Phaser.BlendModes.ADD);

            sprites.push({s: image, r: 2 + Math.random() * 6});
        }

        this.add.bitmapText(0, 0, 'desyrel', 'cosmos MVP, Click to connect and start.', 40);
        this.add.image(600, 350, 'earth').setBlendMode(Phaser.BlendModes.DIFFERENCE);

        //
        this.input.on('pointerdown', async () => {

            //连接钱包
            const keplrConnected = await tryToConnectKeplr();
            console.log('tryToConnectKeplr:' + keplrConnected);
            if (keplrConnected) {
                await tryToReadPlayStatus.call(this); // 使用 call 方法绑定上下文
            }
        });
    }

    update() {
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i].s;

            sprite.y -= sprites[i].r;

            if (sprite.y < 0) {
                sprite.y = 800;
            }
        }
    }

};
