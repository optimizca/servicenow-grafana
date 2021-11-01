#!/bin/bash
grafanaDir=$(echo $HOME)"/grafana"

installGrafana="blank"
while [ "$installGrafana" != "n" ] && [ "$installGrafana" != "y" ] && [ "$installGrafana" != "N" ] && [ "$installGrafana" != "Y" ]
do
    if [ "$installGrafana" != "blank" ]
    then
        echo $installGrafana was not a valid option
    fi
    echo Would you like to install Grafana on this system? \(y\)es or \(n\)o
    read installGrafana
done


if [ "$installGrafana" == "y" ] || [ "$installGrafana" == "Y" ]
then
        echo "What version of Grafana do you want to install? The default option is 8.2.2"
        read grafanaVersion
        grafanaVersion=${grafanaVersion:-8.2.2}
        echo "Installing Grafana to $grafanaDir/grafana-$grafanaVersion"
        mkdir -p $grafanaDir
        curl -O https://dl.grafana.com/oss/release/grafana-$grafanaVersion.darwin-amd64.tar.gz
        tar -zxvf grafana-$grafanaVersion.darwin-amd64.tar.gz
        rm -rf grafana-$grafanaVersion.darwin-amd64.tar.gz
        mv grafana-$grafanaVersion $grafanaDir/
else
        echo "What version of Grafana are you using? The default option is 8.2.2"
        read grafanaVersion
        grafanaVersion=${grafanaVersion:-8.2.2}
fi
grafanaDir=$grafanaDir/grafana-$grafanaVersion
mkdir -p $grafanaDir/data/plugins

rm -rf $grafanaDir/data/plugins/novatec-sdg-panel
curl -O novatec-sdg.zip https://github.com/R2DToo/novatec-service-dependency-graph-panel/archive/refs/heads/master.zip
unzip novatec-sdg.zip
rm -f novatec-sdg.zip
mv novatec-service-dependency-graph-panel-master/dist $grafanaDir/data/plugins/novatec-sdg-panel
rm -rf novatec-service-dependency-graph-panel-master

rm -rf $grafanaDir/data/plugins/servicenow-optimiz-plugin
curl -O sn-grafana.zip https://github.com/optimizca/servicenow-grafana/archive/refs/heads/main.zip
unzip sn-grafana.zip
rm -f sn-grafana.zip
mv servicenow-grafana-main/dist $grafanaDir/data/plugins/servicenow-optimiz-plugin


sed -i'' -e 's/allow_loading_unsigned_plugins =/allow_loading_unsigned_plugins = servicenow-optimiz-plugin,novatec-sdg-panel/' $grafanaDir/conf/defaults.ini
rm -f $grafanaDir/conf/provisioning/dashboards/mac-SNOWdashboards.yaml
cp servicenow-grafana-main/dashboards/mac-SNOWdashboards.yaml $grafanaDir/conf/provisioning/dashboards/
echo "      path: $grafanaDir/conf/provisioning/dashboards/SNOWdashboards" >> $grafanaDir/conf/provisioning/dashboards/mac-SNOWdashboards.yaml
rm -rf $grafanaDir/conf/provisioning/dashboards/SNOWdashboards
mkdir -p $grafanaDir/conf/provisioning/dashboards/SNOWdashboards
cp -R servicenow-grafana-main/dashboards/* $grafanaDir/conf/provisioning/dashboards/SNOWdashboards/

rm -rf servicenow-grafana-main
echo "Restarting Grafana"
cd $grafanaDir/bin
./grafana-server web
echo Done :\)
