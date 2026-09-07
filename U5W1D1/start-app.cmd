@echo off
cd /d "%~dp0"
start "Backend" cmd /k mvnw spring-boot:run
cd /d "%~dp0frontend"
start "Frontend" cmd /k npm run dev
