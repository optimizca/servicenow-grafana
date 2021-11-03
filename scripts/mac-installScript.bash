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
        echo "What version of Grafana do you want to install? The default option is 8.2.3"
        read grafanaVersion
        grafanaVersion=${grafanaVersion:-8.2.3}
        echo "Installing Grafana to $grafanaDir/grafana-$grafanaVersion"
        mkdir -p $grafanaDir
        curl -O https://dl.grafana.com/oss/release/grafana-$grafanaVersion.darwin-amd64.tar.gz
        tar -zxvf grafana-$grafanaVersion.darwin-amd64.tar.gz
        rm -rf grafana-$grafanaVersion.darwin-amd64.tar.gz
        mv grafana-$grafanaVersion $grafanaDir/
else
        echo "What version of Grafana are you using? The default option is 8.2.3"
        read grafanaVersion
        grafanaVersion=${grafanaVersion:-8.2.3}
fi
grafanaDir=$grafanaDir/grafana-$grafanaVersion
mkdir -p $grafanaDir/data/plugins

rm -rf $grafanaDir/data/plugins/servicenow-optimiz-plugin
curl -o sn-grafana.zip https://codeload.github.com/optimizca/servicenow-grafana/zip/refs/heads/main
unzip sn-grafana.zip
rm -f sn-grafana.zip
mv servicenow-grafana-main/dist $grafanaDir/data/plugins/servicenow-optimiz-plugin

sed -i'' -e 's/allow_loading_unsigned_plugins =/allow_loading_unsigned_plugins = servicenow-optimiz-plugin,novatec-sdg-panel/' $grafanaDir/conf/defaults.ini

rm -rf servicenow-grafana-main
echo "Restarting Grafana"
cd $grafanaDir/bin
./grafana-server web
echo Done :\)
