package keeper

import (
	"context"
	"errors"
	"gchain/x/swap/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SwapCoin(goCtx context.Context, msg *types.MsgSwapCoin) (*types.MsgSwapCoinResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return nil, err
	}

	if msg.AmountIn.Denom == "" || msg.AmountOutMin.Denom == "" {
		return nil, err
	}
	if msg.AmountIn.Amount.IsZero() || msg.AmountOutMin.Amount.IsZero() {
		return nil, err
	}

	var amountOut sdk.Coin
	if msg.AmountIn.Amount.GT(sdk.NewInt(0)) {
		amountOut = sdk.NewCoin(msg.AmountOutMin.Denom, msg.AmountIn.Amount)
	} else {
		return nil, errors.New("amount in amount must > 0")
	}

	if amountOut.IsGTE(msg.AmountOutMin) {
		err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, creator, sdk.Coins{amountOut})
		if err != nil {
			return nil, err
		}

		err = k.bankKeeper.SendCoinsFromAccountToModule(ctx, creator, types.ModuleName, sdk.Coins{msg.AmountIn})
		if err != nil {
			return nil, err
		}
	} else {
		return nil, errors.New("amount out less than amount out min")
	}

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, types.ModuleName),
			sdk.NewAttribute(sdk.AttributeKeySender, msg.Creator),
			sdk.NewAttribute("amount-out", amountOut.String()),
		),
	)

	return &types.MsgSwapCoinResponse{}, nil
}
