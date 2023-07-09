package types

const (
	// ModuleName defines the module name
	ModuleName = "snow"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_snow"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

const (
	SystemInfoKey = "SystemInfo/value/"
)

const (
	GameKey      = "Game/value/"
	GameCountKey = "Game/count/"
)

const (
	GamePlay  = "play"
	GamePause = "pasue"
	GameEnd   = "end"
)

const (
	GameReward = 100
	GameInit   = "100"
)
