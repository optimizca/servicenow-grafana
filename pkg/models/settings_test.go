package models

import (
	"encoding/json"
	"testing"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLoadPluginSettings(t *testing.T) {
	// Define a valid instance settings with both JSONData and DecryptedSecureJSONData
	instanceSettings := backend.DataSourceInstanceSettings{
		JSONData: json.RawMessage(`{
			"apiPath": "/api/test",
			"imageUrl": "http://example.com/image",
			"instanceName": "TestInstance",
			"cacheTimeout": 5
		}`),
		DecryptedSecureJSONData: map[string]string{
			"apiKey": "testApiKey",
		},
	}

	// Call LoadPluginSettings and check the results
	settings, err := LoadPluginSettings(instanceSettings)
	require.NoError(t, err)
	require.NotNil(t, settings)

	// Validate that the settings fields are loaded correctly
	assert.Equal(t, "/api/test", settings.APIPath)
	assert.Equal(t, "http://example.com/image", settings.ImageURL)
	assert.Equal(t, "TestInstance", settings.InstanceName)
	assert.Equal(t, 5, settings.CacheTimeout)
	assert.NotNil(t, settings.Secrets)
	assert.Equal(t, "testApiKey", settings.Secrets.ApiKey)
}

func TestLoadPluginSettings_MissingAPIKey(t *testing.T) {
	// Define instance settings without an API key
	instanceSettings := backend.DataSourceInstanceSettings{
		JSONData: json.RawMessage(`{
			"apiPath": "/api/test",
			"imageUrl": "http://example.com/image",
			"instanceName": "TestInstance",
			"cacheTimeout": 5
		}`),
		DecryptedSecureJSONData: map[string]string{},
	}

	// Call and check
	settings, err := LoadPluginSettings(instanceSettings)
	require.NoError(t, err)
	require.NotNil(t, settings)

	// Validate that Secrets.ApiKey is an empty string (not nil)
	assert.Equal(t, "", settings.Secrets.ApiKey)
}

func TestLoadPluginSettings_InvalidJSONData(t *testing.T) {
	// Define instance settings with invalid JSONData
	instanceSettings := backend.DataSourceInstanceSettings{
		JSONData: json.RawMessage(`{
			"apiPath": "/api/test",
			"imageUrl": "http://example.com/image",
			"instanceName": "TestInstance",
			"cacheTimeout": "invalid_number"
		}`),
		DecryptedSecureJSONData: map[string]string{
			"apiKey": "testApiKey",
		},
	}

	// Call and check
	settings, err := LoadPluginSettings(instanceSettings)
	require.Error(t, err)
	assert.Nil(t, settings)
}

func TestLoadSecretPluginSettings(t *testing.T) {
	// Test case with a valid API key
	validSecureData := map[string]string{
		"apiKey": "testApiKey",
	}
	secrets := loadSecretPluginSettings(validSecureData)
	require.NotNil(t, secrets)
	assert.Equal(t, "testApiKey", secrets.ApiKey)

	// Test case with missing API key
	missingSecureData := map[string]string{}
	secrets = loadSecretPluginSettings(missingSecureData)
	require.NotNil(t, secrets)
	assert.Empty(t, secrets.ApiKey)
}
