package keeper

import (
	"gchain/x/swap/types"
)

var _ types.QueryServer = Keeper{}
