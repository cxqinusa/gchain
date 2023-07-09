package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgSolvePuzzle = "solve_puzzle"

var _ sdk.Msg = &MsgSolvePuzzle{}

func NewMsgSolvePuzzle(creator string, id string, puzzle string) *MsgSolvePuzzle {
	return &MsgSolvePuzzle{
		Creator: creator,
		Id:      id,
		Puzzle:  puzzle,
	}
}

func (msg *MsgSolvePuzzle) Route() string {
	return RouterKey
}

func (msg *MsgSolvePuzzle) Type() string {
	return TypeMsgSolvePuzzle
}

func (msg *MsgSolvePuzzle) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgSolvePuzzle) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgSolvePuzzle) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
