@echo off
start cmd /k "cd backend && python data_server.py"
timeout /t 3
start frontend\index.html
