# CI/CD & DigitalOcean Deployment Guide

This document explains how to set up the GitHub Actions CI/CD pipeline and deploy **StayEaseInn** to a DigitalOcean Droplet.

---

## Architecture Overview

```
GitHub Push → CI Workflow (syntax check + composer) → Deploy Workflow (SSH → Droplet)
```

```
.github/
  workflows/
    ci.yml          ← Runs on every push/PR: PHP syntax + Composer check
    deploy.yml      ← Runs on push to main: SSH deploy to DigitalOcean
scripts/
  setup-droplet.sh  ← One-time server setup script
menus/
  .env.example      ← Safe template (committed to Git)
  .env              ← Real secrets (NOT in Git, written by deploy pipeline)
```

---

## Step 1: Prepare Your DigitalOcean Droplet

### Create a Droplet
- **Image:** Ubuntu 22.04 LTS
- **Size:** Basic / Regular — 2 GB RAM minimum (1 GB may struggle with Composer)
- **Region:** Choose closest to your users
- **Authentication:** SSH Key (recommended)

### Run the Setup Script
SSH into your Droplet as root and run:

```bash
# Upload the script
scp scripts/setup-droplet.sh root@YOUR_DROPLET_IP:/root/

# SSH in and run it
ssh root@YOUR_DROPLET_IP
nano /root/setup-droplet.sh   # Edit DOMAIN, REPO_URL if needed
bash /root/setup-droplet.sh
```

> **Save the DB password** that the script prints at the end!

---

## Step 2: Generate SSH Key for GitHub Actions

On your local machine (or the Droplet), generate a dedicated deploy key:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""
```

This creates:
- `~/.ssh/github_deploy_key` → **Private key** (goes into GitHub Secrets)
- `~/.ssh/github_deploy_key.pub` → **Public key** (goes on the Droplet)

### Add Public Key to Droplet

```bash
# On the Droplet:
cat >> /home/deploy/.ssh/authorized_keys << 'EOF'
PASTE_YOUR_PUBLIC_KEY_HERE
EOF
```

### Test the SSH Connection

```bash
ssh -i ~/.ssh/github_deploy_key deploy@YOUR_DROPLET_IP
```

---

## Step 3: Add GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value | Example |
|---|---|---|
| `DO_HOST` | Droplet IP or domain | `143.198.x.x` |
| `DO_USERNAME` | SSH user | `deploy` |
| `DO_SSH_KEY` | Contents of private key file | `-----BEGIN OPENSSH...` |
| `DO_PORT` | SSH port | `22` |
| `DO_DEPLOY_PATH` | App path on server | `/var/www/restaurant-app` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USERNAME` | MySQL user | `stayease_user` |
| `DB_PASSWORD` | MySQL password | `(from setup script)` |
| `DB_NAME` | Database name | `restaurant_db` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` |

---

## Step 4: Push to GitHub

```bash
cd c:\xampp\htdocs\restaurant-app

# Initialize git if not already done
git init
git remote add origin https://github.com/Knoweb/restaurant-app.git

# Stage and commit
git add .
git commit -m "feat: add CI/CD pipeline and DigitalOcean deployment"
git push -u origin main
```

---

## Step 5: Monitor the Pipeline

1. Go to your GitHub repo → **Actions** tab
2. You'll see two workflows running:
   - **CI — PHP Syntax & Dependency Check** ✅
   - **CD — Deploy to DigitalOcean** ✅
3. Click any workflow run to see detailed logs

---

## Workflow Summary

### `ci.yml` — Runs on every push & PR
| Step | What it does |
|---|---|
| PHP Syntax Check | Runs `php -l` on every `.php` file |
| Composer Validate | Validates `composer.json` |
| Composer Install | Installs all dependencies |

### `deploy.yml` — Runs on push to `main` only
| Step | What it does |
|---|---|
| CI Gate | Re-runs syntax check before deploying |
| `git pull` | Pulls latest code on the Droplet |
| Write `.env` | Creates `.env` from GitHub Secrets |
| `composer install` | Installs production dependencies |
| Set permissions | `chown www-data`, `chmod 755/775` |
| Reload Apache | `systemctl reload apache2` |

---

## Troubleshooting

### SSH Connection Failed
```bash
# Test manually:
ssh -i ~/.ssh/github_deploy_key -p 22 deploy@YOUR_DROPLET_IP
# Check authorized_keys:
cat /home/deploy/.ssh/authorized_keys
```

### Composer Install Fails on Server
```bash
# SSH in and run manually:
cd /var/www/restaurant-app/menus
composer install --no-dev -v
```

### Apache 403 / 404 Error
```bash
# Check Apache error log:
tail -f /var/log/apache2/restaurant-app-error.log
# Check mod_rewrite is enabled:
a2enmod rewrite && systemctl reload apache2
```

### Database Connection Error
```bash
# Verify .env was written correctly:
cat /var/www/restaurant-app/menus/.env
# Test MySQL connection:
mysql -u stayease_user -p restaurant_db
```

---

## Security Notes

- ✅ `.env` is **never** committed to Git (in `.gitignore`)
- ✅ `.env` is written on the server from GitHub Secrets at deploy time
- ✅ `menus/.env` has `chmod 600` (only readable by owner)
- ✅ Apache blocks direct access to `.env`, `.sql`, `.log` files
- ✅ Dedicated `deploy` user with minimal sudo permissions
- ⚠️ Rotate your Stripe key if it was ever committed to Git history
