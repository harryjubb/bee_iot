# Bee IOT

A beekeeping IOT project: A/V streaming and sensor monitoring of hive activity.

## Setup

### Hive Pi setup

#### Prequisites

- Recommended for development: Raspberry Pi 4B
- Ethernet or WiFi connection to the Pi with >= 10 Mbps up / down
- 32 GB high performance microSD card
  - Preferably a card optimised for dashcam storage, e.g. [Sandisk High Endurance](https://www.amazon.co.uk/gp/product/B07P14QHB7/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
- Microphone: I2S microphone
- Camera: Raspberry Pi Camera
- Environment sensing: BME680 / BME688

#### Write a Raspberry Pi OS Image

- Insert the microSD card into your computer
- Confirm that it's the right card, and you've backed up anything important on it!
- Download and run [Raspberry Pi Imager](https://www.raspberrypi.org/software/)
- Choose operating system
- Under Raspberry Pi OS (other), choose Raspberry Pi OS Lite (Legacy)
  - The "Legacy" (Debian Buster-based) version **must** be used for camera A/V streaming support
  - 64 bit versions may or may not work on Pi 3 / 4 / 400, but have not been tested
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
- Remove the microSD card from your computer

- Ensure all required hardware (Pi camera, microphone, environment sensors) are connected to the Pi
- Insert the microSD card into the Raspberry Pi and power it on
- SSH into the Raspberry Pi to confirm it is connected
  - Use `arp -a` on your computer to help find the Pi on the network

#### Set up Ansible for deployment

Pi setup to run A/V streaming and environment sensing is automated using [Ansible](https://github.com/ansible/ansible#readme).

Ansible runs on your computer and connects to one or more Pis remotely, and ensures that the hive software is installed and running on each Pi.

##### Requirements

- Python 3
- `sshpass`
  - Debian-like: `sudo apt-get install sshpass`
  - On OS X: `brew install hudochenkov/sshpass/sshpass`

##### Setup

- From the root of the repository, `cd deployment/hives`
- One time: create a Python virtual environment (virtualenv) to use Ansible with:

```shell
python3 -m venv ansible && source ansible/bin/activate && pip3 install -r requirements.txt
```

- Run `source ansible/bin/activate` to activate the virtualenv and make Ansible available
- Run `deactivate` to deactivate the virtualenv when done

See the [Python documentation](https://docs.python.org/3/library/venv.html) for more information on creating virtual Python environments.

##### Set up the Ansible inventory file

Configurations for hive Pis are kept in `deployment/hives/inventory/static.yml`.

In the first instance, the `static.yml` file will need to be created. Copy `static.example.yml` in the inventory folder to `static.yml` and edit accordingly: see the comments in the example file.

##### Running

In a terminal on your computer:

```shell
# Activate the virtualenv if not done already
source ansible/bin/activate

# Run the playbook
# Assuming an inventory of Pis has been set up at inventory/static.yml
# see inventory/static.example.yml
ansible-playbook -i inventory/static.yml -v playbooks/hive.yml
```
