#!/bin/bash
# =============================================================================
# StayEaseInn - DigitalOcean Droplet Setup Script
# =============================================================================
# Run this ONCE on a fresh Ubuntu 22.04 LTS Droplet as root.
# Usage: bash setup-droplet.sh
# =============================================================================

set -e  # Exit on any error

# ── CONFIGURATION — Edit these before running ─────────────────────────────────
REPO_URL="https://github.com/Knoweb/restaurant-app.git"
DEPLOY_PATH="/var/www/restaurant-app"
DOMAIN="yourdomain.com"          # Set to your domain, or leave blank for IP-only
DB_NAME="restaurant_db"
DB_USER="stayease_user"
DB_PASS="$(openssl rand -base64 24)"  # Auto-generates a secure password
# ─────────────────────────────────────────────────────────────────────────────

echo "============================================="
echo "  StayEaseInn - Droplet Setup"
echo "============================================="
echo ""

# ── Step 1: System Update ─────────────────────────────────────────────────────
echo "📦 [1/10] Updating system packages..."
apt-get update -y && apt-get upgrade -y
echo "✅ System updated."

# ── Step 2: Install Apache ────────────────────────────────────────────────────
echo "🌐 [2/10] Installing Apache2..."
apt-get install -y apache2
systemctl enable apache2
systemctl start apache2
echo "✅ Apache2 installed."

# ── Step 3: Install PHP 8.1 ───────────────────────────────────────────────────
echo "🐘 [3/10] Installing PHP 8.1 and extensions..."
apt-get install -y software-properties-common
add-apt-repository ppa:ondrej/php -y
apt-get update -y
apt-get install -y \
    php8.1 \
    php8.1-cli \
    php8.1-common \
    php8.1-mysql \
    php8.1-mbstring \
    php8.1-xml \
    php8.1-curl \
    php8.1-zip \
    php8.1-gd \
    libapache2-mod-php8.1
echo "✅ PHP 8.1 installed."

# ── Step 4: Install MySQL ─────────────────────────────────────────────────────
echo "🗄️  [4/10] Installing MySQL..."
apt-get install -y mysql-server
systemctl enable mysql
systemctl start mysql
echo "✅ MySQL installed."

# ── Step 5: Configure MySQL ───────────────────────────────────────────────────
echo "🔐 [5/10] Configuring MySQL database and user..."
mysql -u root << MYSQL_SCRIPT
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT
echo "✅ MySQL database '${DB_NAME}' and user '${DB_USER}' created."
echo "   ⚠️  DB Password (save this!): ${DB_PASS}"

# ── Step 6: Install Composer ──────────────────────────────────────────────────
echo "🎼 [6/10] Installing Composer..."
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
echo "✅ Composer installed: $(composer --version)"

# ── Step 7: Clone Repository ──────────────────────────────────────────────────
echo "📥 [7/10] Cloning repository..."
mkdir -p /var/www
git clone "${REPO_URL}" "${DEPLOY_PATH}"
echo "✅ Repository cloned to ${DEPLOY_PATH}."

# ── Step 8: Install App Dependencies ─────────────────────────────────────────
echo "📦 [8/10] Installing Composer dependencies..."
cd "${DEPLOY_PATH}/menus"
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Create .env file
cat > "${DEPLOY_PATH}/menus/.env" << ENVEOF
HOST=localhost
USERNAME=${DB_USER}
PASSWORD=${DB_PASS}
DB=${DB_NAME}
STRIPE_SECRET_KEY=sk_live_REPLACE_WITH_YOUR_STRIPE_KEY
ENVEOF
chmod 600 "${DEPLOY_PATH}/menus/.env"

# Create writable qrcodes directories
mkdir -p "${DEPLOY_PATH}/qrcodes"
mkdir -p "${DEPLOY_PATH}/menus/qrcodes"

# Set permissions
chown -R www-data:www-data "${DEPLOY_PATH}"
chmod -R 755 "${DEPLOY_PATH}"
chmod -R 775 "${DEPLOY_PATH}/qrcodes"
chmod -R 775 "${DEPLOY_PATH}/menus/qrcodes"
echo "✅ App dependencies installed and permissions set."

# ── Step 9: Import Database Schema ───────────────────────────────────────────
echo "🗄️  [9/10] Importing database schema..."
SQL_FILE="${DEPLOY_PATH}/menus/sql/full/restaurant_db (1).sql"
if [ -f "$SQL_FILE" ]; then
    mysql -u "${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < "$SQL_FILE"
    echo "✅ Database schema imported."
else
    echo "⚠️  SQL file not found at: $SQL_FILE"
    echo "   Please import manually: mysql -u ${DB_USER} -p ${DB_NAME} < your_schema.sql"
fi

# ── Step 10: Configure Apache VirtualHost ─────────────────────────────────────
echo "🌐 [10/10] Configuring Apache VirtualHost..."
cat > /etc/apache2/sites-available/restaurant-app.conf << APACHEEOF
<VirtualHost *:80>
    ServerName ${DOMAIN}
    ServerAlias www.${DOMAIN}
    DocumentRoot ${DEPLOY_PATH}

    <Directory ${DEPLOY_PATH}>
        AllowOverride All
        Require all granted
        Options -Indexes +FollowSymLinks
    </Directory>

    # Deny access to sensitive files
    <FilesMatch "\.(env|sql|log|sh|md|json|lock)$">
        Require all denied
    </FilesMatch>

    ErrorLog \${APACHE_LOG_DIR}/restaurant-app-error.log
    CustomLog \${APACHE_LOG_DIR}/restaurant-app-access.log combined
</VirtualHost>
APACHEEOF

# Enable site and required modules
a2ensite restaurant-app.conf
a2enmod rewrite
a2dissite 000-default.conf
systemctl reload apache2
echo "✅ Apache VirtualHost configured."

# ── Firewall Setup ────────────────────────────────────────────────────────────
echo "🔥 Configuring UFW firewall..."
ufw allow OpenSSH
ufw allow 'Apache Full'
ufw --force enable
echo "✅ Firewall configured (ports 22, 80, 443 open)."

# ── Optional: SSL with Certbot ────────────────────────────────────────────────
if [ -n "${DOMAIN}" ] && [ "${DOMAIN}" != "yourdomain.com" ]; then
    echo "🔒 Installing SSL certificate with Certbot..."
    apt-get install -y certbot python3-certbot-apache
    certbot --apache -d "${DOMAIN}" -d "www.${DOMAIN}" --non-interactive --agree-tos -m "admin@${DOMAIN}"
    echo "✅ SSL certificate installed. HTTPS is now active."
else
    echo "⚠️  Skipping SSL setup (no domain configured)."
    echo "   To add SSL later: certbot --apache -d yourdomain.com"
fi

# ── Add deploy user (for GitHub Actions SSH) ──────────────────────────────────
echo "👤 Creating 'deploy' user for GitHub Actions..."
if ! id "deploy" &>/dev/null; then
    adduser --disabled-password --gecos "" deploy
    usermod -aG www-data deploy
    mkdir -p /home/deploy/.ssh
    chmod 700 /home/deploy/.ssh
    touch /home/deploy/.ssh/authorized_keys
    chmod 600 /home/deploy/.ssh/authorized_keys
    chown -R deploy:deploy /home/deploy/.ssh

    # Allow deploy user to reload apache and chown files without password
    echo "deploy ALL=(ALL) NOPASSWD: /usr/sbin/service apache2 reload, /bin/chown -R www-data\:www-data ${DEPLOY_PATH}, /bin/chmod -R * ${DEPLOY_PATH}" \
        >> /etc/sudoers.d/deploy-user
    chmod 440 /etc/sudoers.d/deploy-user
    echo "✅ 'deploy' user created."
    echo ""
    echo "   ⚠️  IMPORTANT: Add your GitHub Actions SSH public key to:"
    echo "   /home/deploy/.ssh/authorized_keys"
else
    echo "✅ 'deploy' user already exists."
fi

# ── Give deploy user access to the deploy path ───────────────────────────────
chown -R deploy:www-data "${DEPLOY_PATH}"
chmod -R 775 "${DEPLOY_PATH}"

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "============================================="
echo "  ✅ SETUP COMPLETE!"
echo "============================================="
echo ""
echo "  App URL:       http://${DOMAIN:-$(curl -s ifconfig.me)}"
echo "  Deploy Path:   ${DEPLOY_PATH}"
echo "  DB Name:       ${DB_NAME}"
echo "  DB User:       ${DB_USER}"
echo "  DB Password:   ${DB_PASS}   ← SAVE THIS!"
echo ""
echo "  Next Steps:"
echo "  1. Add your SSH public key to /home/deploy/.ssh/authorized_keys"
echo "  2. Add GitHub Secrets (see README or implementation plan)"
echo "  3. Update menus/.env with your real Stripe key"
echo "  4. Push to 'main' branch to trigger first deployment"
echo ""
echo "  Admin Login:   http://${DOMAIN:-$(curl -s ifconfig.me)}/restaurant-app/menus/admin/login.php"
echo "  Super Admin:   info@knowebsolutions.com / Knoweb@123"
echo "============================================="
