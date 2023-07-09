package simulation

import (
	"math/rand"

	"gchain/x/snow/keeper"
	"gchain/x/snow/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgSolvePuzzle(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgSolvePuzzle{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the SolvePuzzle simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "SolvePuzzle simulation not implemented"), nil, nil
	}
}
