package cli

import (
	"strconv"

	"encoding/json"
	"gchain/x/player/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdUpdatePlayerStatus() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-player-status [lhc]",
		Short: "Broadcast message update-player-status",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argLhc := new(types.Lhcdata)
			err = json.Unmarshal([]byte(args[0]), argLhc)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdatePlayerStatus(
				clientCtx.GetFromAddress().String(),
				argLhc,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
