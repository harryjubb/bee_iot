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
ansible-playbook -i inventory/static.yml -v playbooks/hive.yml
```
