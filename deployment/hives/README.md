# Beeployment

Deployment automation for hive Raspberry Pis using [Ansible](https://docs.ansible.com/ansible/latest/index.html).

## Requirements

- Python 3

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

# Run the playbook
# Assuming an inventory of Pis has been set up at inventory/static.yml
# see inventory/static.example.yml
ansible-playbook -i inventory/static.yml -v playbooks/hive.yml
```

## Removing remote.it

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
