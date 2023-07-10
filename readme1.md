# 接口
## 创建游戏
```
./ignite scaffold message start-game gameName --module snow --response id:uint -y
// 验证
/go/bin/gchaind tx snow start-game linghuchong --from alice -y

```

## 破解谜题，游戏暂停
```
./ignite scaffold message solve-puzzle id puzzle --module snow  -y
// 破解谜题
/go/bin/gchaind tx snow solve-puzzle 2 pojie --from alice -y
// 暂停游戏
/go/bin/gchaind tx snow solve-puzzle 0 pause --from alice -y
```

# 安全
## 出块阶段计算play状态游戏的生命值
```
// module.go 计算
// 所有游戏进行遍历，计算游戏两次出块的时间差
// 因为演示，数据量较小，所以没有做性能处理
func (am AppModule) EndBlock(ctx sdk.Context, _ abci.RequestEndBlock) []abci.ValidatorUpdate {
	games := am.keeper.GetAllGame(ctx)

	for i := 0; i < len(games); i++ {
		game := games[i]
		cur := time.Now().Unix()

		if game.Status == types.GamePlay {
			if game.BlockOutTime != "" {

				st := game.BlockOutTime
				t, _ := strconv.ParseInt(st, 10, 64)
				cur = time.Now().Unix()
				dt := cur - t
				sg := game.Deadline
				ig, _ := strconv.Atoi(sg)
				dl := ig - int(dt)/2
				if dl < 0 {
					game.Status = types.GameEnd
					game.Deadline = "0"
				} else {
					game.Deadline = strconv.Itoa(dl)
				}

			}
			tmp := strconv.FormatInt(cur, 10)
			game.BlockOutTime = tmp
		}
		am.keeper.SetGame(ctx, game)
	}

	return []abci.ValidatorUpdate{}
}
```
