package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"time"
)

type RequestOptions struct {
	Headers         map[string]string
	WithCredentials bool
	URL             string
}

type APIClient struct {
	RequestOptions RequestOptions
	CacheTimeout   time.Duration
}

type TextValue struct {
	Text  string
	Value string
}

// Constructor function to initialize the APIClient
func Initialize(headers map[string]string, withCredentials bool, url string, cacheTimeout time.Duration) *APIClient {
	return &APIClient{
		RequestOptions: RequestOptions{
			Headers:         headers,
			WithCredentials: withCredentials,
			URL:             url,
		},
		CacheTimeout: cacheTimeout,
	}
}

// Performs an HTTP Request
func (client *APIClient) Request(method string, endpoint string, body interface{}) ([]byte, error) {
	fullURL := client.RequestOptions.URL + endpoint
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(method, fullURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	for key, value := range client.RequestOptions.Headers {
		req.Header.Set(key, value)
	}

	clientHTTP := &http.Client{}
	resp, err := clientHTTP.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("request failed: " + resp.Status)
	}

	return io.ReadAll(resp.Body)
}

func MapResponseToVariable(result []map[string]interface{}, asterisk bool, showNull bool) []TextValue {
	var resultsParsed []TextValue

	for _, d := range result {
		if name, nameOk := d["name"]; nameOk {
			if id, idOk := d["id"]; idOk {
				// Handle NULL cases
				nameStr := "NULL"
				idStr := "NULL"
				if name != "" && name != nil {
					nameStr = fmt.Sprintf("%v", name)
				}
				if id != "" && id != nil {
					idStr = fmt.Sprintf("%v", id)
				}
				resultsParsed = append(resultsParsed, TextValue{Text: nameStr, Value: idStr})
			}
		} else {
			// Handle dynamic keys
			keys := reflect.ValueOf(d).MapKeys()
			if len(keys) > 0 {
				firstKey := fmt.Sprintf("%v", keys[0])
				firstVal := fmt.Sprintf("%v", d[firstKey])

				if firstVal == "" || d[firstKey] == nil {
					firstVal = "NULL"
				}

				var secondVal string
				if len(keys) > 1 {
					secondKey := fmt.Sprintf("%v", keys[1])
					secondVal = fmt.Sprintf("%v", d[secondKey])
					if secondVal == "" || d[secondKey] == nil {
						secondVal = "NULL"
					}
				} else {
					secondVal = firstVal
				}

				resultsParsed = append(resultsParsed, TextValue{Text: firstVal, Value: secondVal})
			}
		}
	}

	// Check if NULL is present and add if necessary
	hasNull := false
	for _, item := range resultsParsed {
		if item.Text == "NULL" && item.Value == "NULL" {
			hasNull = true
			break
		}
	}
	if !hasNull && showNull {
		resultsParsed = append(resultsParsed, TextValue{Text: "NULL", Value: "NULL"})
	}

	if asterisk {
		resultsParsed = append(resultsParsed, TextValue{Text: "*", Value: "*"})
	}

	return resultsParsed
}
