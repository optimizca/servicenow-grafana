package models

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
)

// PluginSettings represents configurable settings for the plugin.
type PluginSettings struct {
	Path         string                `json:"path"`
	ImageURL     string                `json:"imageUrl"`
	InstanceName string                `json:"instanceName"`
	CacheTimeout int                   `json:"cacheTimeout"`
	Secrets      *SecretPluginSettings `json:"-"`
}

// SecretPluginSettings holds sensitive information, excluded from JSON output.
type SecretPluginSettings struct {
	ApiKey string `json:"apiKey"`
}

// LoadPluginSettings reads settings from Grafana instance settings.
func LoadPluginSettings(source backend.DataSourceInstanceSettings) (*PluginSettings, error) {
	settings := PluginSettings{}
	err := json.Unmarshal(source.JSONData, &settings)
	if err != nil {
		return nil, fmt.Errorf("could not unmarshal PluginSettings json: %w", err)
	}

	settings.Secrets = loadSecretPluginSettings(source.DecryptedSecureJSONData)

	return &settings, nil
}

// loadSecretPluginSettings populates sensitive settings from secure JSON.
func loadSecretPluginSettings(source map[string]string) *SecretPluginSettings {
	return &SecretPluginSettings{
		ApiKey: source["apiKey"],
	}
}
