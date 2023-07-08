package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ReadPlayerStatus(goCtx context.Context, req *types.QueryReadPlayerStatusRequest) (*types.QueryReadPlayerStatusResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	store := ctx.KVStore(k.storeKey)
	key := []byte(types.LHCStatusKey + req.Address)
	value := store.Get(key)
	if value == nil {
		//这个是正常情况，因为还没购买
		//return &types.QueryReadPlayerStatusResponse{}, sdkerrors.ErrKeyNotFound
		return &types.QueryReadPlayerStatusResponse{}, nil
	}

	lhcdata := &types.Lhcdata{}
	if err := k.cdc.Unmarshal(value, lhcdata); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
		//return &types.QueryReadPlayerStatusResponse{}, nil
	}
	return &types.QueryReadPlayerStatusResponse{Lhc: lhcdata}, nil
}
