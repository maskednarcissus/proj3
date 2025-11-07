@echo off
REM Complete Database Reset Script for Windows
REM This will delete the database and restart with fresh data

echo ========================================
echo VitrineSorocabana - Database Reset
echo ========================================
echo.

echo [1/4] Stopping application...
echo Please STOP your Spring Boot application now (Ctrl+C or Stop button)
echo.
pause

echo [2/4] Searching for database files...
cd /d "%~dp0"
cd ..

if exist "data" (
    echo Found database in project root
    rmdir /s /q "data"
    echo Database deleted successfully!
) else (
    echo No database folder found in project root
)

if exist "api\data" (
    echo Found database in api folder
    cd api
    rmdir /s /q "data"
    echo Database deleted successfully!
    cd ..
) else (
    echo No database folder found in api folder
)

echo.
echo [3/4] Database cleanup complete!
echo.
echo [4/4] Next step:
echo - START your Spring Boot application again
echo - The database will be created fresh with correct passwords
echo - Login with: admin@vitrine.com / admin123
echo.
echo ========================================
echo Database reset complete! Restart your app now.
echo ========================================
pause

