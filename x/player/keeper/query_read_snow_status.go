package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) ReadSnowStatus(goCtx context.Context, req *types.QueryReadSnowStatusRequest) (*types.QueryReadSnowStatusResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	store := ctx.KVStore(k.storeKey)
	key := []byte(types.SNOWStatusKey + req.Address)
	value := store.Get(key)
	if value == nil {
		//这个是正常情况，因为还没购买
		return &types.QueryReadSnowStatusResponse{}, nil
	}

	snowdata := &types.Snowdata{}
	if err := k.cdc.Unmarshal(value, snowdata); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return &types.QueryReadSnowStatusResponse{Snow: snowdata}, nil

}
