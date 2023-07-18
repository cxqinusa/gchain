package keeper

import (
	"context"
	"errors"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k msgServer) TransferPlayerStatus(goCtx context.Context, msg *types.MsgTransferPlayerStatus) (*types.MsgTransferPlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	store := ctx.KVStore(k.storeKey)

	// 检查 creator 的账户余额是否足够
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "invalid creator address")
	}

	if msg.Gamein != "lhc" || msg.Gameout != "snow" {
		return nil, errors.New("Only supports gamein is lhc, gameout is snow")
	}

	lhcdata := &types.Lhcdata{}

	//获取令狐冲生命值
	lhckey := []byte(types.LHCStatusKey + msg.Creator)
	lhcvalue := store.Get(lhckey)
	if lhcvalue == nil {
		return nil, sdkerrors.ErrInsufficientFunds
	}
	if err := k.cdc.Unmarshal(lhcvalue, lhcdata); err != nil {
		return nil, status.Error(codes.Internal, err.Error())
		//return &types.QueryReadPlayerStatusResponse{}, nil
	}
	amount := int32(msg.Amount)
	if lhcdata.Health < amount || lhcdata.Fighting < amount || lhcdata.Intelligence < amount {
		return nil, sdkerrors.ErrInsufficientFunds
	}

	//先扣除令狐冲生命值
	lhcdata.Health -= amount
	lhcdata.Fighting -= amount
	lhcdata.Intelligence -= amount

	newlhcdata, err := k.cdc.Marshal(lhcdata)
	if err != nil {
		return nil, err
	}

	///////////////////////////////////////////////////////////////////////////////////////
	snowdata := &types.Snowdata{}

	//添加丑小鸭生命值
	snowkey := []byte(types.SNOWStatusKey + msg.Creator)
	snowvalue := store.Get(snowkey)
	if snowvalue != nil {
		if err := k.cdc.Unmarshal(snowvalue, snowdata); err != nil {
			return nil, err
		}
	}
	snowdata.Address = msg.Creator
	snowdata.Health += amount
	snowdata.Fighting += amount

	newsnowdata, err := k.cdc.Marshal(snowdata)
	if err != nil {
		return nil, err
	}

	store.Set(lhckey, newlhcdata)
	store.Set(snowkey, newsnowdata)

	return &types.MsgTransferPlayerStatusResponse{1}, nil
}
