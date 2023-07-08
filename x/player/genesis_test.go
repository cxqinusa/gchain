package player_test

import (
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/testutil/nullify"
	"gchain/x/player"
	"gchain/x/player/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.PlayerKeeper(t)
	player.InitGenesis(ctx, *k, genesisState)
	got := player.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
