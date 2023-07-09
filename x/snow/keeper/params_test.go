package keeper_test

import (
	"testing"

	testkeeper "gchain/testutil/keeper"
	"gchain/x/snow/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.SnowKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
