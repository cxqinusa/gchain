package snow

import (
	"math/rand"

	"gchain/testutil/sample"
	snowsimulation "gchain/x/snow/simulation"
	"gchain/x/snow/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = snowsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgStartGame = "op_weight_msg_start_game"
	// TODO: Determine the simulation weight value
	defaultWeightMsgStartGame int = 100

	opWeightMsgSolvePuzzle = "op_weight_msg_solve_puzzle"
	// TODO: Determine the simulation weight value
	defaultWeightMsgSolvePuzzle int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	snowGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&snowGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgStartGame int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgStartGame, &weightMsgStartGame, nil,
		func(_ *rand.Rand) {
			weightMsgStartGame = defaultWeightMsgStartGame
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgStartGame,
		snowsimulation.SimulateMsgStartGame(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgSolvePuzzle int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgSolvePuzzle, &weightMsgSolvePuzzle, nil,
		func(_ *rand.Rand) {
			weightMsgSolvePuzzle = defaultWeightMsgSolvePuzzle
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgSolvePuzzle,
		snowsimulation.SimulateMsgSolvePuzzle(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
