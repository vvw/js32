@echo off
rem 设置环境变量
set NODEJS_HOME=D:\js32\nodejs
set NODE_PATH=%NODEJS_HOME%\node_modules
set path=%path%;%NODEJS_HOME%
@echo on
node --harmony server.js
@echo off
pause


