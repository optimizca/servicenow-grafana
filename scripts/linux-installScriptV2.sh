#!/bin/bash
# Linux install script for Grafana and our ServiceNow-Optimiz Plugin
# Created By: Braden Still-Routley (Optimiz)
# Version: 2.0.0

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"

clear

installOption="blank"
while [ "$installOption" != "1" ] && [ "$installOption" != "2" ] && [ "$installOption" != "3" ]
do
  if [ "$installOption" != "blank" ]
  then
    clear
    echo $installOption was not a valid option
  fi
  echo Please enter one of the choices below or use Ctrl + C to quit
  echo
  echo --------------------------------------- Install Options ---------------------------------------
  echo -e '\t 1. Install Grafana & the ServiceNow-Optimiz plugin'
  echo -e '\t 2. Install Grafana'
  echo -e '\t 3. Install the ServiceNow-Optimiz plugin into an existing Grafana installation \n'

  echo Choice \(1-3\):
  read installOption
done

clear

if [ "$installOption" == "1" ]
then
  echo Proceeding with option: 1. Install Grafana \& the ServiceNow-Optimiz plugin
fi

if [ "$installOption" == "2" ]
then
  echo Proceeding with option: 2. Install Grafana
fi

if [ "$installOption" == "3" ]
then
  echo Proceeding with option: 3. Install the ServiceNow-Optimiz plugin into an existing Grafana installation
fi

if [ "$installOption" == "1" ] || [ "$installOption" == "2" ]
then
  os="blank"
  while [ "$os" != "1" ] && [ "$os" != "2" ] && [ "$os" != "3" ]
  do
    if [ "$os" != "blank" ]
    then
      clear
      echo $os was not a valid option
    fi
    echo Please enter one of the choices below or use Ctrl + C to quit
    echo
    echo --------------------------------------- Select an option ---------------------------------------
    echo -e '\t 1. '
    echo -e '\t 2. Install Grafana'
    echo -e '\t 3. Install the ServiceNow-Optimiz plugin into an existing Grafana installation \n'

    echo Choice \(1-3\):
    read os
  done
else

fi