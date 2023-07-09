package keeper_test

import (
	"context"
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/x/snow/keeper"
	"gchain/x/snow/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.SnowKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
