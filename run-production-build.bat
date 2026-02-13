@echo off
echo ========================================
echo Running Production Build for Validation
echo ========================================
echo.

cd frontend

echo Building Angular application in production mode...
echo.

call ng build --configuration=production 2>&1

set BUILD_EXIT_CODE=%ERRORLEVEL%

echo.
echo ========================================
if %BUILD_EXIT_CODE% EQU 0 (
    echo BUILD SUCCESSFUL
    echo Exit Code: %BUILD_EXIT_CODE%
    echo.
    echo Output directory: frontend\dist\institute-management-frontend
    echo.
    echo Checking CSS file sizes...
    echo.
    dir /s dist\institute-management-frontend\*.css
) else (
    echo BUILD FAILED
    echo Exit Code: %BUILD_EXIT_CODE%
)
echo ========================================

cd ..
