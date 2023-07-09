package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgStartGame = "start_game"

var _ sdk.Msg = &MsgStartGame{}

func NewMsgStartGame(creator string, gameName string) *MsgStartGame {
	return &MsgStartGame{
		Creator:  creator,
		GameName: gameName,
	}
}

func (msg *MsgStartGame) Route() string {
	return RouterKey
}

func (msg *MsgStartGame) Type() string {
	return TypeMsgStartGame
}

func (msg *MsgStartGame) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgStartGame) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgStartGame) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
