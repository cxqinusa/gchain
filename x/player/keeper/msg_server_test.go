package keeper_test

import (
	"context"
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/x/player/keeper"
	"gchain/x/player/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.PlayerKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
