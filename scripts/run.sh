#!/usr/bin/env sh
echo "Running composer"
composer install --no-dev

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
# php artisan migrate --force 
php artisan migrate:fresh  --seed --force      

# echo "Publishing cloudinary provider..."
# php artisan vendor:publish --provider="CloudinaryLabs\CloudinaryLaravel\CloudinaryServiceProvider" --tag="cloudinary-laravel-config"

npm install && npm run build

php artisan serve --host=0.0.0.0
