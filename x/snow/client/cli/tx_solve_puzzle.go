package cli

import (
	"strconv"

	"gchain/x/snow/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdSolvePuzzle() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "solve-puzzle [id] [puzzle]",
		Short: "Broadcast message solve-puzzle",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argId := args[0]
			argPuzzle := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgSolvePuzzle(
				clientCtx.GetFromAddress().String(),
				argId,
				argPuzzle,
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
