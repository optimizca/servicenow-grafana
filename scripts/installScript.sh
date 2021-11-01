#!/bin/sh
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")
echo $SCRIPTPATH
cd "$SCRIPTPATH"

wget -O sn-grafana.zip https://github.com/optimizca/servicenow-grafana/archive/refs/heads/main.zip
unzip sn-grafana.zip
rm -f sn-grafana.zip
cd servicenow-grafana-main

yum update -y
cp scripts/grafana.repo /etc/yum.repos.d/grafana.repo
yum install grafana -y

systemctl daemon-reload
systemctl start grafana-server
systemctl enable grafana-server

fullname=$(/opt/aws/bin/ec2-metadata -p)
domain=${fullname:17}
sed -i "s/^;domain = localhost.*/domain = ${domain}/" /etc/grafana/grafana.ini
sed -i "s/;allow_loading_unsigned_plugins =/allow_loading_unsigned_plugins = servicenow-optimiz-plugin,novatec-sdg-panel/"

wget -O novatec-sdg.zip https://github.com/R2DToo/novatec-service-dependency-graph-panel/archive/refs/heads/master.zip
unzip novatec-sdg.zip
rm -f novatec-sdg.zip
mv novatec-service-dependency-graph-panel-master/dist /var/lib/grafana/plugins/novatec-sdg-panel
rm -rf novatec-service-dependency-graph-panel-master

cp -r dist /var/lib/grafana/plugins/servicenow-optimiz-plugin
cp dashboards/dashboards.yaml /etc/grafana/provisioning/dashboards/SNOWdashboards.yaml
cp -r dashboards /var/lib/grafana/dashboards

systemctl restart grafana-server

amazon-linux-extras install nginx1 -y

cp scripts/nginx.conf /etc/nginx/nginx.conf

systemctl enable nginx
systemctl restart nginx

cd ..
rm -rf servicenow-grafana-main