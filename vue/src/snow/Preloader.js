import {env} from "@/env";
import gchain from "@/config/gchain";
import {SigningStargateClient} from "@cosmjs/stargate";
import axios from "axios";


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
    const queryPath = "/gchain/player/read_snow_status/{address}";

    // 构造完整的请求 URL
    const requestURL = `${gchain.rest}${queryPath.replace("{address}", encodeURIComponent(window.keplrClient.address))}`;

    let snowResult;
    // 发起 GET 请求并获取数据
    axios.get(requestURL)
        .then(response => {
            // 在这里对返回的数据进行处理或者输出
            //console.dir("snow-status:"+JSON.stringify(response));
            console.dir("snow-status:"+JSON.stringify(response.data));
            // 处理响应数据
            snowResult = response.data.snow;

            if(snowResult==null){
                showAlert('温馨提示：丑小鸭没有生命值，请先购买！');
            }else{
                const healthString = response.data.snow.health;
                const fightingString = response.data.snow.fighting;
                const healthInt = parseInt(healthString, 10); // 转换为十进制整数
                const fightingInt = parseInt(fightingString, 10);

                if(healthInt<=0 || fightingInt<=0){
                    showAlert('温馨提示：丑小鸭的生命值不够，请先购买！');
                }else{
                    window.snowParam.health = healthInt;
                    window.snowParam.fighting = fightingInt;
                    //
                    this.scene.start('MainGame');
                }
            }
        })
        .catch(error => {
            // 处理请求错误
            console.error("Failed to fetch data:", error);
        });
    return snowResult;
}

export default class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');

        this.loadText;
    }

    preload ()
    {
        this.loadText = this.add.text(512, 360, '丑小鸭大战雪人', { fontFamily: 'Arial', fontSize: 74, color: '#e3f2ed' });
        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        this.load.setPath(env.assetPath+'snowmen/');
        this.load.image([ 'background', 'overlay', 'gameover', 'title' ]);
        this.load.atlas('sprites', 'sprites.png', 'sprites.json');
        this.load.glsl('snow', 'snow.glsl.js');

        //  Audio ...
        this.load.setPath(env.assetPath+'snowmen/sounds/');

        this.load.audio('music', [ 'music.ogg', 'music.m4a', 'music.mp3' ]);
        this.load.audio('throw', [ 'throw.ogg', 'throw.m4a', 'throw.mp3' ]);
        this.load.audio('move', [ 'move.ogg', 'move.m4a', 'move.mp3' ]);
        this.load.audio('hit-snowman', [ 'hit-snowman.ogg', 'hit-snowman.m4a', 'hit-snowman.mp3' ]);
        this.load.audio('gameover', [ 'gameover.ogg', 'gameover.m4a', 'gameover.mp3' ]);
    }

    create ()
    {
        //  Create our global animations

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'die', start: 0, end: 0, zeroPad: 3 })
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'idle', start: 0, end: 3, zeroPad: 3 }),
            yoyo: true,
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'throwStart',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'throw', start: 0, end: 8, zeroPad: 3 }),
            frameRate: 26
        });

        this.anims.create({
            key: 'throwEnd',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'throw', start: 9, end: 11, zeroPad: 3 }),
            frameRate: 26
        });

        this.anims.create({
            key: 'snowmanIdleBig',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-big-idle', start: 0, end: 3 }),
            yoyo: true,
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'snowmanWalkBig',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-big-walk', start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'snowmanThrowStartBig',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-big-throw', start: 0, end: 5 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'snowmanThrowEndBig',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-big-throw', start: 6, end: 8 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'snowmanDieBig',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-big-die', start: 0, end: 4 }),
            frameRate: 14
        });

        this.anims.create({
            key: 'snowmanIdleSmall',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-small-idle', start: 0, end: 3 }),
            yoyo: true,
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'snowmanWalkSmall',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-small-walk', start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'snowmanThrowStartSmall',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-small-throw', start: 0, end: 5 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'snowmanThrowEndSmall',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-small-throw', start: 6, end: 8 }),
            frameRate: 20
        });

        this.anims.create({
            key: 'snowmanDieSmall',
            frames: this.anims.generateFrameNames('sprites', { prefix: 'snowman-small-die', start: 0, end: 4 }),
            frameRate: 14
        });

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
}
