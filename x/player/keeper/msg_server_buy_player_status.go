package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) BuyPlayerStatus(goCtx context.Context, msg *types.MsgBuyPlayerStatus) (*types.MsgBuyPlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgBuyPlayerStatusResponse{}, nil
}
