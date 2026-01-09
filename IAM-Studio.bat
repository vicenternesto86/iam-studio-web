@echo off
title IAM-Studio Diagnostic Tool
echo =============================================
echo    IAM-Studio - Diagnostico 360
echo =============================================
echo.
echo Iniciando servidor de desarrollo...
echo.

cd /d "c:\Users\Lenovo\OneDrive\Escritorio\APPs\dx IAM-Studio"

:: Abrir el navegador despues de 3 segundos
start "" cmd /c "timeout /t 3 /nobreak > nul && start http://localhost:5173"

:: Iniciar el servidor de desarrollo
npm run dev

pause
