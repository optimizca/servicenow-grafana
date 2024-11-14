package snowmanager

import (
	"time"
)

type SNOWManager struct {
	apiClient *main.APIClient
	apiPath   string
}

type SnowManagerOptions struct {
	WithCredentials bool
	URL             string
	APIPath         string
	CacheTimeout    time.Duration
}

func NewSNOWManager(options SnowManagerOptions) *SNOWManager {
	headers := map[string]string{"Content-Type": "application/json"}
	apiClient := main.Initialize(headers, options.WithCredentials, options.URL, options.CacheTimeout)

	return &SNOWManager{
		apiClient: apiClient,
		apiPath:   options.APIPath,
	}
}
