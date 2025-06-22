FROM php:8-alpine

# Install required PHP extensions
RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libxpm-dev \
    freetype-dev \
    libxml2-dev \
    curl-dev \
    openssl-dev \
    sqlite-dev \
    libpq-dev \
    oniguruma-dev  \
    npm 
RUN docker-php-ext-install pdo_mysql pdo_sqlite  pdo_pgsql mbstring exif pcntl bcmath gd
# RUN docker-php-ext-install mysqli pdo_mysql sqlite3 pdo_sqlite pgsql pdo_pgsql 

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy only what you need (use .dockerignore!)
COPY . .

# Install PHP dependencies
CMD ["./scripts/run.sh"]
