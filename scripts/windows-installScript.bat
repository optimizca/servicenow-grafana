@echo off
:start
set currentDir=%~dp0
cd "%currentDir%"
echo Would you like to install Grafana on this system? (y)es or (n)o
set /p installGrafana=
if /I NOT %installGrafana% == y if /I NOT %installGrafana% == n GOTO:start

if /I %installGrafana% == y (goto:grafana) else (goto:plugin)

:grafana
echo Installing grafana
echo What version of Grafana do you want to install? The default option is 8.2.3
set /p grafanaVersion=
IF NOT DEFINED grafanaVersion SET "grafanaVersion=8.2.3"

curl https://dl.grafana.com/oss/release/grafana-%grafanaVersion%.windows-amd64.msi --output grafana-%grafanaVersion%.msi
msiexec.exe /i grafana-%grafanaVersion%.msi /passive
del grafana-%grafanaVersion%.msi
goto:plugin

:plugin
echo Installing plugins
set grafanaDir=C:\Program Files\GrafanaLabs\grafana

curl https://codeload.github.com/optimizca/servicenow-grafana/zip/refs/heads/main --output sn-grafana.zip
powershell -Command "Expand-Archive -Force '%currentDir%\sn-grafana.zip' '%currentDir%\sn-grafana'"
del sn-grafana.zip
robocopy "sn-grafana\servicenow-grafana-main\dist" "%grafanaDir%\data\plugins\servicenow-optimiz-plugin" /s /is /it

powershell -Command "(gc '%grafanaDir%\conf\sample.ini') -replace ';allow_loading_unsigned_plugins =', 'allow_loading_unsigned_plugins = servicenow-optimiz-plugin,novatec-sdg-panel' | Out-File -encoding ASCII '%grafanaDir%\conf\custom.ini'"

rmdir sn-grafana /s /q

sc stop grafana
timeout 3
sc start grafana
goto:end

:end
echo Process Complete!
PAUSE