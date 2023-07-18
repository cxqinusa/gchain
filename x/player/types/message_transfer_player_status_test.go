package types

import (
	"testing"

	"gchain/testutil/sample"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
)

func TestMsgTransferPlayerStatus_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  MsgTransferPlayerStatus
		err  error
	}{
		{
			name: "invalid address",
			msg: MsgTransferPlayerStatus{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: MsgTransferPlayerStatus{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
