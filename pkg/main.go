package main

import (
	"context"
	"os"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/log"
	"github.com/optimizca/servicenow-grafana/pkg/plugin"
)

func main() {
	// Start listening to requests sent from Grafana. This call is blocking so
	// it won't finish until Grafana shuts down the process or the plugin chooses
	// to exit by itself using os.Exit. Manage automatically manages the lifecycle
	// of datasource instances and will use NewDatasource as the factory for creating
	// new instances.
	if err := datasource.Manage("servicenow-testplugin-datasource", func(ctx context.Context, settings backend.DataSourceInstanceSettings) (instancemgmt.Instance, error) {
		// Attempt to create a new datasource instance
		ds, err := plugin.NewDatasource(ctx, settings)
		if err != nil {
			return nil, err
		}
		return ds, nil
	}, datasource.ManageOpts{}); err != nil {
		log.DefaultLogger.Error(err.Error())
		os.Exit(1)
	}
}
