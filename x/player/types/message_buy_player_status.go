package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgBuyPlayerStatus = "buy_player_status"

var _ sdk.Msg = &MsgBuyPlayerStatus{}

func NewMsgBuyPlayerStatus(creator string, denom string, amount uint64) *MsgBuyPlayerStatus {
	return &MsgBuyPlayerStatus{
		Creator: creator,
		Denom:   denom,
		Amount:  amount,
	}
}

func (msg *MsgBuyPlayerStatus) Route() string {
	return RouterKey
}

func (msg *MsgBuyPlayerStatus) Type() string {
	return TypeMsgBuyPlayerStatus
}

func (msg *MsgBuyPlayerStatus) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgBuyPlayerStatus) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgBuyPlayerStatus) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
