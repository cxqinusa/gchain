package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) UpdatePlayerStatus(goCtx context.Context, msg *types.MsgUpdatePlayerStatus) (*types.MsgUpdatePlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgUpdatePlayerStatusResponse{}, nil
}
