# Installation Scripts

These scripts have been built to quickly install the plugin and optionally Grafana aswell. Each script has a few prompts for the user to decide on the installation options.

Select your operating system from the list below for relevent commands:

- [Mac](#mac)
- [Windows](#windows)
- [Linux](#linux)

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
