package keeper_test

import (
	"context"
	"testing"

	keepertest "gchain/testutil/keeper"
	"gchain/x/nft/keeper"
	"gchain/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.NftKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
