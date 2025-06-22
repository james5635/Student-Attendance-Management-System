#!/usr/bin/env sh

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate:fresh --seed --force 

php artisan storage:link

php artisan serve --host=0.0.0.0
