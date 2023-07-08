package keeper

import (
	"gchain/x/nft/types"
)

var _ types.QueryServer = Keeper{}
