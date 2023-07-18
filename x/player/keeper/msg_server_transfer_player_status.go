package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) TransferPlayerStatus(goCtx context.Context, msg *types.MsgTransferPlayerStatus) (*types.MsgTransferPlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgTransferPlayerStatusResponse{}, nil
}
