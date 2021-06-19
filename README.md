# Bee IOT

A beekeeping IOT project: A/V streaming and sensor monitoring of hive activity.

## Setup

### Hive Pi setup

#### Prequisites

- Recommended for development: Raspberry Pi 4B
- Microphone: USB or Respeaker
- Ethernet or WiFi connection to the Pi with >= 10 Mbps up / down
- 32 GB high performance microSD card
  - Preferably a card optimised for dashcam storage, e.g. [Sandisk High Endurance](https://www.amazon.co.uk/gp/product/B07P14QHB7/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
- Raspberry Pi Camera

#### Setup

##### Write a Raspberry Pi OS Image

- Insert the microSD card into your computer
- Confirm that it's the right card, and you've backed up anything important on it!
- Download and run [Raspberry Pi Imager](https://www.raspberrypi.org/software/)
- Choose operating system
- Under Raspberry Pi OS (other), choose Raspberry Pi OS Lite (32 bit)
- Choose the correct microSD card
- Write
- Remove the microSD card
- Re-insert the microSD card
- Navigate to the microSD in a terminal window, e.g. `cd /Volumes/boot`
- Run `touch ssh` to [enable SSH access](https://howchoo.com/g/ote0ywmzywj/how-to-enable-ssh-on-raspbian-without-a-screen)
- If using WiFi:
- At the root of the microSD card (e.g. `/Volumes/boot`), create a [`wpa_supplicant.conf` file](https://howchoo.com/g/ndy1zte2yjn/how-to-set-up-wifi-on-your-raspberry-pi-without-ethernet), replacing the ssid and psk with the WiFi name, password, and security method as appropriate:

```
country=GB # Your 2-digit country code
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="YOUR_NETWORK_NAME"
    psk="YOUR_PASSWORD"
    key_mgmt=WPA-PSK
}
```

- Unmount (software eject) the SD card
- Remove the microSD card

##### Set up the Pi

- Insert the microSD card into the Pi
- Power on the Pi
- Access the Pi using SSH in a terminal window:
    - `ssh pi@raspberrypi`
    - If the Pi cannot be found, use your router's interface or networking tools (e.g. `arp -a`) to identify the pi's IP address, and SSH in using that, e.g. `pi@192.168.1.177`
    - Log in using the default password of `raspberry`
- Configure the Pi
    - Run `sudo raspi-config`
    - Select `1 System Options`
    - Select `S3 Password`
    - Change the password for the Pi user. Generate a secure password with a tool like LastPass. Store the password securely in a password manager
    - Select `1 System Options`
    - Select `S4 Hostname`
    - Change the hostname of the Pi to a memorable name. Store the hostname somewhere safe, as it will be needed to log in again (ideally alongside the password in a password manager)
    - Select `3 Interface Options`
    - Select `P1 Camera`
    - Select `Yes` to enable the Pi camera
    - Restart the Pi with `sudo shutdown -r now`
    - SSH back into the Pi, using the new hostname. Test that the new password works correctly
    - Test that the camera is working:
        - Take a test image with `raspistill -o test.jpg`
        - Copy the test image to your machine with `scp pi@hostname:/home/pi/test.jpg .` (replace the last dot with the preferred destination on your machine)
        - Open the image and verify the picture has taken
    - Use `exit` to disconnect from the Pi
- Set up public key authentication
    - If you do not already have a keypair on your computer, create one with [`ssh-keygen`](https://www.ssh.com/academy/ssh/keygen)
    - Copy your public key onto the pi with `ssh-copy-id pi@hostname`
    - Authenticate with the Pi's password
    - You should now be able to SSH in without a password
- Ensure the Pi is updated to the latest version
    - `sudo apt-get update && sudo apt-get upgrade`
- Install Docker
    - `curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh`
- Install docker-compose
    - `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose`
- Allow the `pi` user to run Docker
    - `sudo groupadd docker && sudo usermod -aG docker $USER`
    - Logout with `exit` and log back in
    - Confirm the `pi` user can run Docker with `docker run --rm hello-world`
- Confirm microphone presence and set microphone volume
    - Run `alsamixer`
    - Press F6: select the sound card: e.g. typically "USB PnP Sound Device" for a USB microphone
    - Press F4: a microphone capture device should be available
    - Use the up / down arrow keys to adjust the microphone volume. This can be tweaked later if needed. Recommend maxing out the white bar (but not going into the red bar)
    - Press `Esc` to exit
- Clone the repository
    - Install git with `sudo apt-get install -y git`
    - Clone the repository: `git clone https://github.com/harryjubb/bee_iot.git`
- Run the hive software
    - `cd bee_iot/hive`
    - Set up libraries for picam (only required once)
        - `$(cd ./services/av_streaming/picam && sh copy_libs.sh)`
    - `cp .env.example .env`
    - Edit `.env` in accordance with the comments in that file
