#!/bin/bash

# See also https://www.docker.com/blog/happy-pi-day-docker-raspberry-pi/

# System update
sudo apt-get update
sudo apt-get upgrade

# Dependencies
sudo apt-get install apt-transport-https ca-certificates software-properties-common -y

# Download Docker
curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh

# Allow pi user to run Docker
sudo usermod -aG docker pi

# Import Docker GPG key
sudo curl https://download.docker.com/linux/raspbian/gpg

# Set up the Docker system package repository
# The line below may give permission denied, in which case, manually add the line with a text editor
# then continue the script manually from below
sudo echo "deb https://download.docker.com/linux/raspbian/ stretch stable" >> /etc/apt/sources.list

# System update
sudo apt-get update
sudo apt-get upgrade

# Start the Docker service
sudo systemctl start docker.service

# Verify Docker is installed and running
sudo docker info

rm get-docker.sh

echo
echo "!!! Log out and back to run Docker without sudo as the pi user !!!"
echo
