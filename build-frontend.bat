@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd frontend
echo Building Angular application in production mode...
call npm run build -- --configuration=production
if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build completed successfully!
    echo Output directory: frontend\dist\institute-management-frontend
) else (
    echo.
    echo Build failed with error code %ERRORLEVEL%
)
pause
