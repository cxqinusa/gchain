package keeper

import (
	"context"
	"strconv"

	"gchain/x/snow/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SolvePuzzle(goCtx context.Context, msg *types.MsgSolvePuzzle) (*types.MsgSolvePuzzleResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx
	id, err := strconv.ParseUint(msg.Id, 16, 64)
	if err != nil {

	}

	game, found := k.GetGame(ctx, id)
	if !found {

	}
	if game.Status != types.GamePlay {
		return nil, nil
	}
	if msg.Puzzle == "pojie" {
		tmp, _ := strconv.Atoi(game.Deadline)
		tmp = tmp + types.GameReward
		game.Deadline = strconv.Itoa(tmp)
	}
	if msg.Puzzle == "pause" {
		game.Status = types.GamePause
	}
	k.SetGame(ctx, game)
	return &types.MsgSolvePuzzleResponse{}, nil
}
