package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) UpdatePlayerStatus(goCtx context.Context, msg *types.MsgUpdatePlayerStatus) (*types.MsgUpdatePlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	lhcdata := &types.Lhcdata{}

	// TODO: Handling the message
	store := ctx.KVStore(k.storeKey)
	key := []byte(types.LHCStatusKey + msg.Creator)
	value := store.Get(key)
	if value == nil {
		//return &types.QueryReadPlayerStatusResponse{}, sdkerrors.ErrKeyNotFound
		return &types.MsgUpdatePlayerStatusResponse{0}, nil
	}
	if err := k.cdc.Unmarshal(value, lhcdata); err != nil {
		return nil, err
	}

	lhcdata.Address = msg.Creator
	lhcdata.Health = int32(msg.Lhc.Health)
	lhcdata.Fighting = int32(msg.Lhc.Fighting)
	lhcdata.Intelligence = int32(msg.Lhc.Intelligence)

	//避免生命值小于0 - 简化处理
	if lhcdata.Health < 0 {
		lhcdata.Health = 0
	}
	if lhcdata.Fighting < 0 {
		lhcdata.Fighting = 0
	}
	if lhcdata.Intelligence < 0 {
		lhcdata.Intelligence = 0
	}

	newdata, err := k.cdc.Marshal(lhcdata)
	if err != nil {
		return nil, err
	}
	store.Set(key, newdata)

	return &types.MsgUpdatePlayerStatusResponse{1}, nil
}
