package cli

import (
	"strconv"

	"gchain/x/player/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdTransferPlayerStatus() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "transfer-player-status [gamein] [gameout] [amount]",
		Short: "Broadcast message transfer-player-status",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argGamein := args[0]
			argGameout := args[1]
			argAmount, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgTransferPlayerStatus(
				clientCtx.GetFromAddress().String(),
				argGamein,
				argGameout,
				argAmount,
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
