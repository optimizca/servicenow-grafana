# Installation Scripts

Check the releases tab to download the appropriate script for your operating system.

Once downloaded, run the desired script. It may require you to make the script execuatable first

## Mac

```
wget https://github.com/optimizca/servicenow-grafana/releases/download/v1.1.4/mac-installScript.bash
```

```
chmod +x mac-installScript.bash
```

```
./mac-installScript.bash
```

## Windows

[Download windows-installScript.bat](https://github.com/optimizca/servicenow-grafana/releases/download/v1.1.4/windows-installScript.bat)

Then right click on the script and 'Run as Administrator'

### OR

```
curl -O https://github.com/optimizca/servicenow-grafana/releases/download/v1.1.4/windows-installScript.bat
```

```
.\windows-installScript.bat
```

## Linux

Tested on Ubuntu and CentOS but should work for any distro running apt or yum package managers

```
curl -LJO https://github.com/optimizca/servicenow-grafana/releases/download/v1.1.4/linux-installScript.sh
```

```
chmod +x linux-installScript.sh
```

```
sudo ./linux-installScript.sh
```
