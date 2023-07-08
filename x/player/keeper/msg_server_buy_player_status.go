package keeper

import (
	"context"

	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) BuyPlayerStatus(goCtx context.Context, msg *types.MsgBuyPlayerStatus) (*types.MsgBuyPlayerStatusResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	// 检查 creator 的账户余额是否足够
	creatorAddress, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "invalid creator address")
	}
	adminAddress, err := sdk.AccAddressFromBech32(types.AdminAddress) //k.GetParams(ctx).Admin
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "invalid admin address")
	}

	// 检查账户余额
	if err := k.CheckBalance(ctx, creatorAddress, msg.Denom, msg.Amount); err != nil {
		return nil, err
	}

	// 扣除账户余额
	if err := k.DeductBalance(ctx, creatorAddress, adminAddress, msg.Denom, msg.Amount); err != nil {
		return nil, err
	}

	lhcdata := &types.Lhcdata{}

	//添加令狐冲生命值
	store := ctx.KVStore(k.storeKey)
	key := []byte(types.LHCStatusKey + msg.Creator)
	value := store.Get(key)
	if value != nil {
		if err := k.cdc.Unmarshal(value, lhcdata); err != nil {
			return nil, err
		}
	}
	lhcdata.Address = msg.Creator
	lhcdata.Health += int32(msg.Amount)
	lhcdata.Fighting += int32(msg.Amount)
	lhcdata.Intelligence += int32(msg.Amount)

	newdata, err := k.cdc.Marshal(lhcdata)
	if err != nil {
		return nil, err
	}
	store.Set(key, newdata)

	return &types.MsgBuyPlayerStatusResponse{lhcdata}, nil
}

func (k msgServer) CheckBalance(ctx sdk.Context, creator sdk.AccAddress, denom string, amount uint64) error {
	// 获取账户余额
	balance := k.bankKeeper.GetBalance(ctx, creator, denom)
	if balance.IsZero() {
		return sdkerrors.ErrInsufficientFunds // 账户余额不足
	}

	// 检查账户余额是否大于等于指定的金额
	if balance.Amount.LT(sdk.NewIntFromUint64(amount)) {
		return sdkerrors.ErrInsufficientFunds // 账户余额不足
	}

	return nil
}

func (k msgServer) DeductBalance(ctx sdk.Context, creator sdk.AccAddress, admin sdk.AccAddress, denom string, amount uint64) error {

	// 把代币转到admin账号
	// 扣除账户余额
	coins := sdk.NewCoins(sdk.NewCoin(denom, sdk.NewIntFromUint64(amount)))
	//err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, creator, types.AdminAddress, coins) //banktypes.ModuleName
	err := k.bankKeeper.SendCoins(ctx, creator, admin, coins)
	if err != nil {
		return err // 扣除账户余额失败
	}

	return nil
}
