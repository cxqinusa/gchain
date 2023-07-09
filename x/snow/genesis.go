package snow

import (
	"gchain/x/snow/keeper"
	"gchain/x/snow/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set if defined
	if genState.SystemInfo != nil {
		k.SetSystemInfo(ctx, *genState.SystemInfo)
	}
	// Set all the game
	for _, elem := range genState.GameList {
		k.SetGame(ctx, elem)
	}

	// Set game count
	k.SetGameCount(ctx, genState.GameCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// Get all systemInfo
	systemInfo, found := k.GetSystemInfo(ctx)
	if found {
		genesis.SystemInfo = &systemInfo
	}
	genesis.GameList = k.GetAllGame(ctx)
	genesis.GameCount = k.GetGameCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
