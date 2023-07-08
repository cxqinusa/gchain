package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdatePlayerStatus = "update_player_status"

var _ sdk.Msg = &MsgUpdatePlayerStatus{}

func NewMsgUpdatePlayerStatus(creator string, lhc *Lhcdata) *MsgUpdatePlayerStatus {
	return &MsgUpdatePlayerStatus{
		Creator: creator,
		Lhc:     lhc,
	}
}

func (msg *MsgUpdatePlayerStatus) Route() string {
	return RouterKey
}

func (msg *MsgUpdatePlayerStatus) Type() string {
	return TypeMsgUpdatePlayerStatus
}

func (msg *MsgUpdatePlayerStatus) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdatePlayerStatus) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdatePlayerStatus) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
