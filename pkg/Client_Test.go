package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

type MockData struct {
	Message string `json:"message"`
}

// Helper function to create a mock APIClient with a local test server
func newMockAPIClient(handlerFunc http.HandlerFunc) (*APIClient, *httptest.Server) {
	mockServer := httptest.NewServer(http.HandlerFunc(handlerFunc))
	client := Initialize(
		map[string]string{"Content-Type": "application/json"},
		false,
		mockServer.URL,
		time.Second*10,
	)
	return client, mockServer
}

func TestRequest(t *testing.T) {
	handlerFunc := func(w http.ResponseWriter, r *http.Request) {
		response := MockData{Message: "Success"}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(response)
	}

	client, server := newMockAPIClient(handlerFunc)
	defer server.Close()

	body := map[string]string{"key": "value"}
	respData, err := client.Request("POST", "/test-endpoint", body)

	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}

	var resp MockData
	if err := json.Unmarshal(respData, &resp); err != nil {
		t.Fatalf("Failed to unmarshal response: %v", err)
	}

	if resp.Message != "Success" {
		t.Errorf("Expected 'Success', got %s", resp.Message)
	}
}
