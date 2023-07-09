package keeper_test

import (
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/testutil/nullify"
	"gchain/x/snow/keeper"
	"gchain/x/snow/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
)

func createNGame(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Game {
	items := make([]types.Game, n)
	for i := range items {
		items[i].Id = keeper.AppendGame(ctx, items[i])
	}
	return items
}

func TestGameGet(t *testing.T) {
	keeper, ctx := keepertest.SnowKeeper(t)
	items := createNGame(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetGame(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestGameRemove(t *testing.T) {
	keeper, ctx := keepertest.SnowKeeper(t)
	items := createNGame(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveGame(ctx, item.Id)
		_, found := keeper.GetGame(ctx, item.Id)
		require.False(t, found)
	}
}

func TestGameGetAll(t *testing.T) {
	keeper, ctx := keepertest.SnowKeeper(t)
	items := createNGame(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllGame(ctx)),
	)
}

func TestGameCount(t *testing.T) {
	keeper, ctx := keepertest.SnowKeeper(t)
	items := createNGame(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetGameCount(ctx))
}
