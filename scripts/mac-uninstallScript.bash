#!/bin/bash
grafanaDir=$(echo $HOME)"/grafana"

removeGrafana="blank"
while [ "$removeGrafana" != "n" ] && [ "$removeGrafana" != "y" ] && [ "$removeGrafana" != "N" ] && [ "$removeGrafana" != "Y" ]
do
    if [ "$removeGrafana" != "blank" ]
    then
        echo $removeGrafana was not a valid option
    fi
    echo Remove Grafana from this system?
    echo \(y\)es will completely uninstall Grafana
    echo \(n\)o will only uninstall our plugins and dashboards
    read removeGrafana
done

echo "What version of Grafana do you want to remove from? The default option is 8.2.2"
read grafanaVersion
grafanaVersion=${grafanaVersion:-8.2.2}
grafanaDir=$grafanaDir/grafana-$grafanaVersion

if [ "$removeGrafana" == "y" ] || [ "$removeGrafana" == "Y" ]
then
    echo "Please stop the Grafana service before continuing"
    read -p "Press any key to resume ..."
    rm -rf $grafanaDir
else
    rm -rf $grafanaDir/data/plugins/novatec-sdg-panel
    rm -rf $grafanaDir/data/plugins/servicenow-optimiz-plugin
    rm -rf $grafanaDir/conf/provisioning/dashboards/mac-SNOWdashboards.yaml
    rm -rf $grafanaDir/conf/provisioning/dashboards/SNOWdashboards
fi
echo Done :\)
