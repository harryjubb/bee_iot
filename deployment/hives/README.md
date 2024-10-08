# Beeployment

Deployment automation for hive Raspberry Pis using [Ansible](https://docs.ansible.com/ansible/latest/index.html).

## Requirements

- Python 3
- `sshpass`
  - Debian-like: `sudo apt-get install sshpass`
  - On OS X: `brew install hudochenkov/sshpass/sshpass`

## Setup

- One time: create a virtualenv to use Ansible with:

```shell
python3 -m venv ansible && source ansible/bin/activate && pip3 install -r requirements.txt
```

- Run `source ansible/bin/activate` to activate the virtualenv and make Ansible available
- Run `deactivate` to deactivate the virtualenv when done

## Running

```shell
# Activate the virtualenv if not done already
source ansible/bin/activate

# First time only: and only if restoring from a cloned microSD card
# Expand the root filesystem
# Change `ansible_hostname` to the Ansible host in the inventory file
ansible-playbook -i inventory/static.yml --limit ansible_hostname -v platbooks/expand_filesystem.yml

# Run the playbook
# Assuming an inventory of Pis has been set up at inventory/static.yml
# see inventory/static.example.yml
ansible-playbook -i inventory/static.yml -v playbooks/hive.yml
```

## Notes

### WiFi config updates

- The playbook sets `update_config=0` in `/etc/wpa_supplicant/wpa_supplicant.conf`. This means that the system will no longer make changes to the file. Changes going forward should be managed only by Ansible.

See https://raspberrypi.stackexchange.com/a/105558/37503

### Removing WiFi networks

WiFi networks are not automatically removed if removed from `group_wifi_networks` and `hive_wifi_networks` Ansible variables.

To remove a WiFi network, remove it from the Ansible variables and delete its entry from `/etc/wpa_supplicant/wpa_supplicant.conf`.

### Removing remote.it

If remote.it was enabled, to remove it is currently a manual step on hive Pis:

``` shell
# Run and then select the option to remove all remote.it services and exit
sudo connectd_installer

# Completely purge the package and all settings
sudo dpkg --purge connectd

# or, keep config files in place
sudo apt remove connectd
```

For more info:

- https://support.remote.it/hc/en-us/articles/360054546151-Remove-all-remote-it-Services
- https://support.remote.it/hc/en-us/articles/360061289671-Removing-the-connectd-package

### Buster backports GPG keys

If `apt` updates fail due to GPG signature verification:

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 0E98404D386FA1D9 6ED0E7B82643E131
```
