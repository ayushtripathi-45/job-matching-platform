#!/bin/bash

# AWS EC2 Deployment Script for JobMatch AI
# Usage: ./deploy-ec2.sh <server-ip>

SERVER_IP=$1

if [ -z "$SERVER_IP" ]; then
    echo "Usage: ./deploy-ec2.sh <server-ip>"
    exit 1
fi

echo "🚀 Starting deployment to $SERVER_IP..."

# 1. Sync files to EC2 (excluding node_modules and local DBs)
echo "📦 Syncing files..."
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude 'dev.db' --exclude '.env' ./ ubuntu@$SERVER_IP:~/job-platform

# 2. SSH into EC2 and run docker-compose
echo "🏗️ Building and starting containers on EC2..."
ssh ubuntu@$SERVER_IP << 'EOF'
    cd ~/job-platform
    sudo docker-compose down
    sudo docker-compose up --build -d
    echo "✅ Deployment complete!"
EOF
