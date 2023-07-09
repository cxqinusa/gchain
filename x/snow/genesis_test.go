package snow_test

import (
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/testutil/nullify"
	"gchain/x/snow"
	"gchain/x/snow/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		SystemInfo: &types.SystemInfo{
			NextId: 16,
			Left:   "5",
			Right:  "3",
		},
		GameList: []types.Game{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		GameCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.SnowKeeper(t)
	snow.InitGenesis(ctx, *k, genesisState)
	got := snow.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.SystemInfo, got.SystemInfo)
	require.ElementsMatch(t, genesisState.GameList, got.GameList)
	require.Equal(t, genesisState.GameCount, got.GameCount)
	// this line is used by starport scaffolding # genesis/test/assert
}
