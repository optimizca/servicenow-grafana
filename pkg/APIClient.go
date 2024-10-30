package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"sort"
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

type Option struct {
	Label        string   `json:"label"`
	Value        string   `json:"value"`
	Suffix       string   `json:"suffix,omitempty"`
	Type         string   `json:"type,omitempty"`
	Description  string   `json:"description,omitempty"`
	InstanceName string   `json:"instanceName,omitempty"`
	Options      []Option `json:"options,omitempty"`
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

func MapResponseToVariable(result []map[string]interface{}, asterisk bool, showNull bool) []Option {
	var resultsParsed []Option

	for _, d := range result {
		if name, nameOk := d["name"]; nameOk {
			if id, idOk := d["id"]; idOk {
				nameStr := "NULL"
				idStr := "NULL"
				if name != "" && name != nil {
					nameStr = fmt.Sprintf("%v", name)
				}
				if id != "" && id != nil {
					idStr = fmt.Sprintf("%v", id)
				}
				resultsParsed = append(resultsParsed, Option{Label: nameStr, Value: idStr})
			}
		} else {
			keys := reflect.ValueOf(d).MapKeys()
			if len(keys) > 0 {
				firstKey := fmt.Sprintf("%v", keys[0])
				firstVal := fmt.Sprintf("%v", d[firstKey])

				if firstVal == "" || d[firstKey] == nil {
					firstVal = "NULL"
				}

				secondVal := firstVal
				if len(keys) > 1 {
					secondKey := fmt.Sprintf("%v", keys[1])
					secondVal = fmt.Sprintf("%v", d[secondKey])
					if secondVal == "" || d[secondKey] == nil {
						secondVal = "NULL"
					}
				}

				resultsParsed = append(resultsParsed, Option{Label: firstVal, Value: secondVal})
			}
		}
	}

	if showNull {
		resultsParsed = append(resultsParsed, Option{Label: "NULL", Value: "NULL"})
	}
	if asterisk {
		resultsParsed = append(resultsParsed, Option{Label: "*", Value: "*"})
	}

	return resultsParsed
}

func MapChecksToValue(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		if name, ok := d["name"]; ok && d["id"] != nil {
			if name == "" || name == nil {
				name = "NULL"
			}
			if d["id"] == "" || d["id"] == nil {
				d["id"] = "NULL"
			}
			mappedResults = append(mappedResults, Option{
				Label: name.(string),
				Value: d["id"].(string),
			})
		} else {
			keys := make([]string, 0, len(d))
			for k := range d {
				keys = append(keys, k)
			}
			if d[keys[0]] == "" || d[keys[0]] == nil {
				d[keys[0]] = "NULL"
			}
			if len(keys) > 1 && (d[keys[1]] == "" || d[keys[1]] == nil) {
				d[keys[1]] = "NULL"
			}
			label := d[keys[0]].(string)
			value := label
			if len(keys) > 1 {
				value = d[keys[1]].(string)
			}
			mappedResults = append(mappedResults, Option{
				Label: label,
				Value: value,
			})
		}
	}
	return mappedResults
}

func MapChecksToValuePlusSuffix(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		keys := make([]string, 0, len(d))
		for k := range d {
			keys = append(keys, k)
		}

		label := fmt.Sprintf("%v", d[keys[0]])
		value := label
		if len(keys) > 1 {
			value = fmt.Sprintf("%v", d[keys[1]])
		}

		var suffix string
		if len(keys) > 2 {
			suffix = fmt.Sprintf("%v", d[keys[2]])
		}

		mappedResults = append(mappedResults, Option{
			Label:  label,
			Value:  value,
			Suffix: suffix,
		})
	}
	return mappedResults
}

func MapValueSuffixToColumns(result []Option) []Option {
	var displayArray, valueArray []Option

	for _, d := range result {
		displayArray = append(displayArray, Option{
			Label: d.Label + ":display",
			Value: d.Value + ":d",
		})
		valueArray = append(valueArray, Option{
			Label: d.Label + ":value",
			Value: d.Value + ":v",
		})
	}

	finalResult := append(displayArray, valueArray...)

	sort.Slice(finalResult, func(i, j int) bool {
		return finalResult[i].Label < finalResult[j].Label
	})

	return finalResult
}

func MapValueAsSuffix(result []Option, addType bool) []Option {
	var options []Option

	for _, d := range result {
		option := Option{
			Label:       d.Label,
			Value:       d.Value,
			Description: d.Value,
		}

		if addType && d.Type != "" {
			option.Label = d.Label + " (" + d.Type + ")"
		}

		if len(d.Options) > 0 {
			for _, nested := range d.Options {
				nestedOption := Option{
					Label:       nested.Label,
					Value:       nested.Value,
					Description: nested.Value,
				}
				if addType && nested.Type != "" {
					nestedOption.Label = nested.Label + " (" + nested.Type + ")"
				}
				option.Options = append(option.Options, nestedOption)
			}
		}
		options = append(options, option)
	}

	// Sort the options by Label field in ascending order
	sort.Slice(options, func(i, j int) bool {
		return options[i].Label < options[j].Label
	})

	return options
}

func MapSuffixToLabel(result []Option) []Option {
	var mappedResults []Option

	for _, d := range result {
		labelWithSuffix := d.Label
		if d.Suffix != "" {
			labelWithSuffix = d.Label + " (" + d.Suffix + ")"
		}
		mappedResults = append(mappedResults, Option{
			Label: labelWithSuffix,
			Value: d.Value,
		})
	}

	return mappedResults
}

func AppendInstanceNameToResponse(response []Option, instanceName string) []Option {
	for i := range response {
		response[i].InstanceName = instanceName
	}
	return response
}

func MapToTextValue(result []interface{}) []Option {
	var mappedResults []Option

	for i, d := range result {
		switch item := d.(type) {
		case map[string]interface{}:
			if text, ok := item["text"]; ok {
				if value, ok := item["value"]; ok {
					mappedResults = append(mappedResults, Option{
						Label: fmt.Sprintf("%v", text),
						Value: fmt.Sprintf("%v", value),
					})
					continue
				}
			}
			mappedResults = append(mappedResults, Option{
				Label: fmt.Sprintf("%v", d),
				Value: fmt.Sprintf("%d", i),
			})

		default:
			mappedResults = append(mappedResults, Option{
				Label: fmt.Sprintf("%v", d),
				Value: fmt.Sprintf("%v", d),
			})
		}
	}

	return mappedResults
}
