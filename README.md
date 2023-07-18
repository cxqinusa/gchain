# gchain
**gchain** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

### Install
To install go v1.19.10, node V18.16.1 and ignite v0.26.1, execute the following command on your machine:

```
wget https://go.dev/dl/go1.19.10.linux-amd64.tar.gz
wget https://nodejs.org/dist/v18.16.1/node-v18.16.1-linux-x64.tar.xz
wget https://github.com/ignite/cli/releases/download/v0.26.1/ignite_0.26.1_linux_amd64.tar.gz
```
`username/gchain` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).


## Get started

```
ignite chain serve --home ./build/data
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Ignite CLI has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd ts-client
npm install
cd vue
npm install
npm run dev
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Ignite front-end development](https://github.com/ignite/web).


## 初始化链数据

你需要初始化链数据才能玩令狐冲和丑小鸭游戏，请按照以下步骤初始化:

```
铸造lhc和snow代币:
    gchaind tx swap mint-coins 21000000lhc  --from admin --home ./build/data -y
    gchaind tx swap mint-coins 21000000snow --from admin --home ./build/data -y
    
分发代币给admin账号:    
    gchaind tx swap distribute-coins cgt12ltvts09ga3gj32hsmnwq922ze0gmk4t6vhwne 3000000lhc  --from admin --home ./build/data -y
    gchaind tx swap distribute-coins cgt12ltvts09ga3gj32hsmnwq922ze0gmk4t6vhwne 5000000snow --from admin --home ./build/data -y

添加流动性池子:
    gchaind tx swap add-liquidity 10000cgt 10000lhc  --from admin --home ./build/data -y
    gchaind tx swap add-liquidity 20000cgt 20000snow --from admin --home ./build/data -y
    
然后,
使用以下助记词登录keplr钱包:
    recipe swallow width erode tunnel army abstract lend pottery twist 
    excite panic guide mind churn lazy garlic equip grab lonely sign solution deer buzz

你将有1500个cgt代币
最后,
你可以通过首页的swap按钮，将cgt代币swap到lhc，然后用lhc购买令狐冲生命值，然后用令狐冲生命值兑换成丑小鸭生命值。
恭喜你！！！
```

## 先睹为快
<img width="1000" src="img/lhc.png">


## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)
