package types

import (
	"fmt"
)

// DefaultIndex is the default global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		SystemInfo: nil,
		GameList:   []Game{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in game
	gameIdMap := make(map[uint64]bool)
	gameCount := gs.GetGameCount()
	for _, elem := range gs.GameList {
		if _, ok := gameIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for game")
		}
		if elem.Id >= gameCount {
			return fmt.Errorf("game id should be lower or equal than the last id")
		}
		gameIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
