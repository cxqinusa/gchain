package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgTransferPlayerStatus = "transfer_player_status"

var _ sdk.Msg = &MsgTransferPlayerStatus{}

func NewMsgTransferPlayerStatus(creator string, gamein string, gameout string, amount uint64) *MsgTransferPlayerStatus {
	return &MsgTransferPlayerStatus{
		Creator: creator,
		Gamein:  gamein,
		Gameout: gameout,
		Amount:  amount,
	}
}

func (msg *MsgTransferPlayerStatus) Route() string {
	return RouterKey
}

func (msg *MsgTransferPlayerStatus) Type() string {
	return TypeMsgTransferPlayerStatus
}

func (msg *MsgTransferPlayerStatus) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgTransferPlayerStatus) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgTransferPlayerStatus) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
