package keeper

import (
	"context"

	"gchain/x/snow/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) StartGame(goCtx context.Context, msg *types.MsgStartGame) (*types.MsgStartGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	info, found := k.GetSystemInfo(ctx)
	if !found {
	}
	nextId := info.NextId
	game := types.Game{
		Id:           nextId,
		GameName:     msg.GameName,
		Player:       msg.Creator,
		Puzzle:       "",
		Deadline:     types.GameInit,
		BlockOutTime: "",
		BeforeIndex:  "-1",
		AfterIndex:   "-1",
		Status:       types.GamePlay,
	}
	k.SetGame(ctx, game)
	info.NextId = info.NextId + 1
	k.SetSystemInfo(ctx, info)

	return &types.MsgStartGameResponse{}, nil
}
