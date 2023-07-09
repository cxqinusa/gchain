package keeper

import (
	"gchain/x/snow/types"
)

var _ types.QueryServer = Keeper{}
