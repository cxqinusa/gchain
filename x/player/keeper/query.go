package keeper

import (
	"gchain/x/player/types"
)

var _ types.QueryServer = Keeper{}
