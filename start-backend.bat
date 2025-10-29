@echo off
echo Starting Laravel Backend Server...
cd helmigrow-backend
php artisan serve --host=0.0.0.0 --port=8000
pause
