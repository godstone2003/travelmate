#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo " Updating system..."
sudo apt update

echo " Installing Docker..."
sudo apt install -y docker.io

echo " Enabling and starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

echo " Adding current user ($USER) to docker group..."
sudo usermod -aG docker $USER

echo " Please note: you may need to log out and back in (or run 'newgrp docker') to apply group changes."

echo " Installing Docker Compose v2.24.7..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.7/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

echo " Making Docker Compose executable..."
sudo chmod +x /usr/local/bin/docker-compose

echo " Verifying installation..."
docker --version
docker-compose --version

echo " Docker and Docker Compose installation completed!"
