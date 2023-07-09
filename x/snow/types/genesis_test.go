package types_test

import (
	"testing"

	"gchain/x/snow/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{

				SystemInfo: &types.SystemInfo{
					NextId: 16,
					Left:   "30",
					Right:  "97",
				},
				GameList: []types.Game{
					{
						Id: 0,
					},
					{
						Id: 1,
					},
				},
				GameCount: 2,
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated game",
			genState: &types.GenesisState{
				GameList: []types.Game{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid game count",
			genState: &types.GenesisState{
				GameList: []types.Game{
					{
						Id: 1,
					},
				},
				GameCount: 0,
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
