package simulation

import (
	"math/rand"

	"gchain/x/swap/keeper"
	"gchain/x/swap/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgSwapCoin(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgSwapCoin{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the SwapCoin simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "SwapCoin simulation not implemented"), nil, nil
	}
}
