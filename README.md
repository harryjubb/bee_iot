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
- TODO: Change password
- TODO: Change hostname
- TODO: Generate keypair and / or SSH copy ID
- TODO: Clone repo
- TODO: Install Docker
- TODO: Add pi to Docker group
